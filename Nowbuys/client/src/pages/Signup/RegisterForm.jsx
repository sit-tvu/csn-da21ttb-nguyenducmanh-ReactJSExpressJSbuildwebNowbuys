
import { Fragment, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../configs/firebase.js'

import {axiosAppJson} from '../../configs/axios.js'

import Loading from '../../Components/loading/Loading.jsx'
import CircleLoading from '../../Components/loading/CircleLoading.jsx'

import logoIMG from '../../assets/signup/logo.png';
import facebook from '../../assets/signup/Facebook.png';
import google from '../../assets/signup/Google.png';
import instagram from '../../assets/signup/Instagram.png';

import classNames from "classnames/bind";
import style from './RegisterForm.module.scss'


const cn = classNames.bind(style)

const initialCheckInput = {
    fname: 1,
    lname: 1,
    email: 1,
    username: 1,
    password: 1
    // value: 0 is empty
    // value: 1 is valid
    // value: 2 is exist
}

function RegisterForm(props) {

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const prev_page_url = searchParams.get('prev-page-url')
    const exit_goto_page_url = searchParams.get('exit-goto-page-url')

    const [isLoading, setIsLoading] = useState(false)  
    const [isLoadingCheckInput, setIsLoadingCheckInput] = useState(false)  

    const [checkInput, setCheckInput] = useState(initialCheckInput)  
    
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleRegister() {

        console.log('handleRegister');

        setIsLoading(true)

        fetch('http://localhost:4000/authen/nowbuys/signup/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: fname,
                lastname: lname,
                email: email,
                username: username,
                password: password
            })
        })
            .then(res => res.json())
            .then(dataAIP => { 
                if (!dataAIP.sendEmail) { // Nếu gửi OTP qua email lỗi thì reload lại
                    window.location.reload();
                } else {
                    props.sendDataForm(() => {
                        return {
                            _id: dataAIP.dataRegister._id,
                            fname: dataAIP.dataRegister.first_name,
                            lname: dataAIP.dataRegister.last_name,
                            email: dataAIP.dataRegister.email,
                            username: dataAIP.dataRegister.user_name,
                            password: dataAIP.dataRegister.password
                        }
                    })
                }
            })
            .catch(err => console.log(err))
    }

    function handleCheckInput(e) {
        e.preventDefault()
        setIsLoadingCheckInput(prev => true)

        console.log('handleCheckInput');

        try {
            fetch('http://localhost:4000/authen/nowbuys/signup/check-input/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: fname,
                lastname: lname,
                email: email,
                username: username,
                password: password
            })
        })
            .then(response => response.json())
            .then(dataAPI => {
                console.log(dataAPI);
                setIsLoadingCheckInput(prev => false)
                // The values of input is valid
                if ( dataAPI.checkInput.fname == 1 && dataAPI.checkInput.lname == 1 && dataAPI.checkInput.email == 1 && dataAPI.checkInput.username == 1 && dataAPI.checkInput.password == 1) {
                    
                    handleRegister()

                } else {
                    setCheckInput(dataAPI.checkInput)
                }
            })
            .catch(error => console.error(error)); 
        } catch (error) {
            console.log(error)
        }

    } 

    const handleSignupWithGoogle = async () => { 
        const provider = new GoogleAuthProvider();
        const res = await signInWithPopup(auth, provider);
        await axiosAppJson.post('/auth/log-in/google', {
            data: res.user
        })
            .then(API => {
                if (API.data.is_login) { 
                    if ( prev_page_url === null)
                        window.location.href = '/'
                    else 
                        window.location.href = prev_page_url + `?prev-page-url=${exit_goto_page_url}`
                } 
            })
            .catch(err => console.error(err))
    }

    return (
        <div className={cn('area-register-form')}>
            {
                !isLoading
                &&
                <Fragment>
                    <div className={cn('register-title')}>
                        <div onClick={() => {window.history.back()}} className={cn('button-back')}>
                            <span className={cn('material-icons-outlined')}>arrow_back</span>
                        </div>
                        <span>Đăng ký</span>
                    </div>
                    
                    <form onSubmit={handleCheckInput} className={cn('form-register')}>
                        <div className={cn('input-area-2')}>
                            <div className={cn('input-item-2')  +' '+ (checkInput.fname != 1?cn('input-warning'):'')}>
                                {
                                    fname != ''
                                    &&
                                    <label className={cn('field-name-input')}>Họ và tên đệm</label>
                                }
                                <input type="fname" placeholder="Họ và tên đệm" name="fnam" autoComplete="fname"
                                    value = {fname}
                                    onChange = {(e) => {
                                        if (checkInput.fname != 1)
                                            setCheckInput((prev) => {
                                                return {
                                                    ...prev, 
                                                    fname : 1
                                                }
                                            })
                                        setFname(e.target.value)
                                    }}
                                />
                                {
                                    checkInput.fname == 0
                                    &&
                                    <label className={cn('text-error-input')}>*Vui lòng điền họ</label>
                                }
                            </div>
                            <div className={cn('input-item-2')  +' '+ (checkInput.lname != 1?cn('input-warning'):'')}>
                                {
                                    lname != ''
                                    &&
                                    <label className={cn('field-name-input')}>Tên</label>
                                }
                                <input type="lname" placeholder="Tên" name="lname" autoComplete="lname"
                                    value = {lname}
                                    onChange = {(e) => { 
                                        if (checkInput.lname != 1)
                                            setCheckInput((prev) => {
                                                return {
                                                    ...prev, 
                                                    lname : 1
                                                }
                                            })
                                        setLname(e.target.value)
                                    }}
                                />
                                {
                                    checkInput.lname == 0
                                    &&
                                    <label className={cn('text-error-input')}>**Vui lòng điền tên</label>
                                }
                                
                            </div>
                        </div>
                        <div className={cn('input-area-1')}>
                            <div className={cn('input-item-1') +' '+ (checkInput.email != 1?cn('input-warning'):'')}>
                                {
                                    email != ''
                                    &&
                                    <label className={cn('field-name-input')}>Email</label>
                                }
                                <input type="email" placeholder="Email" name="email" autoComplete="email"
                                    value = {email}
                                    onChange = {(e) => { 
                                        if (checkInput.email != 1)
                                            setCheckInput((prev) => {
                                                return {
                                                    ...prev, 
                                                    email : 1
                                                }
                                            })
                                        setEmail(e.target.value)
                                    }}
                                />
                                {
                                    checkInput.email == 0
                                    &&
                                    <label className={cn('text-error-input')}>***Vui lòng điền email</label>
                                    ||
                                    checkInput.email == 2
                                    &&
                                    <label className={cn('text-error-input')}>***Email đã tồn tại</label>
                                }
                                
                            </div>
                            <div className={cn('input-item-1') +' '+ (checkInput.username != 1?cn('input-warning'):'')}>
                                {
                                    username != ''
                                    &&
                                    <label className={cn('field-name-input')}>Tên đăng nhập</label>
                                }
                                <input type="text" placeholder="Tên đăng nhập" name="username" autoComplete="username"
                                    value = {username}
                                    onChange = {(e) => { 
                                        if (checkInput.username != 1)
                                            setCheckInput((prev) => {
                                                return {
                                                    ...prev,
                                                    username : 1
                                                }
                                            })
                                        setUsername(e.target.value)
                                    }}
                                />
                                {
                                    checkInput.username == 0
                                    &&
                                    <label className={cn('text-error-input')}>****Vui lòng điền tên đăng nhập</label>
                                    ||
                                    checkInput.username == 2
                                    &&
                                    <label className={cn('text-error-input')}>****Tên đăng nhập đã tồn tại</label>
                                    ||
                                    checkInput.username == 3
                                    &&
                                    <label className={cn('text-error-input')}>****Tên đăng nhập không được chứa khoảng trắng</label>
                                    ||
                                    checkInput.username == 4
                                    &&
                                    <label className={cn('text-error-input')}>****Tên đăng nhập phải là chữ la tinh không dấu</label>
                                }
                                
                            </div>
                            <div className={cn('input-item-1') +' '+ (checkInput.password != 1?cn('input-warning'):'')}>
                                {
                                    password != ''
                                    &&
                                    <label className={cn('field-name-input')}>Mật khẩu đăng nhập</label>
                                }
                                <input type="password" placeholder="Mật khẩu đăng nhập" name="password" autoComplete="password"
                                    value = {password}
                                    onChange = {(e) => { 
                                        if (checkInput.password != 1)
                                            setCheckInput((prev) => {
                                                return {
                                                    ...prev, 
                                                    password : 1
                                                }
                                            })
                                        setPassword(e.target.value)
                                    }}
                                />
                                {
                                    checkInput.password == 0
                                    &&
                                    <label className={cn('text-error-input')}>****Vui lòng không để trống mật khẩu</label>
                                    ||
                                    checkInput.password == 3
                                    &&
                                    <label className={cn('text-error-input')}>****Vui lòng chọn mật khẩu không chứa khoảng trắng</label>
                                }
                                
                            </div>
                        </div> 
                        {
                            isLoadingCheckInput
                            &&
                            <div className={cn('button-signup-loading')}>
                                <CircleLoading></CircleLoading> 
                            </div>
                            ||
                            <button 
                                className = {cn('button-signup')}
                                type = "submit"
                            >ĐĂNG KÝ</button>
                        }
                    </form>

                    <div className={cn('rule-register')}>
                        <span>Khi nhấn đăng ký bạn đã đồng ý với các điều khoản của chúng tôi!<a href="/">Điểu khoản</a></span>
                    </div>
                    <div className={cn('division-line')}><span>HOẶC</span></div>
                    <div className={cn('another-login-way')}>
                        <div onClick={() => handleSignupWithGoogle()} className={cn('another-login-way_item')}>
                            <img src={google} alt="" /><span>Google</span>
                        </div>
                        <div className={cn('another-login-way_item')}>
                            <img src={facebook} alt="" /><span>Facebook</span>
                        </div>
                        <div className={cn('another-login-way_item')}>
                            <img src={instagram} alt="" /><span>Instagram</span>
                        </div>
                    </div>
                    <div className={cn('switch-state')}>
                        <span>Bạn chưa có tài khoản?</span><Link className={cn('button-register')} to="/signin">Đăng nhập</Link>
                    </div>
                </Fragment>
                ||
                <div style={{margin: 'auto'}}>
                    <Loading></Loading>
                </div>
            }
        </div>
    )
}

export default RegisterForm