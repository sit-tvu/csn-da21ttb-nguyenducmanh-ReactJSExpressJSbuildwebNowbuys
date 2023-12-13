

import { Link } from 'react-router-dom';
import styles from './SideBar.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

export default function SideBar() {
    return (
        <div className={cn('container-side-bar')}>
            <div className={cn('trademark')}>
                <div className={cn('trademark-frame')}>
                    <img src={`${process.env.REACT_APP_DOMAIN_SERVER_STATIC}/static/global/logo-app/logo.png`} alt=""></img>
                </div>
                <h1>Nowbuys</h1>
            </div>
            <div className={cn('navigate')}>
                <Link to="/" className={cn('nav-item', 'active')}>
                    <div className={cn('icon-frame')}>
                        <ion-icon name="home-outline"></ion-icon>
                    </div>
                    <span className={cn('title')}>Trang chủ</span>
                </Link>
                <Link to='/product' className={cn('nav-item')}>
                    <div className={cn('icon-frame')}>
                        <ion-icon name="file-tray-stacked-outline"></ion-icon>
                    </div>
                    <span className={cn('title')}>Sản phẩm</span>
                </Link>
                <Link to='order' className={cn('nav-item')}>
                    <div className={cn('icon-frame')}>
                        <ion-icon name="cash-outline"></ion-icon>
                    </div>
                    <span className={cn('title')}>Đơn hàng</span>
                </Link>
            </div>
        </div>
    );
}