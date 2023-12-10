
import { createContext, useEffect, useState } from "react"

import {axiosAppJson} from "../configs/axios.js"

export const userContext = createContext() 

export default function User({children}) {

    const [userInfoGlobal, setUserInfoGlobal] = useState(null) // infomation of user sigined

    useEffect(() => {
        handleCheckIsSignin()
    }, [])
    
    const handleCheckIsSignin = () => {
        axiosAppJson.post(`/auth/profile/get`)        
            .then(API => { 
                if (API.data.is_login) {
                    setUserInfoGlobal(API.data.user_info)
                }
            })
            .catch(error => console.log(error))
    }  

    return (
        <userContext.Provider value={{userInfoGlobal, setUserInfoGlobal}}>
            {children}
        </userContext.Provider>
    )
}
