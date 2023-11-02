 
import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import myAxios from "../../api/axios.js"

import { cartContext } from '../../context/index.js'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import CircleLoading from '../Loading/CircleLoading.jsx'

import classNames from "classnames/bind"
import style from './CardProduct.module.scss'
const cn = classNames.bind(style)

export default function CardProduct({product}) {  

    const history = useNavigate()
    const { handleAddProductInCart, handleRemoveOneProductFromCartGlobal } = useContext(cartContext)

    const [isLoadingHandleCart, setIsLoadingHandleCart] = useState(false)

    const [thisProduct, setThisProduct] = useState(product)

    const handleAddCart = (id_product) => {
        setIsLoadingHandleCart(true)
        myAxios.post(`/cart/add-product-to-cart?product_id=${id_product}`)
            .then(API => {
                if (!API.data.error) {
                    handleAddProductInCart(API.data.product_data)
                    setThisProduct(prev => {
                        return {
                            ...prev,
                            is_in_cart: 1
                        }
                    })
                } else {
                    if (API.data.code_status === 0) 
                        history('/signin')
                }
                setIsLoadingHandleCart(false)
            })
            .catch(err => console.log(err))
    }
    
    const handleRemoveCart = (id_product) => {
        setIsLoadingHandleCart(true)
        myAxios.post(`/cart/remove-one-product-from-cart?product_id=${id_product}`)
            .then(API => {
                if (!API.data.error) {
                    handleRemoveOneProductFromCartGlobal(id_product)
                    setThisProduct(prev => {
                        return {
                            ...prev,
                            is_in_cart: 0
                        }
                    })
                } else {
                    if (API.data.code_status === 0) 
                        history('/signin')
                }
                setIsLoadingHandleCart(false)
            })
            .catch(err => console.log(err))
    }

    console.log(thisProduct);

    return (
        thisProduct.slug
        &&
        <div key={thisProduct.slug+Math.random()} className={cn('cart-product')}>

            <Link to={`/product/details/${thisProduct.slug}`} className={cn('can-click')}>

                <div className={cn('cart-product_name')}>
                    <span>{thisProduct.name_display}</span>
                </div>

                <div className={cn('cart-product_picture-frame')}>
                    <img src={thisProduct.thumbnail_url} alt=""></img>
                </div>

                <div className={cn('cart-product_desc')}>
                    <span>{thisProduct.desc_short}</span>
                </div>

                <div className={cn('cart-product_price-bar')}>
                    <div className={cn('price-discounted')}>
                        <span>{Intl.NumberFormat('vi-VN', 'currency').format(thisProduct.price - ((thisProduct.price/100)*thisProduct.discount_percentage)) + 'đ'}</span>
                    </div>
                    <div className={cn('price-no-discount')}>
                        <span>{Intl.NumberFormat('vi-VN', 'currency').format(thisProduct.price)+'đ'}</span>
                    </div>
                </div>
 
            </Link>

            <div className={cn('button-bar')}>

                <div className={cn('buy-btn')}>
                    <span>Mua Ngay</span>
                </div>
                <div className={cn('add-cart-btn')}>
                    {   
                        isLoadingHandleCart
                        &&
                        <div style={{width: '32px', height: '32px'}}>
                            <CircleLoading />
                        </div>
                        ||
                        (
                            thisProduct.is_in_cart === 1
                            &&
                            <span  onClick={() => handleRemoveCart(thisProduct.id)} style = {{color: '#3b82f6'}} className="material-icons-outlined">check_circle</span>
                            ||
                            <span onClick={() => handleAddCart(thisProduct.id)}  className="material-icons-outlined">shopping_cart</span>
                        )
                    } 
                </div>
            </div>
        </div>
        ||
        <div key={thisProduct.slug} className={cn('cart-product')}>

            <div className={cn('can-click')}>

                <div className={cn('cart-product_name')}>
                    <Skeleton width='234px' height='19px'/>
                </div>

                <div className={cn('cart-product_picture-frame')}>
                    <Skeleton width='234px' height='190px' />
                </div>

                <div className={cn('cart-product_desc')}>
                    <Skeleton width='234px' height='35px' />
                </div>

                <div className={cn('cart-product_price-bar')}>
                    <Skeleton width='85px' height='16px' />
                    <Skeleton width='85px' height='16px' />
                </div>

            </div>

            <div className={cn('button-bar')}>

                <div className={cn('buy-btn')}>
                    <Skeleton width='188px' height='36px' />
                </div>
                <div className={cn('add-cart-btn')}>
                    <Skeleton width='36px' height='36px' />
                </div>
            </div>
        </div>

    )
} 
