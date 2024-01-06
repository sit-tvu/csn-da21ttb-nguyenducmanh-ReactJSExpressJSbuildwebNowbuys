
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'

import classNames from 'classnames/bind'
import style from './Footer.module.scss'
import { faEnvelope, faLocationDot, faPhone, faVoicemail } from '@fortawesome/free-solid-svg-icons'

const cn = classNames.bind(style)

function Footer() {
    return (
        <footer className={cn('footer')}> 
            <div className={cn('footer-logo-area')}>
                <div className={cn('footer-logo')}> 
                    <div className={cn('footer-logo_frame')}>
                        <img src="https://manhducjr.com/nowbuys/global/logo-app/logo.png" alt=""></img>
                    </div>
                    <p>NowBuys</p>
                </div>   
            </div>

            <div className={cn('footer-main')}>  
                <div className={cn('footer-main_inf')}>
                    <div className={cn('footer-main_inf__phone')}>
                        <span className="material-icons">call</span>
                        <p>0968.686.868</p>
                    </div>
                    <div className={cn('footer-main_inf__email')}>
                        <span className="material-icons">email</span>
                        <p>support@nowbuys.com</p>
                    </div>
                    <div className={cn('footer-main_inf__address')}>
                        <span className="material-icons">place</span>
                        <p>Toà nhà 3D Building, Xuân Thuỷ, Dịch Vọng Hậu, Cầu Giấy, Hà Nội </p>
                    </div>
                </div>
                <div className={cn('footer-main_about-me')}>
                    <h1 className={cn('footer-main_about-me__title')}>Buyows</h1>
                    <div className={cn('footer-main_about-me_list')}>
                        <div><a href="">Cam kết</a></div>
                        <div><a href="">Chính sách và dịch vụ</a></div>
                        <div><a href="">Bảo hành - Sửa chửa</a></div>
                    </div>
                </div>
                <div className={cn('footer-main_support')}>
                    <h1 className={cn('footer-main_support__title')}>Hỗ trợ</h1>
                    <div className={cn('footer-main_support__list')}>
                        <div><a href="">Liên hệ</a></div>
                        <div><a href="">Bảo mật</a></div>
                        <div><a href="">Điều khoản</a></div>
                    </div>
                </div>
                <div className={cn('footer-main_inf-company')}>
                    <h1 className={cn('footer-main_inf-company__title')}>Công ty cổ phần thương mại Nowbuys</h1>
                    <div className={cn('footer-main_inf-company_list')}>
                        <p>Mã số thuế: 01257259821</p>
                        <p>Ngày thành lập: 04/11/2022</p>
                        <p>Lĩnh vực: Kinh doanh các sản phẩm công nghệ - dịch vụ công nghệ.</p>
                    </div>
                </div>
            </div>

            <div className={cn('footer-sub')}>
                <div className={cn('footer-sub_icon')}>
                    <a href=""><FontAwesomeIcon icon={faFacebook} className={cn('icon')}></FontAwesomeIcon></a>
                    <a href=""><FontAwesomeIcon icon={faLinkedin} className={cn('icon')}></FontAwesomeIcon></a>
                    <a href=""><FontAwesomeIcon icon={faGithub} className={cn('icon')}></FontAwesomeIcon></a>
                    <a href=""><FontAwesomeIcon icon={faYoutube} className={cn('icon')}></FontAwesomeIcon></a>
                </div>
                <p className={cn('footer-sub_title')}>@2022 NOWBUYS. Nơi quy tụ các sản phẩm công nghệ hàng đầu Việt Nam</p>
            </div>
        </footer>
    )
}

export default Footer