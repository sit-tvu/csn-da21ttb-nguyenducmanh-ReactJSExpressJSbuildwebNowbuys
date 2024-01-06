
import { useState, useEffect, useContext, Fragment } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import { cartContext } from '../../context/CartContext.js'; 
import { CartAPI } from '../../apis/index.js';

import CryptoJS from 'crypto-js'; 

import Loading from '../../Components/loading/Loading.jsx'

import noCartIMG from '../../assets/no-cart.png' 

import classNames from 'classnames/bind'
import style from './Cart.module.scss'
const cn = classNames.bind(style)

const init_billing = {
    product_list: [], //{id: 0, number: 0} 
    voucher: {
        code: '', 
        price: 0
    },
    price_total: 0,
    price_after_discount: 0,
    price_save: 0,
    price_payment: 0
}

function Cart() { 

    const history = useNavigate()

    const { handleRemoveProductsFromCartGlobal } = useContext(cartContext)

    const [productInCartList, setProductInCartList] = useState(null) 

    const [voucherInf, setVoucherInf] = useState({code: '', price: 0}) 

    const [billing, setBilling] = useState(init_billing)

    const [idListSelectProduct, setIdListSelectProduct] = useState([])
    const [idListProductDeleting, setIdListProductDeleting] = useState([]) 
    const [idListProductDeleted, setIdListProductDeleted] = useState([])  
    
    const [idListProductUpdateNumber, setIdListProductUpdateNumber] = useState([])  

    useEffect (() =>{
        handleGetProductInCartList() 
    }, []) 

    useEffect (() =>{
        handleBilling();
    }, [idListSelectProduct, voucherInf.price, productInCartList]) 

    const handleBilling = async () => {
        let product_list = []
        let voucher = voucherInf
        let price_total = 0
        let price_after_discount = 0
        let price_save = 0
        let price_payment = 0

        for (let id_product of idListSelectProduct) {
            for (let product of productInCartList) {
                if (id_product  === product.id) {
                    product_list.push({id: id_product, number: product.number})
                    price_total += product.price*product.number
                    price_after_discount += product.price_after_discount*product.number
                }
            }
        }
        
        price_save = price_total - price_after_discount
        price_payment = price_after_discount - voucher.price
        
        setBilling(() => {
            return {
                product_list,
                voucher,
                price_total,
                price_after_discount,
                price_save,
                price_payment
            }
        })
    }

    const handleGetProductInCartList = async () => {
        let res = await CartAPI.getAllProducts();
        if (!res.is_err) {
            if (!res.data.error) { 
                setProductInCartList(res.data.product_in_cart)
            } else {
                if (!res.data.is_login) { 
                    history(`/signin?prev-page-url=/cart`)
                }
            }
        } else {
            console.log(res);
        } 
    } 

    const handleRemoveProductFromCart = async (list_product_id) => { 
        setIdListProductDeleting(prev => [...prev, ...list_product_id]);

        let res = await CartAPI.deleteProducts(list_product_id);

        if (!res.is_err) {
            if (!res.data.error) {

                handleRemoveProductsFromCartGlobal(list_product_id)

                setIdListProductDeleted(prev => [...prev, ...list_product_id])
                
                setTimeout(() => {
                    setIdListProductDeleting(prev => prev.filter(item => !list_product_id.includes(item)));
                    setIdListSelectProduct([]);
                    setProductInCartList(prev => prev.filter(product => !list_product_id.includes(product.id)));
                }, 700) // 0.5s with animation deleted in css
            }
        } else {
            console.log(res);
        }
    }

    const handleUpdateProductNumber = async (id_product, number_product) => { 
        setIdListProductUpdateNumber(prev => [...prev, id_product])

        let res = await CartAPI.changeNumberProducts(id_product, number_product);

        if (!res.is_err) {
            if (!res.data.error) {
                setProductInCartList(prev => {
                    return prev.map(product => {
                        if (product.id === id_product)
                            return {...product, number: number_product}
                        return product
                    })
                })
            }
            setIdListProductUpdateNumber(prev => prev.filter(item => item !== id_product))
        } else {
            console.log(res);
        } 
    } 

    const handleGotoCheckout = () => {
        let payload_checkout = {
            product_id_list: idListSelectProduct,
            voucher_code: voucherInf.code
        } 

        const payload_checkout_encrypt = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(payload_checkout), process.env.REACT_APP_CRYPT_PAYLOAD_CHECKOUT).toString())
        history(`/checkout?state=${payload_checkout_encrypt}`)

    }

    return (
        <div className={cn('container')}>
            {
                productInCartList === null
                &&
                <div style={{width: '100%', marginTop: '100px', display: 'flex', justifyContent: 'center'}}>
                    <Loading></Loading>
                </div>
                ||
                (
                    productInCartList.length === 0
                    &&
                    <div className={cn('no-cart')}>
                        <div className={cn('no-cart-frame')}>
                            <img src={noCartIMG} alt="no-cart"></img>
                        </div>
                        <h1 className={cn('no-cart-content')}>Bạn chưa thêm sản phẩm nào vào giỏ hàng</h1>
                    </div>
                    ||
                    <Fragment >

                        <div className={cn('cart-bar-controller')}>

                            <div className={cn('controller-bar')}>
                                <div className={cn('button-check', {'checked': idListSelectProduct.length === productInCartList.length})}
                                    onClick={() => {
                                        if (idListSelectProduct.length === productInCartList.length)
                                            setIdListSelectProduct([])
                                        else
                                            setIdListSelectProduct(productInCartList.map(product => product.id))
                                    }}
                                > 
                                    {
                                        idListSelectProduct.length === productInCartList.length
                                        &&
                                        <span className="material-icons">check_box</span>
                                        ||
                                        <span className="material-icons-outlined">check_box_outline_blank</span>
                                    } 
                                    <p>Chọn tất cả</p>
                                </div>
                                <div className={cn('button-delete', {'not-allow': idListSelectProduct.length === 0})}
                                    onClick = {() => {handleRemoveProductFromCart(idListSelectProduct)}}
                                >
                                    <span className="material-icons-outlined">delete_outline</span>
                                    <p>Xoá</p>
                                </div>
                                {/* <div className={cn('input-voucher-are')}>
                                    <p>Mã giảm giá Nowbuys:</p>
                                    <div className={cn('voucher-content')}>
                                        <input  
                                            value={voucherInf.code} 
                                            type="text" 
                                            placeholder={billing.product_list.length===0?'Hãy chọn sản phẩm để nhập mã giảm giá':"Nhập mã giảm giá"}
                                            onChange={(e) => { 
                                                if (billing.product_list.length>0)
                                                    setVoucherInf(prev => {return {code: e.target.value, price: 0}}) 
                                            }}
                                        ></input>
                                        <button className={cn('voucher-btn', {'not-allow': voucherInf.code.trim() === ''})}
                                            type='button' 
                                            onClick={() => {
                                                if (voucherInf.code.trim() !== '' && billing.product_list.length>0)
                                                    handleCheckVoucherCode()
                                            }}
                                        >Áp dụng</button> 
                                        <span className={cn('voucher-price')}>{billing.voucher.price!==0?`Bạn được giảm ${Intl.NumberFormat('vi-VN', 'currency').format(billing.voucher.price)}đ`:''}</span>
                                    </div>
                                </div> */}
                            </div>

                            <div className={cn('checkout-bar')}>
                                <div className={cn('total-product')}>
                                    <p>{billing.product_list.length} sản phẩm</p>
                                </div> 

                                <div className={cn('total-price')}>
                                    <span>Tổng giá sản phẩm:</span>
                                    <p>{`${Intl.NumberFormat('vi-VN', 'currency').format(billing.price_after_discount)}đ`}<span>{billing.price_total!==0?`${Intl.NumberFormat('vi-VN', 'currency').format(billing.price_after_discount)}đ`:''}</span></p>
                                </div> 

                                <div className={cn('total-sale')}>
                                    <p>Tiết kiệm: </p>
                                    <p>{`${Intl.NumberFormat('vi-VN', 'currency').format(billing.price_save)}đ`}</p>
                                </div>
                                
                                <div className={cn('total-payment')}>
                                    <p>Tổng thanh toán: </p>
                                    <p>{`${Intl.NumberFormat('vi-VN', 'currency').format(billing.price_payment)}đ`}</p>
                                </div>

                                <button type='button' className={cn('button-checkout', {'no-active': idListSelectProduct.length === 0})}
                                    onClick={() => {
                                        if (idListSelectProduct.length !== 0)
                                            handleGotoCheckout()
                                    }}
                                >Mua ngay</button> 

                            </div> 
                            
                        </div>

                        <div className={cn('cart-bar')}>
                            <div className={cn('bar_check', {'checked': idListSelectProduct.length === productInCartList.length})}> 
                                {
                                    idListSelectProduct.length === productInCartList.length
                                    &&
                                    <span onClick={() => setIdListSelectProduct([])} className="material-icons">check_box</span>
                                    ||
                                    <span onClick={() => setIdListSelectProduct(productInCartList.map(product => product.id))} className="material-icons-outlined">check_box_outline_blank</span>
                                }
                            </div>
                            <div className={cn('bar_product')}>
                                <p>Sản phẩm</p>
                            </div>
                            <div className={cn('bar_price')}>
                                <p>Đơn giá</p>
                            </div>
                            <div className={cn('bar_select-number')}>
                                <p>Số lượng</p>
                            </div>
                            <div className={cn('bar_price-pay')}>
                                <p>Thanh toán</p>
                            </div>
                            <div className={cn('bar_delete')}>
                                <p>Xoá</p>
                            </div>
                        </div>

                        <div className={cn('cart-content')}>
                            {
                                productInCartList.map((product) => {
                                    return (
                                        <div key={product.slug} className={cn('cart-product-item', {'deleting': idListProductDeleting.includes(product.id)}, {'deleted': idListProductDeleted.includes(product.id)})}>
                                            <div className={cn('overlay')}></div>
                                            <div className={cn('item-check', {'checked': idListSelectProduct.includes(product.id)})}> 
                                                {
                                                    idListSelectProduct.includes(product.id)
                                                    &&
                                                    <span onClick={() => {setIdListSelectProduct(prev => prev.filter(item => item !== product.id))}} className="material-icons">check_box</span>
                                                    ||
                                                    <span onClick={() => {setIdListSelectProduct(prev => [...prev, product.id])}} className="material-icons-outlined">check_box_outline_blank</span>
                                                } 
                                            </div>
                                            <Link className={cn('item-product')} to={`/product/details/${product.slug}`}>
                                                <div className={cn('item-product_frame')}>
                                                    <img src={product.thumbnail_url} alt="Product"></img>
                                                </div>  
                                                <div className={cn('item-product_inf')}>
                                                    <h3>{product.name_display}</h3>
                                                    <p>{product.desc_short}</p>
                                                </div>
                                            </Link>
                                            <div className={cn('item-price')}>
                                                <p>{Intl.NumberFormat('vi-VN', 'currency').format(Number(product.price_after_discount)) + 'đ'}</p>
                                                <span>Giảm {product.discount_percentage}%</span>
                                                <p>{Intl.NumberFormat('vi-VN', 'currency').format(Number(product.price))+'đ'}</p>
                                            </div>
                                            <div className={cn('item-select-number')}>
                                                <div className={cn('form-type-number', {'not-allow': idListProductUpdateNumber.includes(product.id)})}>
                                                    <div className={cn('btn-down', {'not-allow-btn': product.number === 1})}
                                                        onClick = {() => {
                                                            if (product.number > 1)
                                                                handleUpdateProductNumber(product.id, product.number - 1)
                                                        }}
                                                    ><span className="material-icons-round">remove</span></div>
                                                    <input id="quantity" value={product.number} onChange={() => false} max="5" min="1" name="quantity" type="number"/>
                                                    <div className={cn('btn-up', {'not-allow-btn': product.number === 5})}
                                                        onClick = {() => {
                                                            if (product.number < 5)
                                                                handleUpdateProductNumber(product.id, product.number + 1)
                                                        }}
                                                    ><span className="material-icons-round">add</span></div>
                                                </div>
                                            </div>
                                            <div className={cn('item-price-pay')}>
                                                <p>{Intl.NumberFormat('vi-VN', 'currency').format(Number(product.price_after_discount) * product.number) + 'đ'}</p>
                                            </div>
                                            <div className={cn('item-button-delete')}>
                                                <span className="material-icons"
                                                    onClick = {() => handleRemoveProductFromCart([product.id])}
                                                >delete_outline</span>
                                            </div>
                                        </div>
                                    )
                                }) 
                            }
                        </div>

                    </Fragment>
                ) 
            }
        </div>
    )
}

export default Cart
