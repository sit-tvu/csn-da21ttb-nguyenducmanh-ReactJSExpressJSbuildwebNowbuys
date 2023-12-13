// import {useContext, useEffect, useState, useRef} from 'react'
// import { useNavigate, useParams  } from "react-router-dom"

// import { format } from 'date-fns'

// import {axiosAppJson} from '../../configs/axios.js'

// import Loading from '../../Components/loading/Loading.jsx'
// import CircleLoading from '../../Components/loading/CircleLoading.jsx'
// import { cartContext } from '../../context/CartContext.js'

// import CryptoJS from 'crypto-js'; 

// import classNames from "classnames/bind"
// import style from "./Details.module.scss"

// const cn = classNames.bind(style)

// const properties_product_detail = [
//     {props: 'screen', ui: 'Màn hình'},
//     {props: 'os', ui: 'Hệ điều hành'},
//     {props: 'camera_rear', ui: 'Camera sau'},
//     {props: 'camera_front', ui: 'Camera trước'},
//     {props: 'cpu', ui: 'CPU'},
//     {props: 'gpu', ui: 'GPU'},
//     {props: 'ram', ui: 'RAM'},
//     {props: 'storage', ui: 'Bộ nhớ lưu trữ'},
//     {props: 'connector', ui: 'Kết nối'},
//     {props: 'design', ui: 'Thiết kế'},
//     {props: 'demensions_weight', ui: 'Khối lượng'},
//     {props: 'sim', ui: 'SIM'},
//     {props: 'battery', ui: 'Pin'},
//     {props: 'charge', ui: 'Sạc'}
// ];

// const init_comments_paginate = {
//     next_paginate: 1,
//     current_paginate: 0,
//     prev_paginate: 0,
//     cmt_per_paginate: 3
// };

// const init_statistical_comments = {
//     total_num_star: 0,
//     average_star: 0,
//     five_star: 0,
//     four_star: 0,
//     three_star: 0,
//     two_star: 0,
//     one_star: 0
// };

