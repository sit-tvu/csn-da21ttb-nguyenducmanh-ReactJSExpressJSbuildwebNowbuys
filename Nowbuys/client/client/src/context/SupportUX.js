
import { createContext, useState } from "react" 

import CryptoJS from "crypto-js"

export const supportUXContext = createContext() 

const init_ux_data = [
    { catelogy_id: 1, brand_id: 0, sort_by_id: 'random' },
    { catelogy_id: 2, brand_id: 0, sort_by_id: 'random' },
    { catelogy_id: 3, brand_id: 0, sort_by_id: 'random' },
    { catelogy_id: 4, brand_id: 0, sort_by_id: 'random' },
    { catelogy_id: 5, brand_id: 0, sort_by_id: 'random' },
    { catelogy_id: 6, brand_id: 0, sort_by_id: 'random' },
    { catelogy_id: 7, brand_id: 0, sort_by_id: 'random' }
]

export default function SupportUX({children}) { 

    if (!localStorage.getItem('ux_support')) {
        localStorage.setItem('ux_support', CryptoJS.AES.encrypt(JSON.stringify(init_ux_data), process.env.REACT_APP_CRYPT_UX_SUPPORT).toString())
    } else { 
        // console.log(JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('ux_support'), process.env.REACT_APP_CRYPT_UX_SUPPORT).toString(CryptoJS.enc.Utf8)));
    }

    return (
        <supportUXContext.Provider value={{}}>
            {children}
        </supportUXContext.Provider>
    )
}
