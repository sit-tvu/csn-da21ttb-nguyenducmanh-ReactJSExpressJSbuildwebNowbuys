 
import { useNavigate } from "react-router-dom"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import classNames from "classnames/bind"
import style from './CardProduct.module.scss'
const cn = classNames.bind(style)

export default function CardProduct({product}) {  

    const navigate = useNavigate() 

    return (
        product.slug
        &&
        <div onClick={() => navigate(`/product/details/${product.slug}`)} key={product.slug+Math.random()} className={cn('cart-product')}>

            <div className={cn('cart-product_name')}>
                <span>{product.name_display}</span>
            </div>

            <div className={cn('cart-product_picture-frame')}>
                <img src={product.thumbnail_url} alt=""></img>
            </div>

            <div className={cn('cart-product_price-bar')}>
                <div className={cn('price-discounted')}>
                    <span>{Intl.NumberFormat('vi-VN', 'currency').format(product.price - ((product.price/100)*product.discount_percentage)) + 'đ'}</span>
                </div>
                <div className={cn('price-no-discount')}>
                    <span>{Intl.NumberFormat('vi-VN', 'currency').format(product.price)+'đ'}</span>
                </div>
            </div>

            <span className={cn('cart-product_desc')}>
                {product.desc_short} 
            </span>

            <div className={cn('foot-bar')}>
                <div className={cn('star')}>
                    {
                        product.average_star >= 0.1 && product.average_star <= 0.9
                        &&
                        <span className="material-icons-round">star_half</span>
                        ||
                        <span className="material-icons-round">{product.average_star>=1?'star':'star_outline'}</span>
                    } 
                    {
                        product.average_star >= 1.1 && product.average_star <= 1.9
                        &&
                        <span className="material-icons-round">star_half</span>
                        ||
                        <span className="material-icons-round">{product.average_star>=2?'star':'star_outline'}</span>
                    } 
                    {
                        product.average_star >= 2.1 && product.average_star <= 2.9
                        &&
                        <span className="material-icons-round">star_half</span>
                        ||
                        <span className="material-icons-round">{product.average_star>=3?'star':'star_outline'}</span>
                    } 
                    {
                        product.average_star >= 3.1 && product.average_star <= 3.9
                        &&
                        <span className="material-icons-round">star_half</span>
                        ||
                        <span className="material-icons-round">{product.average_star>=4?'star':'star_outline'}</span>
                    } 
                    {
                        product.average_star >= 4.1 && product.average_star <= 4.9
                        &&
                        <span className="material-icons-round">star_half</span>
                        ||
                        <span className="material-icons-round">{product.average_star>=5?'star':'star_outline'}</span>
                    } 
                </div>
                <div className={cn('sold')}>{product.total_num_star} đã bán</div>
            </div>
        </div>
        ||
        <div key={product.slug} className={cn('cart-product')}>

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
