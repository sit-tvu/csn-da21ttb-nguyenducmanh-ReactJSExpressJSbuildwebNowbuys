
import { useContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'

import CryptoJS from 'crypto-js';

import myAxios from '../../api/axios.js';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import CardProduct from '../../Components/CardProduct/CardProduct.jsx'; 
import Loading from '../../Components/Loading/Loading.jsx';
import { userContext, cartContext } from '../../context/index.js';

import classNames from 'classnames/bind';
import style from './Products.module.scss'
const cn = classNames.bind(style)

const sort_list = [
    { id: 'increase', content: 'Giá thấp - cao' },
    { id: 'decrease', content: 'Giá cao - thấp' },
    { id: 'discount', content: 'Khuyến mãi' }
]

function PhoneProducts() {

    let title = 'Nowbuys - Điện thoại'
    document.title = title

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const catelogy_id_params = Number(searchParams.get('catelogy'))

    const { userInfoGlobal } = useContext(userContext)
    const { setCartGlobal } = useContext(cartContext)
    
    const [brandsList, setBrandsList] = useState([{}, {}, {}, {}])  
    
    let select_init = { catelogy_id: catelogy_id_params, brand_id: 0, sort_by: 'random' }
    const [select, setSelect] = useState(() => {
        let ux_support_local = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('ux_support'), process.env.REACT_APP_CRYPT_UX_SUPPORT).toString(CryptoJS.enc.Utf8))
        let select_for_this_catelogy = ux_support_local.filter(item => item.catelogy_id == catelogy_id_params)
        return select_for_this_catelogy[0]
    }) // default, random, increase, decrease, discount

    const [productList, setProductList] = useState([])

    useEffect(() => {
        // set local storage
        let ux_support_local = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('ux_support'), process.env.REACT_APP_CRYPT_UX_SUPPORT).toString(CryptoJS.enc.Utf8))
        let new_ux_support_local = ux_support_local.map(item => {
            if (item.catelogy_id == catelogy_id_params && select.catelogy_id != 0)
                return select
            return item
        })
        localStorage.setItem('ux_support', CryptoJS.AES.encrypt(JSON.stringify(new_ux_support_local), process.env.REACT_APP_CRYPT_UX_SUPPORT).toString())
    }, [select])

    useEffect(() => {
        window.scrollTo(0, 0)
        handleGetBrandList() 
        setSelect(prev => {
            let ux_support_local = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('ux_support'), process.env.REACT_APP_CRYPT_UX_SUPPORT).toString(CryptoJS.enc.Utf8))
            let select_for_this_catelogy = ux_support_local.filter(item => item.catelogy_id == catelogy_id_params)
            return select_for_this_catelogy[0]
        }) 
    }, [catelogy_id_params, userInfoGlobal])  

    const handleGetBrandList = () => {
        myAxios.get(`/general/brand/get?catelogy=${catelogy_id_params}`)
            .then(API => {
                setBrandsList(API.data)
            })
            .catch(err => console.log(err))
    } 

    const abortControllerRef = useRef(new AbortController())

    useEffect(() => {
        setProductList([{slug: null}, {slug: null}, {slug: null}, {slug: null}, {slug: null}, {slug: null}, {slug: null}, {slug: null}])
        handleGetProductList();
        return () => {
            // Cleanup function to abort the request if the component unmounts
            abortControllerRef.current.abort();
        };
    }, [select])

    const handleGetProductList = async () => {
        if (abortControllerRef.current) {
            // Abort any ongoing request before making a new one
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController(); // Update the AbortController
        try {
            myAxios.post(`/products/product-catelogy/get?catelogy=${select.catelogy_id}&brand=${select.brand_id}&sort_by=${select.sort_by}`,
                {}, // when using method post you must pass newAbortController as 3rd argument -- method get, pass newAbortController as 2rd argument
                {
                    signal: abortControllerRef.current.signal, // Set the signal property in the request config
                }
            )   
                .then(API => {
                    if (API && API.data) {
                        setProductList(API.data)
                    }
                })
                .catch(err => console.log(err))
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request aborted:', error.message)
            } else {
                console.log(error)
            }
        }
    }  

    console.log(productList);

    return (
        <div className={cn('container')}>

            <div className={cn('container-button-select')}>
                <div className={cn('menu-brand')}>
                    <div className={cn('title')}>
                        <span>Thương hiệu</span>
                    </div>
                    <div className={cn('button-brand-area')}>
                        {
                            brandsList.map((brand, index) => {
                                return (
                                    brand.id
                                    &&
                                    <div
                                        key={brand.id || index}
                                        className={cn('button-brand', { 'checked': select.brand_id === brand.id })}
                                        onClick={() => {
                                            setSelect(prev => {
                                                if (prev.brand_id === brand.id)
                                                    return { ...prev, brand_id: 0 }
                                                return {
                                                    ...prev,
                                                    brand_id: brand.id
                                                }
                                            })
                                        }}
                                    ><span>{brand.name}</span></div>
                                    ||
                                    <div key={index} style={{borderRadius: '10px', overflow: 'hidden', marginRight: '10px'}}>
                                        <Skeleton width={120 + Math.random()*100} height='40px'/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className={cn('menu_sort')}>
                    <span>Sắp xếp</span>
                    {
                        sort_list.map((sort, i) => {
                            return (
                                <div key={sort.id} className={cn('button-sort', { 'checked': sort.id === select.sort_by })}
                                    onClick={() => {
                                        setSelect(prev => {
                                            if (prev.sort_by === sort.id)
                                                return { ...prev, sort_by: select_init.sort_by }
                                            return {
                                                ...prev,
                                                sort_by: sort.id
                                            }
                                        })
                                    }
                                    }
                                >
                                    {
                                        sort.id === select.sort_by
                                        &&
                                        <span className="material-icons">check_box</span>
                                        ||
                                        <span className="material-icons-outlined">check_box_outline_blank</span>
                                    }
                                    <span>{sort.content}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className={cn('container-products')}>
                {
                    productList === null
                    &&
                    <div style={{ width: '100%', marginTop: '150px' }}>
                        <Loading></Loading>
                    </div>
                    ||
                    productList.map((phone, index) => {
                        return (
                            <CardProduct key={phone.slug+Math.random()} product={phone}></CardProduct>
                        )
                    })
                }
            </div>

        </div>

    )
}

export default PhoneProducts