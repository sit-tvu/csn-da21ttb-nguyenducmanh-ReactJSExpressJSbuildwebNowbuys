 
import { useNavigate } from "react-router-dom"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import classNames from "classnames/bind"
import style from './Card.module.scss'
const cn = classNames.bind(style)

export default function Card({product}) {  

    const navigate = useNavigate() 

    return (
        product.slug
        &&
        <div onClick={() => navigate(`/product/details/${product.slug}`)} key={product.slug+Math.random()} className={cn('cart-product')}>

            <span className={cn('cart-product_name')}>{product.name_display}</span>

            <div className={cn('cart-product_picture-frame')}>
                <img src={product.thumbnail_url} alt=""></img>
            </div>

            <div className={cn('cluster-foot')}>
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

                <div className={cn('statistical-bar')}>
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

        </div>
        ||
        <div key={product.slug} className={cn('cart-product')}>

                <div className={cn('cart-product_name')}>
                    <Skeleton width='234px' height='19px'/>
                </div>

                <div className={cn('cart-product_picture-frame')}>
                    <Skeleton width='234px' height='200px' />
                </div>

                <div className={cn('cluster-foot')}>
                    <div className={cn('cart-product_price-bar')}>
                        <Skeleton width='100px' height='19px' />
                        <Skeleton width='100px' height='19px' />
                    </div>
                    <div className={cn('cart-product_desc')}>
                        <Skeleton width='234px' height='48px' />
                    </div> 
                    <div className={cn('statistical-bar')}>
                        <Skeleton width='160px' height='19px' />
                        <Skeleton width='65px' height='19px' />
                    </div>
                </div> 
        </div>

    )
} 
