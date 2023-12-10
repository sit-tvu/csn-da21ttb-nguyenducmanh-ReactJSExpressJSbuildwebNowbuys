
import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'  

import noCartIMG from '../../assets/no-cart.png'

import Loading from '../../Components/loading/Loading.jsx' 

import classNames from 'classnames/bind'
import style from './Order.module.scss'
const cn = classNames.bind(style)  

function Order() { 

    const history = useNavigate()  

    const [dataOrder, setDataOrder] = useState(null)

    useEffect (() =>{
        const abortController = new AbortController()
    
        const getOrders = async () => {  
            try {
                fetch('http://localhost:4000/order/get', {
                    method: 'POST',
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    signal: abortController.signal
                })
                    .then(response => response.json())
                    .then(API => {
                        console.log(API.dataOrder);
                        if (API.dataOrder) {
                            setDataOrder(API.dataOrder)
                        } else {
                            if (!API.isSignin) { 
                                localStorage.setItem('to_signin_from_order_page', true)
                                window.location.href = '/signin'
                            }
                        }
                    })
                    .catch(error => console.error(error))

            } catch (err) {
                console.log(err)
            }
        }

        getOrders()

        return () => {
            abortController.abort() // Dừng fetch khi component này unmount mà fetch chưa thực hiện xong    
        }
    }, []) 

    return (
        dataOrder != null
        && 
        (
            dataOrder.length == 0
            &&
            <div className={cn('container')}>
                <div className={cn('no-cart')}>
                    <div className={cn('no-cart-frame')}>
                        <img src={noCartIMG} alt="no-cart"></img>
                    </div>
                    <h1 className={cn('no-cart-content')}>Bạn chưa có đơn hàng! Hãy mua sắm ngay!!!</h1>
                </div>
            </div>
            || 
            <div className={cn('container')}>   
                {
                    dataOrder.map((order, index) => {
                        return (
                            <div className={cn('order-item')} key={index}>
                                <div className={cn('order-item_bar')}>
                                    <div className={cn('order-item_bar__left')}>
                                        <p>Đơn hàng số {index + 1}</p>
                                    </div>
                                    <div className={cn('order-item_bar__right')}>
                                        <div className={cn('order-item_bar__right___follow-delivery')}>
                                            <span className="material-icons-outlined">local_shipping</span>
                                            <p>Đơn hàng đang trên đường giao đến bạn</p>
                                        </div>
                                        <div className={cn('order-item_bar__right___status-delivery')}>
                                            <p>ĐANG VẬN CHUYỂN</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={cn('order-item_body')}>
                                    {
                                        order.product_list.map((product, index) => {
                                            return (
                                                <div className={cn('product-item')} key={index}> 
                                                    <Link className={cn('item-product')} to={`/details?product_type=${product.productInf.product_type}&product_id_full=${product.product_id}`}>
                                                        <div className={cn('item-product_frame')}>
                                                            <img src={product.productInf.link_img} alt="Product"></img>
                                                        </div>  
                                                        <div className={cn('item-product_inf')}>
                                                            <h3>{product.productInf.name_display}</h3>
                                                            <p>{product.productInf.desc_short}</p>
                                                        </div>
                                                    </Link>
                                                    <div className={cn('item-price')}>
                                                        <p>{Intl.NumberFormat('vi-VN', 'currency').format(product.productInf.price - ((product.productInf.price/100)*product.productInf.discount_percentage)) + 'đ'}</p>
                                                        <span>Giảm {product.productInf.discount_percentage}%</span>
                                                        <p>{Intl.NumberFormat('vi-VN', 'currency').format(product.productInf.price)+'đ'}</p>
                                                    </div> 
                                                    <div className={cn('item-number')}>
                                                        <p>x{product.number}</p>
                                                    </div>
                                                    <div className={cn('item-price-pay')}>
                                                        <p>{Intl.NumberFormat('vi-VN', 'currency').format((product.productInf.price - ((product.productInf.price/100)*product.productInf.discount_percentage)) * product.number) + 'đ'}</p>
                                                    </div> 
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className={cn('order-item_footer')}>
                                    <div className={cn('order-item_footer__left')}>
                                        <p>{order.address.consignee_name} - {order.address.consignee_phone}</p>
                                        <p>{order.address.desc +', '+ order.address.commune +', '+ order.address.district +', '+ order.address.province}</p>
                                    </div>
                                    <div className={cn('order-item_footer__right')}>
                                        <p>Tổng thanh toán: </p>
                                        <p>{Intl.NumberFormat('vi-VN', 'currency').format(order.total_payment_price)}đ</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
        ||
        <div style={{marginTop: '280px'}}>
            <Loading></Loading>
        </div>
    )
}

export default Order


// [
//     {
//       voucher: {
//         code_temp: '',
//         code: '',
//         is_valid: false,
//         is_loading: false,
//         discount_ship_percentage: null,
//         discount_one_product_percentage: null,
//         discount_all_product_percentage: null,
//         discount_total_payment_percentage: null,
//         total_discount_price: null
//       },
//       coin: { value: 45000, isUsing: true },
//       payment_method: {
//         wallet_nowbuys: false,
//         credit_card: false,
//         payment_on_delivery: true
//       },
//       _id: new ObjectId("645bb87fb6f0d93196890e65"),
//       id_user: 'nowbuys_user_35',
//       product_list: [ [Object], [Object] ],
//       address: { _id: new ObjectId("645bb87fb6f0d93196890e68") },
//       total_products: 2,
//       ship_price: 230000,
//       total_price: 63934200,
//       total_payment_price: 64119200,
//       created_at: 2023-05-10T15:29:52.770Z,
//       updated_at: 2023-05-10T15:29:52.770Z,
//       __v: 0
//     }
// ]