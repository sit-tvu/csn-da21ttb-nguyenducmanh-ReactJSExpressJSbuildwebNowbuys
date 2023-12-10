
import { Fragment, useState, useEffect, useRef, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom' 

import { CircleLoading, Loading } from '../../Components/index.js'

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../configs/firebase.js'

import { AuthenAPI } from '../../apis/index.js';

import logoIMG from '../../assets/signin/logo.png';
import facebook from '../../assets/signin/Facebook.png';
import google from '../../assets/signin/Google.png';
import instagram from '../../assets/signin/Instagram.png';

import classNames from 'classnames/bind'
import style from './Signin.module.scss'
const cn = classNames.bind(style) 

function Signin() {

    const history = useNavigate()

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const prev_page_url = searchParams.get('prev-page-url')
    const exit_goto_page_url = searchParams.get('exit-goto-page-url')

    const [isLoadingFullScreen, setIsLoadingFullScreen] = useState(false)
    const [isLoadingBtnSignIn, setIsLoadingBtnSignIn] = useState(false)
    
    const inputUsernameRef = useRef(null)
    const inputPasswordRef = useRef(null)
    const [signinForm, setSigninForm] = useState({username: '', password: ''})
    const [checkSigninForm, setCheckSigninForm] = useState({username: -1, password: -1})
    // 0: empty
    // 1: valid
    // 2: containing Vietnamese accents
    // 3: containing spaces character
    // 4: username or password incorrect

    useEffect(() => { 
        handleCheckIsSignin();
        // connectMicrosoft()
    }, []) 

    useEffect(() => {
        if (checkSigninForm.password !== -1) 
            inputPasswordRef.current.focus()
        if (checkSigninForm.username !== 1) 
            inputUsernameRef.current.focus()
        if (checkSigninForm.username === 1 && checkSigninForm.password === 1)
            handleSignin()
    }, [checkSigninForm])

    const handleCheckIsSignin = async () => {
        setIsLoadingFullScreen(true);
        const res = await AuthenAPI.getProfile();
        if (res.data.is_login) { // is sign in
            window.location.href = '/'
        } else {
            setIsLoadingFullScreen(false);
        } 
    }

    const handleCheckInputSigninForm = () => {  

        const regex = /[^\x00-\x7F]/
        let resultCheckInput = {
            username: -1,
            password: -1
        }

        if (signinForm.username === '') {
            resultCheckInput.username = 0
        } else {
            if (regex.test(signinForm.username)) {
                resultCheckInput.username = 2
            } else {
                if (signinForm.username.includes(' ')) {
                    resultCheckInput.username = 3
                } else {
                    resultCheckInput.username = 1
                }
            } 
        }

        if (signinForm.password === '') {
            resultCheckInput.password = 0
        } else {
            if (regex.test(signinForm.password)) {
                resultCheckInput.password = 2
            } else {
                if (signinForm.password.includes(' ')) {
                    resultCheckInput.password = 3
                } else {
                    resultCheckInput.password = 1
                }
            } 
        } 

        setCheckSigninForm(resultCheckInput)
    }

    const handleSignin = async () => { 
        setIsLoadingBtnSignIn(true);

        const res = await AuthenAPI.signinLocal(signinForm.username, signinForm.password);

        setIsLoadingBtnSignIn(false);
        if (res.data.is_login) { 
            if ( prev_page_url === null)
                window.location.href = '/';
            else 
                window.location.href = prev_page_url + `?prev-page-url=${exit_goto_page_url}`;
        } else {
            setCheckSigninForm(res.data.err_code_login);
        } 
    }

    const handleSigninWithGoogle = async () => { 
        const provider = new GoogleAuthProvider();
        const resGoogle = await signInWithPopup(auth, provider);  

        const res = await AuthenAPI.signinGoogle(resGoogle.user);

        if (res.data.is_login) { 
            if ( prev_page_url === null)
                window.location.href = '/'
            else 
                window.location.href = prev_page_url + `?prev-page-url=${exit_goto_page_url}`
        } 
    }

    return (
        isLoadingFullScreen
        &&
        <Loading></Loading>
        ||
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
                            <div className={cn('area-signin')}> 
                                <div className={cn('signin-title')}>
                                    <div className={cn('button-back')} 
                                        onClick={() => {history('/')}} 
                                    >
                                        <span className='material-icons-outlined'>arrow_back</span>
                                    </div>
                                    <span>Đăng nhập</span>
                                </div>
                                <form>
                                    <div className={cn('input-area', {'input-warning': checkSigninForm.username!=1 && checkSigninForm.username!=-1})}>
                                        {
                                            checkSigninForm.username != ''
                                            &&
                                            <label className={cn('field-name-input')}>Tên đăng nhập</label>
                                        }
                                        <input
                                            name="username"
                                            autoComplete="on"
                                            ref={inputUsernameRef}
                                            type='text'
                                            placeholder="Tên đăng nhập"
                                            value={signinForm.username}
                                            onChange={(e) => setSigninForm(prev => {
                                                prev.username = e.target.value.trim()
                                                return {...prev}
                                            })}
                                            onKeyDown={(e) => (e.key === 'Enter')?handleCheckInputSigninForm():null}
                                        />
                                        {
                                            checkSigninForm.username === 0
                                            &&
                                            <span className={cn('text-error-input')}>*Bạn chưa nhập tên đăng nhập!</span>
                                            ||
                                            checkSigninForm.username === 2
                                            &&
                                            <span className={cn('text-error-input')}>*Tên đăng nhập không được chứa ký tự tiếng Việt</span>
                                            ||
                                            checkSigninForm.username === 3
                                            &&
                                            <span className={cn('text-error-input')}>*Tên đăng nhập không được chứa khoảng trắng</span>
                                            ||
                                            checkSigninForm.username === 4
                                            &&
                                            <span className={cn('text-error-input')}>*Tên đăng nhập không đúng</span>
                                        } 
                                    </div>

                                    <div className={cn('input-area', {'input-warning': (checkSigninForm.password!=1 && checkSigninForm.username == 1 || checkSigninForm.password==0 && checkSigninForm.username == 0)})}>
                                        {
                                            checkSigninForm.password != ''
                                            &&
                                            <label className={cn('field-name-input')}>Mật khẩu</label>
                                        }
                                        <input 
                                            name="password"
                                            autoComplete="on"
                                            ref={inputPasswordRef}
                                            // type={isVisibility?'text':'password'}
                                            type='password'
                                            placeholder="Mật khẩu đăng nhập"
                                            value={signinForm.password}
                                            onChange={(e) => setSigninForm(prev => {
                                                prev.password = e.target.value.trim()
                                                return {...prev}
                                            })}
                                            onKeyDown={(e) => (e.key === 'Enter')?handleCheckInputSigninForm():null}
                                        />
                                        {
                                            checkSigninForm.password === 0
                                            &&
                                            <span className={cn('text-error-input')}>**Bạn chưa nhập mật khẩu!</span>
                                            ||
                                            checkSigninForm.password === 2
                                            &&
                                            <span className={cn('text-error-input')}>**Mật khẩu không được chứa ký tự tiếng Việt</span>
                                            ||
                                            checkSigninForm.password === 3
                                            &&
                                            <span className={cn('text-error-input')}>**Mật khẩu không được chứa khoảng trắng</span>
                                            ||
                                            checkSigninForm.password === 4 && checkSigninForm.username === 1
                                            &&
                                            <span className={cn('text-error-input')}>**Mật khẩu không đúng</span>
                                        } 
                                    </div>
                                    {
                                        isLoadingBtnSignIn
                                        &&
                                        <div className={cn('button-login-loading')}>
                                            <CircleLoading></CircleLoading> 
                                        </div>
                                        ||
                                        <button 
                                            className = {cn('button-login')}
                                            type = "button"
                                            onClick={() => handleCheckInputSigninForm()}
                                        >ĐĂNG NHẬP</button>
                                    }
                                </form>
                                <div className={cn('support-login')}>
                                    <Link className={cn('support_item')} to="/">Quên mật khẩu?</Link>
                                    <Link className={cn('support_item')} to="/">abc xyz</Link>
                                </div>
                                <div className={cn('division-line')}><span>HOẶC</span></div>
                                <div className={cn('another-login-way')}>
                                    <div  onClick = {() => handleSigninWithGoogle()} className={cn('another-login-way_item')}>
                                        <img src={google} alt="" />
                                        <span>Google</span>
                                    </div>
                                    <div className={cn('another-login-way_item')}>
                                        <img src={facebook} alt="" />
                                        <span>Facebook</span>
                                    </div>
                                    <div className={cn('another-login-way_item')}>
                                        <img src={instagram} alt="" />
                                        <span>Instagram</span>
                                    </div>
                                </div>
                                <div className={cn('switch-state')}> 
                                    <span>Bạn chưa có tài khoản?</span><Link className={cn('button-signup')} to={`/signup?prev-page-url=${prev_page_url}&exit-goto-page-url=${exit_goto_page_url}`}>Đăng ký</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Signin

