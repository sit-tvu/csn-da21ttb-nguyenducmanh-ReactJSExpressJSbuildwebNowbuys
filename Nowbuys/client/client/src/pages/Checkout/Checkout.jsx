
import { Fragment, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom' 
import CryptoJS from 'crypto-js';

import {axiosAppJson} from '../../configs/axios.js';

import AddressPopup from './components/AddressPopup.jsx';

import {Loading, CircleLoading} from '../../Components/index.js' 

import classNames from 'classnames/bind'
import style from './Checkout.module.scss'
import { CheckoutAPI, OrderAPI } from '../../apis/index.js';
const cn = classNames.bind(style) 

function Checkout() { 

    const init_voucher = {
        is_valid: null,
        code: '',
        discount_for_product: {
            percent: 0,
            maximum_price: 0,
            for_price_total_product_minimum: 0
        },
        discount_for_ship: {
            percent: 0,
            maximum_price: 0,
            for_price_ship_minimum: 0
        }
    }
    
    const url_params = new URLSearchParams(window.location.search) 
    
    const [checkoutData, setCheckoutData] = useState({})
    
    const [payloadCheckoutDecypt, setPayloadCheckoutDecypt] = useState(null)
    
    const [idOfAddressSelected, setIdOfAddressSelected] = useState(null)
    const [usingNowbuysCoin, setUsingNowbuysCoin] = useState(false)
    
    const inputVoucherRef = useRef('')
    const [voucherInput, setVoucherInput] = useState('')

    const [isCheckingouting, setIsCheckingouting] = useState(false)
    const [showAddressPopup, setShowAddressPopup] = useState(false)

    useEffect(() => {
        try {
            let payload_checkout_decypt = JSON.parse(CryptoJS.AES.decrypt(decodeURIComponent(url_params.get('state')), process.env.REACT_APP_CRYPT_PAYLOAD_CHECKOUT).toString(CryptoJS.enc.Utf8));
            setPayloadCheckoutDecypt(payload_checkout_decypt)
            setVoucherInput(payload_checkout_decypt.voucher_code)
        } catch (error) {
            setPayloadCheckoutDecypt(null)
        }
    }, [])

    console.log(checkoutData);
    
    useEffect(() => {
        if (payloadCheckoutDecypt !== null && showAddressPopup === false)
            refreshCheckoutData()
    }, [usingNowbuysCoin, payloadCheckoutDecypt, showAddressPopup]) 

    const refreshCheckoutData = async () => { 
        setIsCheckingouting(true)
        axiosAppJson.post('/checkout/check', {
            product_id_list: JSON.stringify(payloadCheckoutDecypt.product_id_list),
            voucher_code: voucherInput,
            to_address_id: idOfAddressSelected, // 0: get address default of user
            is_using_nowbuys_coin: usingNowbuysCoin
        })
            .then(API => {
                console.log(API);
                if (API.data.data.ship && API.data.data.ship.to_address_id === -1) setShowAddressPopup(true)
                setIsCheckingouting(false)
                setCheckoutData(API.data.data)
                setIdOfAddressSelected(API.data.data.ship.to_address_id)
            })
            .catch(err => {
                console.log(err)
                setCheckoutData(null)
            }) 
    }; 

    const handleCheckBeforeOrder = async () => {
        setIsCheckingouting(true);
        let res = await CheckoutAPI.refreshCheckout(payloadCheckoutDecypt.product_id_list, voucherInput, idOfAddressSelected, usingNowbuysCoin);
        console.log(res);
        if (!res.data.error) {
            handleOrder(res.data.data);
        } else {
            if (res.data.not_sign_in) {
                localStorage.setItem('to_signin_from_order_page', true);
                window.location.href = '/signin';
            } else {
                setCheckoutData(null);
            }
        }
    }

    const handleOrder = async (data) => {
        let product_list = data.order_product.map(product => {
            return {product_id: product.id, number: product.number, price_of_one: product.price_after_discount}
        });

        let res = await OrderAPI.order(product_list, data.ship, (data.voucher.state == 'valid')?data.voucher.id:null, usingNowbuysCoin, data.order_price);
        
        if (!res.data.error) {
            setIsCheckingouting(false);
            window.location.href = '/order';
        } else {
            if (res.data.not_sign_in) {
                localStorage.setItem('to_signin_from_order_page', true);
                window.location.href = '/signin';
            } else {
                setCheckoutData(null);
            }
        }
    }

    console.log(checkoutData);


    return (
        <div className={cn('container')}>
            {
                (checkoutData && Object.keys(checkoutData).length === 0 || isCheckingouting)
                &&
                <div className={cn('loading-cover')}>
                    <Loading props={{color: '#3b82f6'}}></Loading>
                </div>
            }
            {
                (checkoutData && Object.keys(checkoutData).length >= 0)
                &&
                <div className={cn('content')}>

                    <div className={cn('checkout_address')}>
                        <div className={cn('mail-bar')}></div>
                        <div className={cn('checkout_address__content')}>
                            <div className={cn('title-are')}>
                                <span className="material-icons">place</span> 
                                <h1>Địa chỉ nhận hàng</h1>
                            </div>
                            <div className={cn('address-are')}>
                                <div className={cn('address')}>
                                    {   (checkoutData && Object.keys(checkoutData).length > 0)
                                        &&
                                        checkoutData.user_info.address.map(address => {
                                            if (address.id === checkoutData.ship.to_address_id)
                                                return (
                                                    <div key={address.id}>
                                                        <div className={cn('people-contact')}>{address.consignee_name +' - '+ address.consignee_phone}</div>
                                                        <div className={cn('address-contact')}>{address.desc_address +', '+ address.ward_name +', '+ address.district_name +', '+ address.province_name}</div>
                                                    </div>
                                                )
                                            return '';
                                        })
                                    }
                                </div>
                                <div onClick={() => setShowAddressPopup(true)} className={cn('button-change-address')}>Thay đổi</div> 
                            </div>
                        </div> 
                    </div>

                    <div className={cn('checkout_products')}>
                        <div className={cn('checkout_products__bar')}>
                            <div className={cn('bar-title')}>
                                <p>Sản phẩm</p>                            
                            </div>
                            <div className={cn('bar-price')}>
                                <p>Đơn giá</p>
                            </div>
                            <div className={cn('bar-number')}>
                                <p>Số lượng</p>
                            </div>
                            <div className={cn('bar-total-price')}>
                                <p>Thanh toán</p>
                            </div>
                        </div>
                        
                        <div className={cn('checkout_products__container')}>
                            {
                                (checkoutData && Object.keys(checkoutData).length > 0)
                                &&
                                checkoutData.order_product.map(product => {
                                    return (
                                        <div key={product.id} className={cn('product-item')}>
                                            <div className={cn('item-product')}>
                                                <div className={cn('item-product_frame')}>
                                                    <img src={product.thumbnail_url} alt="Product"></img>
                                                </div>  
                                                <div className={cn('item-product_inf')}>
                                                    <h3>{product.full_name}</h3>
                                                    <p>{product.desc_short}</p>
                                                </div>
                                            </div>
                                            <div className={cn('item-price')}>
                                                <p>{`${Intl.NumberFormat('vi-VN', 'currency').format(product.price_after_discount)}đ`}</p>
                                            </div>
                                            <div className={cn('item-number')}>
                                                <p>{product.number}</p>
                                            </div>
                                            <div className={cn('item-total-price')}>
                                                <p>{`${Intl.NumberFormat('vi-VN', 'currency').format(product.price_after_discount*product.number)}đ`}</p>
                                            </div>
                                        </div>  
                                    )
                                })

                            }
                            
                        </div>
                            
                        <div className={cn('checkout_products__total-payment')}>
                            <p>Tổng số sản phẩm</p>
                            {
                                (checkoutData && Object.keys(checkoutData).length > 0)
                                &&
                                <p>{checkoutData.order_product.reduce((total_product, product) => (total_product + product.number), 0)}</p>
                            }
                        </div>
                        
                    </div>

                    <div className={cn('checkout_voucher')}>
                        <div className={cn('checkout_voucher__bar')}>
                            <div className={cn('bar-left')}>
                                <span className="material-icons-outlined">sell</span>
                                <p>Nowbuys Voucher</p>
                            </div>
                            <div className={cn('bar-right')}>
                                <input type="text" placeholder="Nhập mã voucher ngay để được giảm giá"
                                    ref={inputVoucherRef}
                                    value={voucherInput}
                                    onChange={(e) => { 
                                        setVoucherInput(e.target.value)
                                    }} 
                                ></input>
                                <button className={cn('submit-voucher-button', {'active': true})}
                                    onClick={() => {
                                        console.log(checkoutData.voucher)
                                        if (checkoutData && (!checkoutData.voucher || voucherInput !== checkoutData.voucher.code))
                                            refreshCheckoutData();
                                    }}
                                >ÁP DỤNG</button>
                            </div> 
                        </div>
                        {
                            (checkoutData && Object.keys(checkoutData).length > 0 && checkoutData.voucher && checkoutData.voucher.code != '')
                            &&
                            <div className={cn('checkout_voucher__container')}>
                                {  
                                    (checkoutData.voucher.code != '' && checkoutData.voucher.state == 'invalid')
                                    &&
                                    <p>Mã giảm giá không tồn tại! Vui lòng nhập mã khác</p>
                                    ||
                                    (
                                        checkoutData.voucher.for_discount == 'product'
                                        &&
                                        <Fragment>
                                            <p style={{color: '#ee4d2d', fontStyle: 'italic', fontSize: '15px'}}>Mã giảm {checkoutData.voucher.percent}% giá trị đơn hàng, tối đa {Intl.NumberFormat('vi-VN', 'currency').format(checkoutData.voucher.price_voucher_max)}đ cho đơn hàng có giá trị tối thiểu {Intl.NumberFormat('vi-VN', 'currency').format(checkoutData.voucher.order_price_min)}đ</p>
                                            {
                                                checkoutData.order_price.discount_product_price === 0
                                                &&
                                                <p style={{color: '#ccc', fontStyle: 'italic', fontSize: '15px'}}>Bạn không đủ điều kiện sử dụng voucher này!</p>
                                                ||
                                                <p style={{color: '#ccc', fontStyle: 'italic', fontSize: '15px'}}>Bạn được giảm {Intl.NumberFormat('vi-VN', 'currency').format(checkoutData.order_price.discount_product_price)}đ tổng giá trị sản phẩm</p>
                                            }
                                        </Fragment>
                                        ||
                                        checkoutData.voucher.for_discount == 'ship'
                                        &&
                                        <Fragment>
                                            <p style={{color: '#ee4d2d', fontStyle: 'italic', fontSize: '15px'}}>Mã giảm {checkoutData.voucher.percent}% phí vận chuyển, tối đa {Intl.NumberFormat('vi-VN', 'currency').format(checkoutData.voucher.price_voucher_max)}đ cho đơn hàng có phí vận chuyển tối thiểu {Intl.NumberFormat('vi-VN', 'currency').format(checkoutData.voucher.order_price_min)}đ</p>
                                            {
                                                checkoutData.order_price.discount_ship_price === 0
                                                &&
                                                <p style={{color: '#ccc', fontStyle: 'italic', fontSize: '15px'}}>Bạn không đủ điều kiện sử dụng voucher này!</p>
                                                ||
                                                <p style={{color: '#ccc', fontStyle: 'italic', fontSize: '15px'}}>Bạn được giảm {Intl.NumberFormat('vi-VN', 'currency').format(checkoutData.order_price.discount_ship_price)}đ tổng giá trị sản phẩm</p>
                                            }
                                        </Fragment>
                                    )
                                }
                            </div>
                            ||
                            <div className={cn('checkout_voucher__container')}>
                                <p>Săn mã giảm giá ngay để được giảm đến 60%, hoặc tích luỹ xu sau mỗi đơn hàng giao thành công!</p>
                            </div>
                        }
                        {
                            (checkoutData && Object.keys(checkoutData).length > 0)
                            &&
                            <div className={cn('checkout_coin')}>
                                <div className={cn('coin-left')}>
                                    <span className="material-icons-outlined">monetization_on</span>
                                    <p>Nowbuys Xu</p>
                                    {
                                        (checkoutData && Object.keys(checkoutData).length >= 0)
                                        &&
                                        <p>Bạn có {checkoutData.user_info.coin} xu</p>
                                    }
                                </div>
                                <div className={cn('coin-right', {'check': usingNowbuysCoin})}
                                    onClick = {() => {
                                        if (checkoutData.user_info.coin !== 0) {
                                            setUsingNowbuysCoin(prev => !prev)
                                        }
                                    }}
                                >
                                    <p>{Intl.NumberFormat('vi-VN', 'currency').format(checkoutData.user_info.coin)}đ</p>
                                    {
                                        usingNowbuysCoin
                                        &&
                                        <span className="material-icons-outlined">check_box</span>
                                        ||
                                        <span className="material-icons-outlined">check_box_outline_blank</span>
                                    }
                                </div>
                            </div>
                            ||
                            <div className={cn('checkout_coin')}>
                                <div className={cn('coin-left')}>
                                    <span className="material-icons-outlined">monetization_on</span>
                                    <p>Nowbuys Xu</p> 
                                </div>
                                <div className={cn('coin-right')}>
                                    <p>0đ</p> 
                                    <span className="material-icons-outlined">check_box_outline_blank</span>
                                </div>
                            </div>
                        }

                    </div>

                    <div className={cn('checkout_payment')}>
                        <div className={cn('checkout_payment__bar')}>
                            <div className={cn('bar-title')}>
                                <p>Phương thức thanh toán</p>
                            </div>
                            <div className={cn('bar-payment-method')}>
                                <div className={cn('method-item', {'active': false})}
                                    onClick={() => {}}
                                >
                                    <p>Ví Nowbuys</p>
                                </div>
                                <div className={cn('method-item', {'active': false})}
                                    onClick={() => {}}
                                >
                                    <p>Chuyển khoản ngân hàng</p>
                                </div>
                                <div className={cn('method-item', {'active': true})}
                                    onClick={() => {}}
                                >
                                    <p>Thanh toán khi nhận hàng</p>
                                </div>
                            </div>
                        </div>

                        {
                            (checkoutData && Object.keys(checkoutData).length > 0)
                            &&
                            <div className={cn('checkout_payment-total')}>
                                <div className={cn('properti-item')}>
                                    <p>Tổng số tiền sản phẩm</p>
                                    <p>{Intl.NumberFormat('vi-VN', 'currency').format(checkoutData.order_price.total_product_price)}đ</p>
                                </div>
                                <div className={cn('properti-item')}>
                                    <p>Phí vận chuyển</p>
                                    <p>{Intl.NumberFormat('vi-VN', 'currency').format(checkoutData.ship.price)}đ</p>
                                </div>
                                <div className={cn('properti-item')}>
                                    <p>Voucher ship</p>
                                    <p>-{Intl.NumberFormat('vi-VN', 'currency').format(checkoutData.order_price.discount_ship_price)}đ</p>
                                </div>
                                <div className={cn('properti-item')}>
                                    <p>Voucher nowbuys</p>
                                    <p>-{Intl.NumberFormat('vi-VN', 'currency').format(checkoutData.order_price.discount_product_price)}đ</p>
                                </div>
                                <div className={cn('properti-item')}>
                                    <p>Nowbuys Xu</p>
                                    <p>-{Intl.NumberFormat('vi-VN', 'currency').format(checkoutData.order_price.nowbuys_coin)}đ</p>
                                </div>
                                <div className={cn('properti-item')}>
                                    <p>Tổng thanh toán:</p>
                                    <h2 style={{color: '#ee4d2d', fontSize: '25px', fontWeight: 500}}>{Intl.NumberFormat('vi-VN', 'currency').format(checkoutData.order_price.total_payment_price)}đ</h2>
                                </div>
                                {/* <div className={cn('properti-item')}>
                                    <p>Vui lòng thanh toán trước:</p>
                                    <h2 style={{color: '#ee4d2d', fontSize: '25px', fontWeight: 500}}>{Intl.NumberFormat('vi-VN', 'currency').format(checkoutData.order_price.deposit_price)}đ</h2>
                                </div> */}
                            </div>
                            ||
                            <div className={cn('checkout_payment-total')}>
                                <div className={cn('properti-item')}>
                                    <p>Tổng số tiền sản phẩm</p>
                                    <p>0đ</p>
                                </div>
                                <div className={cn('properti-item')}>
                                    <p>Phí vận chuyển</p>
                                    <p>0đ</p>
                                </div>
                                <div className={cn('properti-item')}>
                                    <p>Voucher ship</p>
                                    <p>0đ</p>
                                </div>
                                <div className={cn('properti-item')}>
                                    <p>Voucher nowbuys</p>
                                    <p>0đ</p>
                                </div>
                                <div className={cn('properti-item')}>
                                    <p>Nowbuys Xu</p>
                                    <p>0đ</p>
                                </div>
                                <div className={cn('properti-item')}>
                                    <p>Tổng thanh toán:</p>
                                    <h2 style={{color: '#ee4d2d', fontSize: '25px', fontWeight: 500}}>0đ</h2>
                                </div>
                            </div>

                        }

                        <div className={cn('checkout_submit-payment')}>
                            <div className={cn('submit-payment-rule')}>
                                <p>Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo</p>
                                <Link to="/checkout">Điều khoản Nowbuys</Link>
                            </div>
                            <div className={cn('submit-payment-button')}
                                onClick={() => {}}
                            >
                                {
                                    <p onClick={() => handleCheckBeforeOrder()}>Đặt hàng</p>
                                    ||
                                    <div className={cn('circle-loading')}>
                                        <CircleLoading></CircleLoading>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                ||
                <div>invalid</div>
            }
            {
                (showAddressPopup)
                &&
                <AddressPopup props={{setShowAddressPopup, idOfAddressSelected, setIdOfAddressSelected}}></AddressPopup>
            }
        </div>
    )
}

export default Checkout

