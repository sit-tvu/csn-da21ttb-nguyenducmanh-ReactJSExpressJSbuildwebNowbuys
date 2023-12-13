
import { useState, useEffect, Fragment, useContext, useCallback, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import noCartIMG from '../../assets/no-cart.png'
import { userContext, cartContext, catelogyContext } from '../../context/index.js';

import { AuthenAPI, ProductAPI } from '../../apis/index.js';

import {axiosAppJson} from '../../configs/axios.js'
import debounce from 'lodash.debounce'

import classNames from 'classnames/bind'
import style from './Header.module.scss'
const cn = classNames.bind(style)

function Header() { 


    const navigate = useNavigate()
    const location = useLocation() 

    const inputSearchRef = useRef(null)
    const buttonSearchRef = useRef(null)
    
    const [search, setSearch] = useState('')
    const [resultSearch, setResultSearch] = useState([])
    const [mostSearched, setMostSearched] = useState([])
    const [historySearch, setHistorySearch] = useState([])
    const [showDropdownSearch, setShowDropdownSearch] = useState(false)

    const [hiddenHeaderMain, setHiddenHeaderMain] = useState(false)

    const { userInfoGlobal } = useContext(userContext)
    const { cartGlobal } = useContext(cartContext) 
    const catelogyListGlobal = useContext(catelogyContext)

    const catelogy_list_init = [{id: 0, name: 'Tất cả sản phẩm', thumbnail_url: ''}]
    const [catelogyList, setCatelogyList] = useState(catelogy_list_init)
    const [selected, setSelected] = useState({catelogy_id: -1})  

    useEffect(() => {
        let catelogy_id_in_url = 0;
        if (location.pathname !== '/')
            if (location.search.split('=')[1])
                catelogy_id_in_url = Number(location.search.split('=')[1])
            else
                catelogy_id_in_url = -1

        setSelected(prev => {
            return {...prev, catelogy_id: catelogy_id_in_url}
        })
    }, [location])

    useEffect(() => {
        setCatelogyList([...catelogy_list_init, ...catelogyListGlobal])
    }, [catelogyListGlobal])
    
    useEffect(() => {
        if (showDropdownSearch) {
            getMostProductSearched();
        } 
    }, [showDropdownSearch]);

    const getMostProductSearched = async () => {
        let res = await ProductAPI.mostSearch(4);
        if (!res.is_err) {
            setMostSearched(res.data);
        } else {
            console.log(res);
        }
    }

    // For effect of header
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 80 ) {
                setHiddenHeaderMain(true)
            } else {
                setHiddenHeaderMain(false)
            }
        };
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, []) 

    const handleClickOutside = (event) => {
        if (inputSearchRef.current && !inputSearchRef.current.contains(event.target)) { 
            if (buttonSearchRef.current && !buttonSearchRef.current.contains(event.target)) { 
                setShowDropdownSearch(false)
            } else {  
                if (inputSearchRef.current.value.trim() === '') {
                    inputSearchRef.current.focus()
                    setShowDropdownSearch(true)
                }
            }
        } else { 
            setShowDropdownSearch(true)
        }
    }
    
    useEffect(() => { 
        document.addEventListener('click', handleClickOutside)
        return () => { document.removeEventListener('click', handleClickOutside) }
    }, [])


    const handleSignout = async () => {
        await AuthenAPI.signout();
        window.location.reload(); 
    }

    const debounceSearch = useCallback(debounce(async (next_value) => {
        if (next_value.trim() !== '') {

            let res = await ProductAPI.search(next_value, 7);

            if (!res.is_err) {
                setResultSearch(res.data); 
            } else {
                console.log(res);
            }

        } else {
            setResultSearch([]);
        }
    }, 300), []) 

    return (
        <header className={cn('header')}>
            <div className={cn('header-main', {'hidden': hiddenHeaderMain})}>
                <Link to="/">
                    <div className={cn('header-main_logo')}>
                        <div className={cn('header-main_logo__frame')}>
                            <img src={`${process.env.REACT_APP_DOMAIN_SERVER_STATIC}/static/global/logo-app/logo.png`} alt="Logo"></img>
                        </div>
                        <div className={cn('header-main_logo__name')}>
                            <p className={cn('header-main_logo__name-main')}>Nowbuys</p>
                            <p className={cn('header-main_logo__name-sub')}>Thế giới công nghệ</p>
                        </div>
                    </div>
                </Link>
                
                <div className={cn('header-main_search')}>
                    <div className={cn('header-main_search__area')}>
                        <input type="text" placeholder="Đăng ký và nhận voucher bạn mới đến 70k!"
                            ref={inputSearchRef}
                            value = {search}
                            onChange = {(e) => {
                                setSearch(e.target.value)
                                debounceSearch(e.target.value)
                            }} 
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    if (search.trim() !== '') {
                                        navigate('/search/' + search.trim())  
                                        setShowDropdownSearch(false)
                                    } else {
                                        setShowDropdownSearch(true)
                                    }
                                }
                            }}
                        ></input> 
                        <button ref={buttonSearchRef} className={cn('search-button')}
                            onClick={() => {
                                if (search.trim() !== '') {
                                    navigate('/search/' + search.trim())  
                                    setShowDropdownSearch(false)
                                } else {
                                    setShowDropdownSearch(true)
                                }
                            }}
                        > <span className="material-icons">search</span> </button> 
                    </div>
                    {
                        showDropdownSearch
                        &&
                        <div className={cn('dropdown-search')}>
                            <div className={cn('left')}>
                                {
                                    resultSearch.map((product) => {
                                        return <div className={cn('product__item')} key={product.slug+Math.random()}
                                                onClick={(e) => {
                                                    navigate(`/product/details/${product.slug}`) 
                                                }} 
                                            >
                                                <div className={cn('product-item_frame')}>
                                                    <img src={product.thumbnail_url} alt=' '></img>
                                                </div>
                                                <div className={cn('product-item_name')}>
                                                    <h3>{product.name_display}</h3>
                                                    <p>{product.desc_short}</p>
                                                </div>
                                                <div className={cn('product-item_pricee')}>
                                                    <p>{Intl.NumberFormat('vi-VN', 'currency').format(Number(product.price_after_discount)) + 'đ'}</p>
                                                </div>
                                            </div>
                                    })
                                }
                            </div>
                            <div className={cn('right')}>
                                <div className={cn('right_cluster')}>
                                    <h4 className={cn('title')}>Sản phẩm được tìm kiếm nhiều nhất</h4>
                                    <div className={cn('container', 'height-abs-159')}>
                                        {
                                            mostSearched.map((product) => {
                                                return <div className={cn('product__item')} key={product.slug+Math.random()}
                                                        onClick={(e) => {
                                                            navigate(`/product/details/${product.slug}`) 
                                                        }} 
                                                    >
                                                        <div className={cn('product-item_frame')}>
                                                            <img src={product.thumbnail_url} alt=' '></img>
                                                        </div>
                                                        <div className={cn('product-item_name')}>
                                                            <h3>{product.name_display}</h3>
                                                            <p>{product.desc_short}</p>
                                                        </div>
                                                        <div className={cn('product-item_pricee')}>
                                                            <p>{Intl.NumberFormat('vi-VN', 'currency').format(Number(product.price_after_discount)) + 'đ'}</p>
                                                        </div>
                                                    </div>
                                            })
                                        } 
                                    </div>
                                </div>
                                <div className={cn('right_cluster')}>
                                    <h4 className={cn('title')}>Lịch sử tìm kiếm</h4>
                                    <div className={cn('container')}>
                                        <div className={cn('item-text')}><span>Laptop</span></div>  
                                        <div className={cn('item-text')}><span>Laptop</span></div>  
                                        <div className={cn('item-text')}><span>Laptop</span></div>  
                                        <div className={cn('item-text')}><span>Laptop</span></div>  
                                        <div className={cn('item-text')}><span>Laptop</span></div>  
                                        <div className={cn('item-text')}><span>Laptop</span></div>  
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>

                <div className={cn('header-main_cart')}>
                    <div className={cn('cart')}>
                            <Link to={userInfoGlobal?'/cart':`/cart?prev-page-url=${location.pathname+location.search}`} className={cn('cart-icon-frame')}><span className="material-icons"> shopping_cart </span></Link>
                        {
                            userInfoGlobal !== null
                            &&
                            <div className={cn('cart-number')}>
                                <span>{cartGlobal.length}</span>
                            </div>
                        }
                        <div className={cn('cart-view')}>
                            {
                                cartGlobal != null && cartGlobal.length > 0
                                &&
                                <Fragment>
                                    <div className={cn('cart-view_title')}>
                                        <h1>Sản phẩm bạn mới thêm</h1>
                                    </div>
                                    <div className={cn('cart-view_body')}>
                                        {
                                            cartGlobal.map((cart) => { 
                                                return (
                                                    <div className={cn('cart-view_product__item')} key={cart.slug}
                                                        onClick={(e) => {
                                                            navigate(`/product/details/${cart.slug}`) 
                                                        }} 
                                                    >
                                                        <div className={cn('product-item_frame')}>
                                                            <img src={cart.thumbnail_url} alt='Sản phẩm'></img>
                                                        </div>
                                                        <div className={cn('product-item_name')}>
                                                            <h3>{cart.name_display}</h3>
                                                            <p>Số lượng: 1</p>
                                                        </div>
                                                        <div className={cn('product-item_pricee')}>
                                                            <p>{Intl.NumberFormat('vi-VN', 'currency').format(Number(cart.price_after_discount)) + 'đ'}</p>
                                                        </div>
                                                    </div>
                                                )
                                            }) 
                                        } 
                                    </div>
                                    <div className={cn('cart-view_footer')}>
                                        <p>{cartGlobal.length} sản phẩm trong giỏ hàng</p>
                                        <button 
                                            onClick={() => {
                                                navigate(userInfoGlobal?'/cart':`/cart?prev-page-url=${location.pathname+location.search}`)
                                            }}
                                        >Xem giỏ hàng</button>
                                    </div>
                                </Fragment>
                                ||
                                <div className={cn('no-cart')}>
                                    <div className={cn('no-cart_frame')}>
                                        <img src={noCartIMG} alt="no-cart"></img>
                                    </div>
                                    <p>Chưa có sản phẩm</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <div className={cn('header-main_account')}>
                    {
                        userInfoGlobal 
                        &&
                        <div className={cn('user')}>
                            <Link to="/user/account" className={cn('user_avatar-frame')}>
                                {
                                    userInfoGlobal.avatar_url != ''
                                    && 
                                    <img src={userInfoGlobal.avatar_url + `?refreshAntiCache=${Math.random()}`} alt="Avatar"></img> // ?refreshAntiCache=${Math.random()} using to browser always update image anti cache
                                    ||
                                    <img src={`${process.env.REACT_APP_DOMAIN_SERVER_STATIC}/static/User/no-avatar.jpg`} alt="Avatar"></img>
                                }
                            </Link>
                            <div className={cn('user_options')}>
                                <h4 className={cn('user_options__name-user')}>{userInfoGlobal.lastname + ' ' + userInfoGlobal.firstname}</h4>
                                <ul>
                                    <li>
                                        <Link to='/user/account' className={cn('user_options-item')}>
                                            <span className="material-icons">person</span>
                                            <p>Thông tin tài khoản</p>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/order' className={cn('user_options-item')}>
                                            <span className="material-icons">sell</span>
                                            <p>Đơn hàng</p>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/' className={cn('user_options-item')}>
                                            <span className="material-icons-outlined">nightlight_round</span>
                                            <p>Chế độ tối</p>
                                        </Link>
                                    </li>
                                </ul>
                                <div className={cn('button-are')}>
                                    <button className={cn('button-signout')}
                                        type="button"
                                        onClick={() => handleSignout()}
                                    >Đăng xuất</button>
                                </div>
                            </div>
                        </div>
                        ||
                        <div className={cn('user-no-signin')}>
                            <Link to={`/signup?prev-page-url=${location.pathname + location.search}`} className={cn('sign-up')}><p>Đăng ký</p></Link>
                            <Link to={`/signin?prev-page-url=${location.pathname + location.search}&exit-goto-page-url=${location.pathname + location.search}`} className={cn('sign-in')}><p>Đăng nhập</p></Link>
                        </div>
                    }
                </div>

            </div>

            <div className={cn('header-sub')}>
                <div className={cn('header-sub_container')}>
                    <div className={cn('header-sub-content')}>
                        {
                            catelogyList.map((item, i) => { 
                                return <p key={i} className={cn('header-sub_item', {'active': item.id === selected.catelogy_id})}>
                                        <Link 
                                            to={item.id===0?`/`:`/products-catelogy?catelogy=${item.id}`}  
                                            onClick={() => {
                                                if (item.id !== selected.catelogy_id)
                                                    setSelected(prev => {
                                                        return {
                                                            ...prev,
                                                            catelogy_id: item.id
                                                        }
                                                    })
                                            }}
                                        >{item.name}</Link>
                                    </p>
                            })
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header