export default function Details() { 

    // let title = 'Nowbuys - Chi tiết sản phẩm';
    // document.title = title;

    // const params = useParams()
    // let slug_this_product = params.slug

    // const {handleAddProductInCart, handleRemoveOneProductFromCartGlobal} = useContext(cartContext)
    
    // const [thisProduct, setThisProduct] = useState(null)
    // const [thisCommentsList, setThisCommentsList] = useState([])
    // const [thisCommentsPaginate, setThisCommentsPaginate] = useState(init_comments_paginate)
    // const [thisCommentStatistical, setThisCommentStatistical] = useState(init_statistical_comments) 

    // const [isLoadingHandleCart, setIsLoadingHandleCart] = useState(false)

    // const history = useNavigate()
    
    // const abortControllerRefThisProduct = useRef(new AbortController())
    // const abortControllerRefThisStatisticalComments = useRef(new AbortController())
    // const abortControllerRefThisComments = useRef(new AbortController()) 

    // useEffect(() => { 
    //     window.scrollTo(0, 0)
    //     setThisProduct(null)
    //     handleGetThisProduct()
        
    //     return () => {
    //         abortControllerRefThisProduct.current.abort()
    //         abortControllerRefThisStatisticalComments.current.abort()
    //         abortControllerRefThisComments.current.abort()
    //     }
    // }, [slug_this_product])

    // useEffect(() => {
    //     if (thisProduct && thisProduct.id) { 
    //         handleGetStatisticalComments()
    //         handleGetComments()
    //     }
    // }, [thisProduct])

    // const handleGetThisProduct = () => {
    //     if (abortControllerRefThisProduct.current) {
    //         abortControllerRefThisProduct.current.abort()
    //     }

    //     abortControllerRefThisProduct.current = new AbortController()
    //     try {
    //         axiosAppJson.post(`/products/details/get?slug=${slug_this_product}`,
    //             {}, // when using method post you must pass newAbortController as 3rd argument -- method get, pass newAbortController as 2rd argument
    //             {
    //                 signal: abortControllerRefThisProduct.current.signal, // Set the signal property in the request config
    //             }
    //         )   
    //             .then(API => {
    //                 setThisProduct(API.data);
    //             })
    //             .catch(err => console.log(err))
    //     } catch (error) {
    //         if (error.name === 'AbortError') {
    //             console.log('Request aborted:', error.message)
    //         } else {
    //             console.log(error)
    //         }
    //     }
    // }

    // const handleGetStatisticalComments = () => {
    //     if (abortControllerRefThisStatisticalComments.current) {
    //         abortControllerRefThisStatisticalComments.current.abort();
    //     }

    //     abortControllerRefThisStatisticalComments.current = new AbortController()
    //     try {
    //         axiosAppJson.post(`/comment/statistical-comments/get?product_id=${thisProduct.id}`,
    //             {}, // when using method post you must pass newAbortController as 3rd argument -- method get, pass newAbortController as 2rd argument
    //             {
    //                 signal: abortControllerRefThisStatisticalComments.current.signal, // Set the signal property in the request config
    //             }
    //         )   
    //             .then(API => {
    //                 if (!API.data.error) { 
    //                     setThisCommentStatistical(API.data.statistical);
    //                 }
    //             })
    //             .catch(err => console.log(err))
    //     } catch (error) {
    //         if (error.name === 'AbortError') {
    //             console.log('Request aborted:', error.message)
    //         } else {
    //             console.log(error) 
    //         }
    //     }
    // }

    // const handleGetComments = () => {
    //     if (abortControllerRefThisComments.current) {
    //         abortControllerRefThisComments.current.abort()
    //     }

    //     abortControllerRefThisComments.current = new AbortController()
    //     try {
    //         axiosAppJson.post(`/comment/comments/get?product_id=${thisProduct.id}&cmt_per_load=${(thisCommentsPaginate &&thisCommentsPaginate.cmt_per_paginate)?thisCommentsPaginate.cmt_per_paginate:1}&paginate=${(thisCommentsPaginate &&thisCommentsPaginate.next_paginate)?thisCommentsPaginate.next_paginate:1}`,
    //             {}, // when using method post you must pass newAbortController as 3rd argument -- method get, pass newAbortController as 2rd argument
    //             {
    //                 signal: abortControllerRefThisComments.current.signal, // Set the signal property in the request config
    //             }
    //         )   
    //             .then(API => {
    //                 if (!API.data.error) { 
    //                     setThisCommentsPaginate(() => {
    //                         let {comment_list, ...other} = API.data
    //                         return {...other}
    //                     })
    //                     setThisCommentsList(prev => [...prev, ...API.data.comment_list]) 
    //                 }
    //             })
    //             .catch(err => console.log(err))
    //     } catch (error) {
    //         if (error.name === 'AbortError') {
    //             console.log('Request aborted:', error.message)
    //         } else {
    //             console.log(error) 
    //         }
    //     }
    // }

    // const handleAddCart = (id_product) => {
    //     setIsLoadingHandleCart(true)
    //     axiosAppJson.post(`/cart/add-product-to-cart?product_id=${id_product}`)
    //         .then(API => {
    //             if (!API.data.error) {
    //                 handleAddProductInCart(API.data.product_data)
    //                 setThisProduct(prev => {
    //                     return {
    //                         ...prev,
    //                         is_in_cart: 1
    //                     }
    //                 })
    //             } else {
    //                 if (API.data.code_status === 0) 
    //                     history('/signin')
    //             }
    //             setIsLoadingHandleCart(false)
    //         })
    //         .catch(err => console.log(err))
    // }
    
    // const handleRemoveCart = (id_product) => {
    //     setIsLoadingHandleCart(true)
    //     axiosAppJson.post(`/cart/remove-one-product-from-cart?product_id=${id_product}`)
    //         .then(API => {
    //             if (!API.data.error) {
    //                 handleRemoveOneProductFromCartGlobal(id_product)
    //                 setThisProduct(prev => {
    //                     return {
    //                         ...prev,
    //                         is_in_cart: 0
    //                     }
    //                 })
    //             } else {
    //                 if (API.data.code_status === 0) 
    //                     history('/signin')
    //             }
    //             setIsLoadingHandleCart(false)
    //         })
    //         .catch(err => console.log(err))
    // } 

    // const handleGotoCheckout = () => {
    //     let payload_checkout = {
    //         product_id_list: [thisProduct.id],
    //         voucher_code: ''
    //     }

    //     const payload_checkout_encrypt = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(payload_checkout), process.env.REACT_APP_CRYPT_PAYLOAD_CHECKOUT).toString())
    //     history(`/checkout?state=${payload_checkout_encrypt}`)

    // }

    return (
        <h1>Details</h1>
        // thisProduct
        // &&
        // <div className={cn('container')}>
        //     <div className={cn('details')}>
        //         <div className={cn('details_left')}>
        //             <div className={cn('details_left__frame')}>
        //                 <img src={thisProduct.thumbnail_url} alt="Product image"></img>
        //             </div>
        //             <div className={cn('details_left__button')}>
        //                 { 
        //                     isLoadingHandleCart
        //                     &&
        //                     <div className = {cn('button-add-cart')}>
        //                         <div style={{width: '35px', height: '35px'}}>
        //                             <CircleLoading />
        //                         </div>
        //                     </div>
        //                     ||
        //                     (
        //                         thisProduct.is_in_cart === 1
        //                         &&
        //                         <button className={cn('button-add-cart')}
        //                             onClick={() => handleRemoveCart(thisProduct.product_id)}
        //                         >Xoá khỏi giỏ hàng</button>
        //                         ||
        //                         <button 
        //                             className = {cn('button-add-cart')}
        //                             onClick={() => handleAddCart(thisProduct.product_id)}
        //                         >Thêm Vào Giỏ Hàng</button>
        //                     )
        //                 } 
        //                 <button className={cn('button-buy')}
        //                     onClick={() => handleGotoCheckout()} 
        //                 >Mua ngay</button>
        //             </div>
        //         </div>
        //         <div className={cn('details_right')}>
        //             <h1 className={cn('details_right__name')}>{thisProduct.full_name}</h1>
        //             <div className={cn('details_right__price')}>
        //                 <span>{Intl.NumberFormat('vi-VN', 'currency').format(Number(thisProduct.price_after_discount)) + 'đ'}</span>
        //                 <span>-</span>
        //                 <span>{Intl.NumberFormat('vi-VN', 'currency').format(Number(thisProduct.price)) + 'đ'}</span>
        //                 <span>{'-' + thisProduct.discount_percentage + '%'}</span>
        //             </div>
        //             <ul className={cn('details_right__list')}>
        //                 {
        //                     properties_product_detail.map((item, i) => {
        //                         if (thisProduct[`${item.props}`])
        //                             return <li key={i} className={cn('details_right__list___item')}>
        //                                     <span>{item.ui}</span>
        //                                     <span>{thisProduct[`${item.props}`]}</span>
        //                                 </li>
        //                         else
        //                             return ''
        //                     })
        //                 } 
        //             </ul>
        //         </div>
        //     </div>
        //     <div className={cn('desc-container')}> 
        //         <div className={cn('desc-container_content')}
        //             dangerouslySetInnerHTML={{ __html: thisProduct.posts }}
        //         ></div> 
        //     </div>

        //     <div className={cn('comment')}>
        //         <p className={cn('comment_title')}>Đánh giá sản phẩm</p>
        //         <div className={cn('comment_container')}>

        //             { 
        //                 <div className={cn('comment_container_left')}>
        //                     <div className={cn('left_overview')}>
        //                         <span>{thisCommentStatistical.average_star}</span>
        //                         <div className={cn('left_star')}>  
        //                             {
        //                                 thisCommentStatistical.average_star >= 0.1 && thisCommentStatistical.average_star <= 0.9
        //                                 &&
        //                                 <span className="material-icons-round">star_half</span>
        //                                 ||
        //                                 <span className="material-icons-round">{thisCommentStatistical.average_star>=1?'star':'star_outline'}</span>
        //                             } 
        //                             {
        //                                 thisCommentStatistical.average_star >= 1.1 && thisCommentStatistical.average_star <= 1.9
        //                                 &&
        //                                 <span className="material-icons-round">star_half</span>
        //                                 ||
        //                                 <span className="material-icons-round">{thisCommentStatistical.average_star>=2?'star':'star_outline'}</span>
        //                             } 
        //                             {
        //                                 thisCommentStatistical.average_star >= 2.1 && thisCommentStatistical.average_star <= 2.9
        //                                 &&
        //                                 <span className="material-icons-round">star_half</span>
        //                                 ||
        //                                 <span className="material-icons-round">{thisCommentStatistical.average_star>=3?'star':'star_outline'}</span>
        //                             } 
        //                             {
        //                                 thisCommentStatistical.average_star >= 3.1 && thisCommentStatistical.average_star <= 3.9
        //                                 &&
        //                                 <span className="material-icons-round">star_half</span>
        //                                 ||
        //                                 <span className="material-icons-round">{thisCommentStatistical.average_star>=4?'star':'star_outline'}</span>
        //                             } 
        //                             {
        //                                 thisCommentStatistical.average_star >= 4.1 && thisCommentStatistical.average_star <= 4.9
        //                                 &&
        //                                 <span className="material-icons-round">star_half</span>
        //                                 ||
        //                                 <span className="material-icons-round">{thisCommentStatistical.average_star>=5?'star':'star_outline'}</span>
        //                             }
        //                         </div>
        //                         <span>{thisCommentStatistical.total_num_star} đánh giá</span>
        //                     </div>
        //                     <div className={cn('left_details')}>
        //                         <div className={cn('left_details__progress')}>
        //                             <span>5</span>
        //                             <span className="material-icons-outlined">star</span>
        //                             <progress className={cn('progress-bar')} max="100" value={((thisCommentStatistical.total_num_star!=0) && ((thisCommentStatistical.five_star/thisCommentStatistical.total_num_star)*100).toFixed(0).toString()) || "0"}></progress>
        //                             <span className={cn('percen')}>{((thisCommentStatistical.total_num_star!=0) && ((thisCommentStatistical.five_star/thisCommentStatistical.total_num_star)*100).toFixed(0)) || '0'}%</span>
        //                         </div>
        //                         <div className={cn('left_details__progress')}>
        //                             <span>4</span>
        //                             <span className="material-icons-outlined">star</span>
        //                             <progress className={cn('progress-bar')} max="100" value={((thisCommentStatistical.total_num_star!=0) && ((thisCommentStatistical.four_star/thisCommentStatistical.total_num_star)*100).toFixed(0).toString()) || "0"}></progress>
        //                             <span className={cn('percen')}>{((thisCommentStatistical.total_num_star!=0) && ((thisCommentStatistical.four_star/thisCommentStatistical.total_num_star)*100).toFixed(0)) || '0'}%</span>
        //                         </div>
        //                         <div className={cn('left_details__progress')}>
        //                             <span>3</span>
        //                             <span className="material-icons-outlined">star</span>
        //                             <progress className={cn('progress-bar')} max="100" value={((thisCommentStatistical.total_num_star!=0) && ((thisCommentStatistical.three_star/thisCommentStatistical.total_num_star)*100).toFixed(0).toString()) || "0"}></progress>
        //                             <span className={cn('percen')}>{((thisCommentStatistical.total_num_star!=0) && ((thisCommentStatistical.three_star/thisCommentStatistical.total_num_star)*100).toFixed(0)) || '0'}%</span>
        //                         </div>
        //                         <div className={cn('left_details__progress')}>
        //                             <span>2</span>
        //                             <span className="material-icons-outlined">star</span>
        //                             <progress className={cn('progress-bar')} max="100" value={((thisCommentStatistical.total_num_star!=0) && ((thisCommentStatistical.two_star/thisCommentStatistical.total_num_star)*100).toFixed(0).toString()) || "0"}></progress>
        //                             <span className={cn('percen')}>{((thisCommentStatistical.total_num_star!=0) && ((thisCommentStatistical.two_star/thisCommentStatistical.total_num_star)*100).toFixed(0)) || '0'}%</span>
        //                         </div>
        //                         <div className={cn('left_details__progress')}>
        //                             <span>1</span>
        //                             <span className="material-icons-outlined">star</span>
        //                             <progress className={cn('progress-bar')} max="100" value={((thisCommentStatistical.total_num_star!=0) && ((thisCommentStatistical.one_star/thisCommentStatistical.total_num_star)*100).toFixed(0).toString()) || "0"}></progress>
        //                             <span className={cn('percen')}>{((thisCommentStatistical.total_num_star!=0) && ((thisCommentStatistical.one_star/thisCommentStatistical.total_num_star)*100).toFixed(0)) || '0'}%</span>
        //                         </div>
        //                     </div>
        //                 </div>
        //             }
                

        //             <div className={cn('comment_container_right')}>
        //                 <div className={cn('comment_container_right-content')}>
        //                     {
        //                         thisCommentsList.map((cmt, i) => {
        //                             return (
        //                                 <div className={cn('user-comment')} key={i}>
        //                                     <div className={cn('user-comment_inf')}>
        //                                         <div className={cn('user-comment_inf__frame')}>
        //                                             <img src={cmt.user_info.avatar_url}></img>
        //                                         </div>
        //                                         <div className={cn('user-comment_inf__right')}>
        //                                             <span className={cn('user-comment_inf__right___user-name')}>{cmt.user_info.firstname + ' ' + cmt.user_info.lastname}</span>
        //                                             <div className={cn('user-comment_inf__right___star')}>
        //                                                 <span className="material-icons-outlined">{cmt.star<1?'star_outline':'star'}</span>
        //                                                 <span className="material-icons-outlined">{cmt.star<2?'star_outline':'star'}</span>
        //                                                 <span className="material-icons-outlined">{cmt.star<3?'star_outline':'star'}</span>
        //                                                 <span className="material-icons-outlined">{cmt.star<4?'star_outline':'star'}</span>
        //                                                 <span className="material-icons-outlined">{cmt.star<5?'star_outline':'star'}</span>
        //                                             </div>
        //                                             <span className={cn('user-comment_inf__right___time')}>{format(new Date(cmt.created_at), 'HH:mm dd-MM-yyyy')}</span>
        //                                         </div>
        //                                     </div>
        //                                     <p className={cn('user-comment_comment')}>{cmt.comment}</p>  
        //                                 </div> 
        //                             )
        //                         }) 
        //                     }
        //                 </div>
        //                 {   

        //                     thisCommentsList.length === 0
        //                     &&
        //                     <p className={cn('no-comment')}>Chưa có đánh giá</p>
        //                     ||
        //                     (
        //                         thisCommentsPaginate.next_paginate !== 0
        //                         &&
        //                         <div onClick={() => handleGetComments()} className={cn('buton-show-more')}>Xem thêm...</div>
        //                         ||
        //                         (thisCommentsPaginate.current_paginate > 1 && thisCommentsPaginate.next_paginate === 0)
        //                         &&
        //                         <div className={cn('buton-show-more')}>Đã hiển thị tất cả đánh giá!</div>
        //                     ) 
        //                 }
        //             </div>
                    
        //         </div>
        //     </div>
        // </div>
        // ||
        // <div style={{width: '100%', margin: '350px auto', display: 'flex', justifyContent: 'center'}}>
        //     <Loading></Loading>
        // </div>
    );
} 