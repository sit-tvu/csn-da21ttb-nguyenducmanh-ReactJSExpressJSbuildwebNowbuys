
import { createContext, useEffect, useState } from "react" 
import {axiosAppJson} from "../configs/axios"

export const cartContext = createContext() 

export default function Cart({children}) {

    const [cartGlobal, setCartGlobal] = useState([])   

    useEffect(() => {
        axiosAppJson.post(`/cart/products-in-cart/get/all`)
            .then(API => {
                if (!API.data.error) {
                    setCartGlobal(API.data.product_in_cart)
                }
            })  
            .catch(err => console.log(err)) 
    }, [])

    const handleAddProductInCart = (product_data) => { 
        setCartGlobal(prev => { 
            return [product_data, ...prev];
        })
    } 

    const handleRemoveProductsFromCartGlobal = (id_list) => { 
        setCartGlobal(prev => { 
            return prev.filter(product => !id_list.includes(product.id));
        })
    } 

    return (
        <cartContext.Provider value={{cartGlobal, setCartGlobal, handleAddProductInCart, handleRemoveProductsFromCartGlobal}}>
            {children}
        </cartContext.Provider>
    )
}
