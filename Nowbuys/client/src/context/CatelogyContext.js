
import { createContext, useEffect, useState } from "react"

import myaxios from "../api/axios.js"

export const catelogyContext = createContext() 

export default function Catelogy({children}) {

    const [catelogyListGlobal, setCatelogyListGlobal] = useState([]) 

    useEffect(() => {
        handleGetCatelogyList()
    }, [])
    
    const handleGetCatelogyList = () => {
        myaxios.get(`/general/catelogy/get`)
            .then(API => { 
                setCatelogyListGlobal(API.data)
            })
            .catch(err => console.log(err))
    } 

    return (
        <catelogyContext.Provider value={catelogyListGlobal}>
            {children}
        </catelogyContext.Provider>
    )
}
