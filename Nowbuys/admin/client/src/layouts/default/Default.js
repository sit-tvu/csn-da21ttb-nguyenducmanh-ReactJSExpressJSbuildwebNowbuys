import { SideBar } from "../../components";

import styles from './Default.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

export default function Default({children}) {
    return (
        <div className={cn('container-default')}>
            <div className={cn('side-bar')}>
                <SideBar></SideBar>
            </div>
            <div className={cn('body')}>
                {children}
            </div>
        </div>
    );
}