
import { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';  

import noCartIMG from '../../assets/no-cart.png';

import { OrderAPI } from '../../apis/index.js';

import Loading from '../../Components/loading/Loading.jsx'; 

import classNames from 'classnames/bind';
import style from './Order.module.scss';
const cn = classNames.bind(style);

const init_nav = [
    {
        id: 'all',
        title: 'Tất cả',
        select: true
    },
    {
        id: 'processing',
        title: 'Chờ xử lý',
        select: false
    },
    {
        id: 'transport',
        title: 'Vận chuyển',
        select: false
    },
    {
        id: 'delivering',
        title: 'Đang giao',
        select: false
    },
    {
        id: 'finished',
        title: 'Hoàn thành',
        select: false
    },
    {
        id: 'canceled',
        title: 'Đã huỷ',
        select: false
    },
    {
        id: 'warranty',
        title: 'Bảo hành',
        select: false
    }
];

const init_order_data = {
    all: null,
    processing: null,
    transport: null,
    delivering: null,
    finished: null,
    canceled: null,
    warranty: null
};


export default function Order() { 

    const path_app = useLocation();

    const [fixedNavBar, setFixedNavBar] = useState(false);
    const [navigateList, setNavigateList] = useState(init_nav);

    const [orderData, setOrderData] = useState(init_order_data);

    // For effect of header
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 80 ) {
                setFixedNavBar(true)
            } else {
                setFixedNavBar(false)
            }
        };
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, []);

    useEffect(() => {
        handleSelectNav();
    }, [path_app]);

    const handleSelectNav = () => {
        const queryParams = new URLSearchParams(path_app.search);
        const type = queryParams.get('type');
        let path_app_right = false;

        setNavigateList(prev => {
            let new_prev = prev.map(item => {
                if (item.id == type)
                    path_app_right = true;

                return {...item, select: item.id == type}
            })

            if (!path_app_right)
                new_prev[0].select = true;
        
            return new_prev;
        })
    }

    useEffect(() => {
        handleGetOrderByState(navigateList.find(item => item.select === true).id);
    }, [navigateList]);

    const handleGetOrderByState = async (state) => {

        console.log('handleGetOrderByState ' + state);
        
        if (!orderData[state]) {
            let res = await OrderAPI.getOrderByState(state);

            if (!res.data.error) {
                setOrderData(prev => { 
                    prev[state] = res.data.data;
                    return prev;
                });
            } else {
                if (res.data.not_sign_in) {
                    console.log(res);
                    localStorage.setItem('to_signin_from_order_page', true);
                    window.location.href = '/signin';
                } else {
                    console.log(res.data);
                }
            }
        }
    }

    console.log(orderData);
    console.log(orderData[navigateList.find(item => item.select === true).id]);

    let state = navigateList.find(item => item.select === true).id;

    return (
        <div className={cn('container-order')}>
            <div className={cn('nav-bar', {'fixed': fixedNavBar})}>
                {
                    navigateList.map(item => {
                        return <Link to={'?type='+item.id} key={item.id} className={cn('item', {'select': item.select})}>
                            <span>{item.title}</span>
                        </Link>
                    })
                }
            </div>
            <div className={cn('body')}>
                {   orderData[state] != null
                    &&
                    orderData[state].map((order, index) => { 
                        return (
                            <div className={cn('order-item')} key={index + Math.random()}>
                                <div className={cn('order-item_bar')}>
                                    <div className={cn('order-item_bar__left')}>
                                        <p>Đơn hàng số {index + 1}</p>
                                    </div>
                                    <div className={cn('order-item_bar__right')}>
                                        {/* <div className={cn('order-item_bar__right___follow-delivery')}>
                                            <span className="material-icons-outlined">local_shipping</span>
                                            <p>Đơn hàng đang trên đường giao đến bạn</p>
                                        </div> */}
                                        <div className={cn('order-item_bar__right___status-delivery')}>
                                            {
                                                order.state === 'processing'
                                                &&
                                                <p>ĐANG XỬ LÝ</p>
                                                ||
                                                order.state === 'transport'
                                                &&
                                                <p>ĐANG VẬN CHYỂN</p>
                                                ||
                                                order.state === 'delivering'
                                                &&
                                                <p>ĐANG GIAO HÀNG</p>
                                                ||
                                                order.state === 'finished'
                                                &&
                                                <p>HOÀN THÀNH</p>
                                                ||
                                                order.state === 'canceled'
                                                &&
                                                <p>ĐÃ HUỶ</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={cn('order-item_body')}>
                                    {
                                        order.product_list.map((product, index) => {
                                            return (
                                                <div className={cn('product-item')} key={index}> 
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
                                                        <p>{Intl.NumberFormat('vi-VN', 'currency').format(product.price_of_one) + 'đ'}</p>
                                                        {/* <span>Giảm {product.discount_percentage}%</span>
                                                        <p>{Intl.NumberFormat('vi-VN', 'currency').format(product.price)+'đ'}</p> */}
                                                    </div> 
                                                    <div className={cn('item-number')}>
                                                        <p>x{product.number_product_buy}</p>
                                                    </div>
                                                    <div className={cn('item-price-pay')}>
                                                        <p>{Intl.NumberFormat('vi-VN', 'currency').format(product.price_of_one) + 'đ'}</p>
                                                        {/* <p>{Intl.NumberFormat('vi-VN', 'currency').format((product.price - ((product.price/100)*product.discount_percentage)) * product.number) + 'đ'}</p> */}
                                                    </div> 
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className={cn('order_footer')}>
                                    <div className={cn('left')}> 
                                        <p>{order.ship.consignee_name} - {order.ship.consignee_phone}</p>
                                        <p>{order.ship.desc_address +', '+ order.ship.ward_name +', '+ order.ship.district_name +', '+ order.ship.province_name}</p>
                                    </div>
                                    <div className={cn('right')}>
                                        <div className={cn('price-area')}>
                                            <p className={cn('property')}>Tổng thanh toán: </p>
                                            <p className={cn('price')}>{Intl.NumberFormat('vi-VN', 'currency').format(order.total_payment_price)}đ</p>
                                        </div>
                                        {/* <div className={cn('button-area')}>
                                            <button type='button' className={cn('btn-cancel')}>Huỷ</button>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
};