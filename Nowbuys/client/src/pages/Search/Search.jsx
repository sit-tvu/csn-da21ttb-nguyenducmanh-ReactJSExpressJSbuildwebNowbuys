
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import {axiosAppJson} from '../../configs/axios'


import CardProduct from '../../Components/card/Card'
import Loading from '../../Components/loading/Loading'

import notFoundIMG from '../../assets/not-found.png'

import classNames from 'classnames/bind'
import style from './Search.module.scss'
const cn = classNames.bind(style)


function Search() {

    document.title = 'Nowbuys - Tìm kiếm'

    const params = useParams()
    let search = params.search.trim()

    console.log(search);

    const [resultSearch, setResultSearch] = useState([])
    
    useEffect(() => {
        axiosAppJson.post('/products/search', {
            search: search,
            product_per_page: 10
        })
            .then(API => {
                setResultSearch(API.data);
            })
            .catch(err => console.log(err));
    }, [search])  


    return (
        <div className={cn('container')} onLoad={console.log('Return')}>

            <div className={cn('title')}>Kết quả tìm kiếm cho '{search}'</div>

            <div className={cn('container-products')}>
                {
                    resultSearch != null
                    &&
                    (   
                        resultSearch.length != 0
                        &&
                        resultSearch.map((products, index) => {
                            return (
                                <CardProduct key={products.slug+Math.random()} product={products}></CardProduct>
                            )
                        })
                        ||
                        <div className={cn('not-found')}>
                            <img src={notFoundIMG} alt="not-found"></img>
                            <p>Không tìm thấy kết quả nào</p>
                            <p>Hãy sử dụng các từ khoá bao quát hơn</p>
                        </div> 
                    )
                    || 
                    (
                        resultSearch == null
                        &&
                        <div style={{width: '100%', marginTop: '150px'}}>
                            <Loading></Loading>
                        </div>
                    )
                }
            </div>

        </div>

    )
} 

export default Search