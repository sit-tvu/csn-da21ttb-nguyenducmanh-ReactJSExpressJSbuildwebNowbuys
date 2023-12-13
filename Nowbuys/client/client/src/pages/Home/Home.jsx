

import { useState, useContext, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

import {axiosAppJson} from '../../configs/axios.js'
import { userContext, cartContext, catelogyContext } from '../../context/index.js';

import Loading from '../../Components/loading/Loading.jsx'; 
import CardProduct from '../../Components/card/Card.jsx';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import 'swiper/scss/navigation'
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";


import className from 'classnames/bind'
import style from './Home.module.scss'
const cn = className.bind(style)

function AllProducts() {
    document.title = 'Nowbuys'

    const navigationPhonePrevRef = useRef(null)
    const navigationPhoneNextRef = useRef(null)
    const navigationLaptopPrevRef = useRef(null)
    const navigationLaptopNextRef = useRef(null)

    const [phonesInHomePage, setPhonesInHomePage] = useState([{slug: null}, {slug: null}, {slug: null}, {slug: null}]) // Data of all products
    const [laptopsInHomePage, setLaptopsInHomePage] = useState([{slug: null}, {slug: null}, {slug: null}, {slug: null}]) // Data of all products
    const [smartWatchInHomePage, setSmartWatchInHomePage] = useState([{slug: null}, {slug: null}, {slug: null}, {slug: null}]) // Data of all products

    const {userInfoGlobal} = useContext(userContext)
    const {setCartGlobal} = useContext(cartContext)
    const catelogyListGlobal = useContext(catelogyContext)

    useEffect(() => {
        handleGetProductsInHomePage(1)
        handleGetProductsInHomePage(2) 
    }, [userInfoGlobal])

    const handleGetProductsInHomePage = (catelogy_id) => {
        axiosAppJson.post(`/products/show-in-home-page?catelogy=${catelogy_id}`)
            .then(API => { 
                switch (catelogy_id) {
                    case 1: setPhonesInHomePage(API.data); break;
                    case 2: setLaptopsInHomePage(API.data); break;
                }
            })
            .catch(error => console.log(error))
    } 

    return (
        <div className={cn('container')}> 

            <div className={cn('body_overview')}>
                <div className={cn('overview_heading')}>
                    <div className={cn('heading_left')}>
                        <span className={cn('first-word')}>NowBuys.</span>
                        <span className={cn('second-word')}>Thoả sức đắm chìm vào thế giới công nghệ</span>
                        <p className={cn('third-word')}>Sống trọn đam mê</p>
                    </div>
                    <div className={cn('heading_right')}>
                        <div className={cn('heading_right-item')}>
                            <div className={cn('item_frame')}>
                                <img src={`${process.env.REACT_APP_DOMAIN_SERVER}/static/global/overview/support.png`} alt=""></img>
                            </div>
                            <div className={cn('item_content')}>
                                <p className={cn('item_content__title')}>Cách thức mua hàng</p>
                                <Link to="" className={cn('item_content__sub-title')}>Đi đến hướng dẫn</Link>
                            </div>
                        </div>
                        <div className={cn('heading_right-item')}>
                            <div className={cn('item_frame')}>
                                <img src={`${process.env.REACT_APP_DOMAIN_SERVER}/static/global/logo-app/logo.png`} alt=""></img>
                            </div>
                            <div className={cn('item_content')}>
                                <p className={cn('item_content__title')}>Hiểu thêm về chúng tôi</p>
                                <Link to="" className={cn('item_content__sub-title')}>Thông tin</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cn('overview_portfolio')}>
                    {
                        catelogyListGlobal.map((catelogy, i) => {
                            return <Link to={'/products-catelogy?catelogy='+catelogy.id} key={i} className={cn('portfolio_item')}>
                                    <div className={cn('portfolio_item__frame')}>
                                        <img src={catelogy.thumbnail_url} alt=""></img>
                                    </div>
                                    <h3 className={cn('portfolio_item__name')}>{catelogy.name}</h3>
                                </Link>
                        })
                    } 
                </div>
            </div>

            <div className={cn('body_notable-envent')}>
                <img src={`${process.env.REACT_APP_DOMAIN_SERVER}/static/introduces/notable-envent/notable-events.png`} alt=""></img>
            </div>

            <div className={cn('body_phone')}>
                <p className={cn('phone_title')}>Điện Thoại</p>
                <div className={cn('phone_contain')}>
                    {   
                        phonesInHomePage.length !== 0
                        &&
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={38} 
                            onBeforeInit={(swiper) => { 
                                setTimeout(() => {
                                    // Override prevEl & nextEl now that refs are defined
                                    swiper.params.navigation.prevEl = navigationPhonePrevRef.current
                                    swiper.params.navigation.nextEl = navigationPhoneNextRef.current

                                    // Re-init navigation
                                    swiper.navigation.destroy()
                                    swiper.navigation.init()
                                    swiper.navigation.update()
                                })
                            }}
                            navigation={{
                                prevEl: navigationPhonePrevRef.current,
                                nextEl: navigationPhoneNextRef.current,
                            }}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                            }}
                            // pagination={{
                            //     clickable: true,
                            // }} 
                            modules={[Autoplay, Pagination, Navigation]}
                            className={cn('phone_horizontal-scrolling')}
                        >
                            {
                                phonesInHomePage.map((phone, i) => {
                                    return (
                                        <SwiperSlide key={phone.slug+Math.random()} virtualIndex={i}>
                                            <CardProduct product={phone}/>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                        || <Loading></Loading>
                    } 

                    <div ref={navigationPhoneNextRef} className={cn('button-prev')}>
                        <span className="material-icons-round">chevron_right</span>
                    </div>
                    <div ref={navigationPhonePrevRef} className={cn('button-next')}>
                        <span className="material-icons-round">chevron_left</span>
                    </div>
                </div>
            </div>

            <div className={cn('body_laptop')}>
                <p className={cn('laptop_title')}>Máy tính xách tay</p>
                <div className={cn('laptop_contain')}>
                        {
                            laptopsInHomePage.length !== 0
                            &&
                            <Swiper
                                slidesPerView={4}
                                spaceBetween={38} 
                                onBeforeInit={(swiper) => { 
                                    setTimeout(() => {
                                        // Override prevEl & nextEl now that refs are defined
                                        swiper.params.navigation.prevEl = navigationLaptopPrevRef.current
                                        swiper.params.navigation.nextEl = navigationLaptopNextRef.current

                                        // Re-init navigation
                                        swiper.navigation.destroy()
                                        swiper.navigation.init()
                                        swiper.navigation.update()
                                    })
                                }}
                                navigation={{
                                    prevEl: navigationLaptopPrevRef.current,
                                    nextEl: navigationLaptopNextRef.current,
                                }}
                                autoplay={{
                                    delay: 2000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true
                                }}
                                // pagination={{
                                //     clickable: true,
                                // }} 
                                modules={[Autoplay, Pagination, Navigation]}
                                className={cn('laptop_horizontal-scrolling')}
                            >
                                {
                                    laptopsInHomePage.map((laptop) => {
                                        return (
                                            <SwiperSlide key={laptop.slug+Math.random()} virtualIndex={laptop.id}>
                                                <CardProduct product={laptop}/>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                            || <Loading></Loading>
                        }                        
                    <div ref={navigationLaptopNextRef} className={cn('button-prev')}>
                        <span className="material-icons-round">chevron_right</span>
                    </div>
                    <div ref={navigationLaptopPrevRef} className={cn('button-next')}>
                        <span className="material-icons-round">chevron_left</span>
                    </div>
                </div>
            </div>


            <div className={cn('body_intro-smart-watch')}>
                <div className={cn('intro-smart-watch__left')}>
                    <p className={cn('left_name')}>Smart Watch</p>
                    <p className={cn('left_content-intro')}>Không chỉ xem giờ</p>
                    <p className={cn('left_content-intro')}>... Công cụ chăm sóc sức khoẻ</p>
                    <div className={cn('left_link')}>
                        <Link to="">Tìm hiểu thêm</Link>
                        <Link to="">Khám phá ngay</Link>
                    </div>
                    <p className={cn('left_slogan')}>Sành điệu - Cá tính - Hiện đại</p>
                </div>
                <div className={cn('intro-smart-watch__right')}>
                    <div className={cn('right_img-frame')}>
                        <img src={`${process.env.REACT_APP_DOMAIN_SERVER}/static/introduces/smart-watch/intro-smart-watch.png`} alt=""></img>
                    </div>
                </div>
            </div>

            <div className={cn('body_smart-watch')}>

                <div className={cn('smart-watch_contain')}>

                    {
                        smartWatchInHomePage.map((smartWatch, index) => {
                            return (
                                <div key={index} className={cn('contain_item')}>
                                    <div className={cn('contain_item__frame')}>
                                        <img src={smartWatch.link_img} alt=""></img>
                                    </div>
                                    <p className={cn('contain_item__status')}>New</p>
                                    <div className={cn('contain_item__name')}>
                                        <span>{smartWatch.name_display}</span>
                                    </div>
                                    <div className={cn('contain_item__price')}>
                                        <span>{Intl.NumberFormat('vi-VN', 'currency').format(smartWatch.price) + 'đ'}</span>
                                    </div>
                                    <div className={cn('contain_item__btn-buy')}>
                                        <span>Mua Ngay</span>
                                    </div>
                                    <Link to="#" className={cn('contain_item__link')}>Chi tiết sản phẩm</Link>
                                </div>
                            )
                        })
                    }

                </div>

                <div className={cn('smart-watch_link-bar')}>
                    <Link to="" className={cn('link-area')}>
                        <span>Xem tất cả</span>
                        <span className="material-icons-outlined">chevron_right</span>
                    </Link>
                </div>
            </div>

            <div className={cn('body_intro-order')}>
                <img src={`${process.env.REACT_APP_DOMAIN_SERVER}/static/global/intro-shipper/intro-shipper.png`} alt=""></img>

                <div className={cn('intro-order_slide-ship')}>
                    <div className={cn('intro-order_slide-ship__img-frame')}>
                        <img src={`${process.env.REACT_APP_DOMAIN_SERVER}/static/global/intro-shipper/shipper-1.png`} alt=""></img>
                    </div>
                    <div className={cn('intro-order_slide-ship__img-frame')}>
                        <img src={`${process.env.REACT_APP_DOMAIN_SERVER}/static/global/intro-shipper/shipper-2.png`} alt=""></img>
                    </div>
                    <div className={cn('intro-order_slide-ship__img-frame')}>
                        <img src={`${process.env.REACT_APP_DOMAIN_SERVER}/static/global/intro-shipper/shipper-3.png`} alt=""></img>
                    </div>
                    <div className={cn('intro-order_slide-ship__img-frame')}>
                        <img src={`${process.env.REACT_APP_DOMAIN_SERVER}/static/global/intro-shipper/shipper-4.png`} alt=""></img>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default AllProducts