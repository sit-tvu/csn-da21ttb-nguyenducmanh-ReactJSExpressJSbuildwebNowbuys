
import { Fragment, useState } from "react";
import { Link } from "react-router-dom"

import RegisterForm from "./RegisterForm";
import OTPForm from "./OTPForm";

import logoIMG from '../../assets/signup/logo.png';

import classNames from "classnames/bind";
import style from './Signup.module.scss'

const cn = classNames.bind(style)


function Signup() {

    const [dataFormRegister, setDataFormRegister] = useState(null)

    function handleSignup() {
        try {
            fetch('http://localhost:4000/authen/nowbuys/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname: dataFormRegister.fname,
                    lastname: dataFormRegister.lname,
                    email: dataFormRegister.email,
                    username: dataFormRegister.username,
                    password: dataFormRegister.password
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    window.location.href = '/signin'
                })
                .catch(error => console.error(error)); 

        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <Fragment>
            <div className={cn('container')}>
                <div className={cn('content')}>
                    <div className={cn('area-content')}>
                        <div className={cn('left')}>
                            <img src={logoIMG} alt="logo" />
                            <div className={cn('left-content')}>
                                <p>Nơi quy tụ các sản phẩm</p>
                                <p>công nghệ hàng đầu Việt Nam</p>
                            </div>
                        </div>
                        <div className={cn('right')}>
                            {
                                !dataFormRegister
                                &&
                                <RegisterForm
                                    sendDataForm = {setDataFormRegister}
                                ></RegisterForm>
                                ||
                                <OTPForm
                                    dataFormRegister = {dataFormRegister}
                                    handleSignup = {handleSignup}
                                ></OTPForm>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Signup