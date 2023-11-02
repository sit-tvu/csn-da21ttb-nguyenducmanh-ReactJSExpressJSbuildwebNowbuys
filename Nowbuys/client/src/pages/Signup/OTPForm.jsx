
import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom"

import Loading from '../../Components/Loading/Loading.jsx'
import CircleLoading from '../../Components/Loading/CircleLoading.jsx'

import expire from '../../assets/expire.png' 

import classNames from "classnames/bind";
import style from './OTPSignupAuthen.module.scss'


const cn = classNames.bind(style)

const initialCheckInput = {
    otp: 1
    // value: 0 is empty
    // value: 1 is valid
    // value: 2 is invalid
    // value: 3 is not match
    // value: 4 is not exists
}

const initialCheckStatustUserAwait = {
    user_await_authen: 1
    // value: 0 is not exists
    // value: 1 is exists
    // value: 2 is invalid
}
const timeOTP = 60;

function OTPForm(props) {

    const [isLoading, setIsLoading] = useState(false)
    const [loadingOTP, setLoadingOTP] = useState(false)
    const [isLoadingCheckInput, setIsLoadingCheckInput] = useState(false)

    const [countDownResendOTP, setCountDownResendOTP] = useState(timeOTP)
    const [checkInput, setCheckInput] = useState(initialCheckInput)
    const [checkExistsUserAwaitAuthen, setCheckExistsUserAwaitAuthen] = useState(initialCheckStatustUserAwait)
    const [OTP, setOTP] = useState('')

    useEffect(() => {
        countDown()
    }, []);

    function countDown() {
        const intervalId = setInterval(() => {
            
            setCountDownResendOTP((prev) => {
                if (prev == 0) {
                    clearInterval(intervalId);
                    return prev
                } else {
                    return prev - 1
                }
            });

        }, 1000)
    } 


    function handleVerification(e) {
        e.preventDefault()
        setIsLoadingCheckInput(prev => true)
        
        console.log(props.dataFormRegister);

        try {
            fetch('http://localhost:4000/authen/nowbuys/signup/verification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...props.dataFormRegister,
                    otp: OTP.toString()
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setIsLoadingCheckInput(prev => false)
                    if ( data.inputStatus.otp == 1 && data.userAwaitAuthenStatus.user_await_authen == 1) {
                        console.log('Verification is successful!')
                        setIsLoading(true) // Call loading animation
                        props.handleSignup() // Call Signup
                    } else {
                        setCheckInput(data.inputStatus)
                        setCheckExistsUserAwaitAuthen(data.userAwaitAuthenStatus)
                    }
                })
                .catch(error => console.error(error)); 
        } catch (error) {
            console.log(error)
        }
    }

    function handleReSendOTP() {
        
        setCheckInput(initialCheckInput)
        setCheckExistsUserAwaitAuthen(initialCheckStatustUserAwait)

        console.log('ResendOTP');

        try {
            fetch('http://localhost:4000/authen/nowbuys/signup/resend-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...props.dataFormRegister
            })
        })
            .then(response => response.json())
            .then(data => {
                setCheckExistsUserAwaitAuthen(data.userAwaitAuthenStatus)
                setCountDownResendOTP(timeOTP)
                countDown()
                setLoadingOTP(false)
            })
            .catch(error => console.error(error)); 
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={cn('area-authen')}>
            <div className={cn('authen-title')}>
                <div onClick={() => {window.location.reload()}} className={cn('button-back')}>
                    <span className={cn('material-icons-outlined')}>arrow_back</span>
                </div>
                <span>Xác thực tài khoản</span>
            </div>
            {
                !isLoading
                &&
                (
                    checkExistsUserAwaitAuthen.user_await_authen == 1
                    &&
                    (
                        <Fragment>
                            <div className={cn('notification')}>
                                <p>Mã xác thực gồm 4 chữ số đã được gửi đến email của bạn! Vui lòng kiểm tra hộp thư đến hoặc spam!</p>
                            </div>
                            
                            <form onSubmit={handleVerification} className={cn('form-authen')}>
                                <div className={cn('form-authen-content')}>
                                    <div className={cn('input-area')}>
                                        <div className={cn('input-item')}>
                                            {
                                                OTP != ''
                                                &&
                                                <label className={cn('field-name-input')}>Mã xác thực</label>
                                            }
                                            <input name="otp" placeholder="Mã xác thực"
                                                value = {OTP}
                                                onChange = {(e) => {
                                                    if (checkInput.otp != 1)
                                                        setCheckInput(prev => {
                                                            prev.otp = 1
                                                            return {
                                                                ...prev
                                                            }
                                                        })
                                                    setOTP(e.target.value)
                                                }}
                                            >
                                            </input>
                                            {
                                                checkInput.otp == 0
                                                &&
                                                <label className={cn('text-error-input')}>*Xin vui lòng điền mã xác thực</label>
                                                ||
                                                checkInput.otp == 2
                                                &&
                                                <label className={cn('text-error-input')}>*Mã xác thực không hợp lệ</label>
                                                ||
                                                checkInput.otp == 3
                                                &&
                                                <label className={cn('text-error-input')}>*Mã xác thực không khớp, nhập lại hoặc nhấn vào nút gửi lại mã</label>
                                                ||
                                                checkInput.otp == 4
                                                &&
                                                <label className={cn('text-error-input')}>*Mã xác thực đã hết hạn vui lòng nhấn vào nút gửi lại mã để tiếp tục</label>
                                            }
                                        </div>
                                        {
                                            countDownResendOTP != 0
                                            &&
                                            <button className={cn('button-resend', 'no-press')} type="button">Gửi lại OTP sau {countDownResendOTP}s</button>
                                            || 
                                            (
                                                !loadingOTP
                                                &&
                                                <button className={cn('button-resend')} type="button"
                                                    onClick = {() => {
                                                        setLoadingOTP(true)
                                                        handleReSendOTP()
                                                    }}
                                                >Gửi lại OTP</button>
                                                ||
                                                <div className={cn('button-resend-loading')}>
                                                    <CircleLoading></CircleLoading>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                {
                                    isLoadingCheckInput
                                    &&
                                    <div className={cn('button-authen-loading')}>
                                        <CircleLoading></CircleLoading> 
                                    </div>
                                    ||
                                    <button 
                                        className = {cn('button-authen')}
                                        type = "submit"
                                    >XÁC THỰC</button>
                                }
                            </form>
                        </Fragment>
                    )
                    ||
                    <div className={cn('warning')}>
                        <div className={cn('warning-frame')}>
                            <img src={expire} alt="warning!"></img>
                        </div>
                        <div className={cn('warning-content')}>
                            <h2>QUÁ THỜI GIAN XÁC THỰC</h2>
                            <p>Vì lý do bảo mật, thời gian xác thực quá lâu tài khoản đăng ký của bạn sẽ bị huỷ</p>
                            <p>Xin vui lòng đăng ký lại!</p>
                        </div>
                    </div>
                )
                ||
                <div style={{margin: 'auto'}}>
                    <Loading></Loading>
                </div>
            }
        </div>
    )
}

export default OTPForm