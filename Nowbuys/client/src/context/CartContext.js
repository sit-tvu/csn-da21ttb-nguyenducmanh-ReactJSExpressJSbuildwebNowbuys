
import { createContext, useEffect, useState } from "react" 
import myAxios from "../api/axios"

export const cartContext = createContext() 

export default function Cart({children}) {

    const [cartGlobal, setCartGlobal] = useState([])   

    useEffect(() => {
        myAxios.post(`/cart/products-in-cart/get/all`)
            .then(API => {
                if (!API.data.error) {
                    setCartGlobal(API.data.product_in_cart)
                }
            })  
            .catch(err => console.log(err)) 
    }, [])

    const handleAddProductInCart = (product_data) => { 
        console.log('handle add cart global');
        setCartGlobal(prev => { 
            let new_cart = [product_data, ...prev]
            return new_cart
        })
    }

    const handleRemoveOneProductFromCartGlobal = (id_product) => { 
        console.log('handle remove cart global');
        setCartGlobal(prev => { 
            let new_cart = prev.filter(product => product.id !== id_product) 
            return new_cart
        })
    }

    const handleRemoveManyProductsFromCartGlobal = (id_list) => { 
        console.log('handle remove many cart global');
        setCartGlobal(prev => { 
            let new_cart = prev.filter(product => !id_list.includes(product.id)) 
            return new_cart
        })
    } 

    return (
        <cartContext.Provider value={{cartGlobal, setCartGlobal, handleAddProductInCart, handleRemoveOneProductFromCartGlobal, handleRemoveManyProductsFromCartGlobal}}>
            {children}
        </cartContext.Provider>
    )
}
