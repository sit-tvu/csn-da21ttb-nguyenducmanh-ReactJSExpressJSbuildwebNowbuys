
import { Fragment, useEffect, useRef, useState } from 'react';
import { Loading } from '../../../../../Components/index.js';
import {axiosAppJson} from '../../../../../configs/axios.js';
import { useNavigate } from 'react-router-dom';

import style from './VerifyOTPEmail.module.scss'
import classNames from 'classnames/bind'
const cn = classNames.bind(style)

export default function VerifyOTPEmail({props}) {

    const navigate = useNavigate();

    const init_countdown = 60;

    const [hasSentEmail, setHasSentEmail] = useState(false)
    const [isCheckingOTP, setIsCheckingOTP] = useState(false)
    const [OTPIsMatch, setOTPIsMatch] = useState(true)

    const [countdownResendOTP, setCountdownResendOTP] = useState(0)

    const inputRef = [useRef(null), useRef(null), useRef(null), useRef(null)]
    const [OTP, setOTP] = useState(['', '', '', '']) 
    const [indexInputFocus, setIndexInputFocus] = useState(0)

    useEffect(() => {
        sendOTPVerifyEmail();
    }, []) 

    const sendOTPVerifyEmail = () => {
        setHasSentEmail(false)
        axiosAppJson.post('/verification/send/otp-verify-email')
            .then(API => {
                if (API.data.success) {
                    setHasSentEmail(true)
                    setCountdownResendOTP(init_countdown)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        if (countdownResendOTP == init_countdown)
            countDown()
    }, [countdownResendOTP]);

    const countDown = () => {
        const intervalId = setInterval(() => {
            setCountdownResendOTP((prev) => {
                if (prev == 0) {
                    setHasSentEmail(true);
                    clearInterval(intervalId);
                    return prev
                } else {
                    return prev - 1
                }
            });
        }, 1000)
    } 

    useEffect(() => {
        setTimeout(() => {
            if (inputRef[indexInputFocus].current)
                inputRef[indexInputFocus].current.focus()
        }, [30])
    }, [indexInputFocus, OTPIsMatch]);

    const handleChangeOTP = (e, index) => {
        if (parseInt(e.key) >= 0 || parseInt(e.key) <= 9) {
            setOTP(prev => {
                if (prev[index] === '')
                    prev[index] = e.key
                return [...prev]
            })
            setIndexInputFocus(index+1<=3?index+1:index)
        }
    }

    const handleEventKeyDown = (e, index) => {
        switch (e.key) {
            case 'Backspace': 
                    setOTP(prev => {
                        prev[index] = ''
                        return [...prev]
                    }) 
                    if (OTP[index+1] == undefined || OTP[index+1] == '')
                        setIndexInputFocus(index-1>=0?index-1:index)
                break;
            case 'ArrowLeft':  
                    setIndexInputFocus(index-1>=0?index-1:index)
                break;
            case 'ArrowRight':  
                    if (OTP[index] != '' || OTP[index+1] != '')
                        setIndexInputFocus(index+1<=3?index+1:index)
                break;
            case 'Enter':  
                    if (!OTP.includes('')) {
                        handleSubmit()
                    } else {
                        setIndexInputFocus(OTP.indexOf(''))
                    }
                break;
            default:
                handleChangeOTP(e, index)
        } 
    } 

    const checkOTPBeforeSubmit = () => {
        if (!OTP.includes('') && hasSentEmail) {
            handleSubmit()
        } else {
            setIndexInputFocus(OTP.indexOf(''))
        }
    }

    const handleSubmit = () => {
        setIsCheckingOTP(true)
        axiosAppJson.post('verification/receive/otp-verify-email', {
            otp: OTP.join(''),
            type: 'verify-email'
        })
            .then(API => {
                if (!API.data.success) {
                    setOTPIsMatch(false);
                } else {
                    setOTPIsMatch(true);
                    props.setVerifyOTPIsSuccess(true);
                }
                setIsCheckingOTP(false)
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    navigate('/signin')
                }
            });
    }


    return (
        <div className={cn('popup-container')}>
            {
                !isCheckingOTP
                && 
                <Fragment>
                    <div className={cn('header', 'no-border-bottom')}>
                        <span className={`material-icons-round ${cn('icon', {'not-allow': !(hasSentEmail && countdownResendOTP == 0)})}`}
                            onClick={() => (hasSentEmail && countdownResendOTP == 0)?props.setShowChangeEmailPopup(false):null}
                        >arrow_back</span>
                        <h2>Nhập mã xác minh</h2>
                    </div> 

                    <div className={cn('container')}>
                        {
                            hasSentEmail
                            &&
                            <span>Mã xác minh đã được gửi đến email:</span>
                            ||
                            <span>Đang gửi mã xác minh đến email:</span>
                        }
                        <span>{props.email}</span>
                        <div className={cn('verification')}>
                            <div className={cn('input-cluster', {'active': indexInputFocus === 0})}>
                                <input ref={inputRef[0]} type='tel' maxLength='1' disabled={indexInputFocus < 0}
                                    value={OTP[0]} 
                                    onKeyDown={(e) => {
                                        handleEventKeyDown(e, 0)  
                                    }}
                                    onChange={()=>{}}
                                ></input>
                            </div> 
                            <div className={cn('input-cluster', {'active': indexInputFocus === 1})}>
                                <input ref={inputRef[1]} type='tel' maxLength='1' disabled={indexInputFocus < 1}
                                    value={OTP[1]}
                                    onKeyDown={(e) => {
                                        handleEventKeyDown(e, 1)  
                                    }}
                                    onChange={()=>{}}
                                ></input>
                            </div> 
                            <div className={cn('input-cluster', {'active': indexInputFocus === 2})}>
                                <input ref={inputRef[2]} type='tel' maxLength='1' disabled={indexInputFocus < 2}
                                    value={OTP[2]}
                                    onKeyDown={(e) => {
                                        handleEventKeyDown(e, 2)  
                                    }}
                                    onChange={()=>{}}
                                ></input>
                            </div> 
                            <div className={cn('input-cluster', {'active': indexInputFocus === 3})}>
                                <input ref={inputRef[3]} type='tel' maxLength='1' disabled={indexInputFocus < 3}
                                    value={OTP[3]}
                                    onKeyDown={(e) => {
                                        handleEventKeyDown(e, 3)  
                                    }}
                                    onChange={()=>{}}
                                ></input>
                            </div>
                            {
                                !OTPIsMatch
                                &&
                                <p className={cn('error-status')}>Mã xác thực không khớp</p>
                            }
                        </div>
                        {
                            countdownResendOTP !== 0
                            &&
                            <p>Vui lòng chờ {countdownResendOTP} giây để gửi lại mã!</p>
                            ||
                            (
                                hasSentEmail
                                &&
                                <p>Bạn chưa nhận được? <span onClick={() => {sendOTPVerifyEmail();}} style={{color: 'blue'}}>Gửi lại</span></p>
                                ||
                                <p>Bạn chưa nhận được? <span style={{color: 'blue', opacity: 0.5, cursor: 'not-allowed'}}>Gửi lại</span></p>
                            )
                        }
                    </div>

                    <div className={cn('button-bar', 'no-boder-top', 'btn-center')}>
                        <button type='button' className={cn('btn-save', 'with-50', {'no-press': !hasSentEmail})}
                            onClick={() => checkOTPBeforeSubmit()}
                        >Kế tiếp</button>
                    </div>
                </Fragment>
                ||
                <div className={cn('loading-popup-container')}>
                    <Loading></Loading>
                </div>
            }
        </div>
    )
}