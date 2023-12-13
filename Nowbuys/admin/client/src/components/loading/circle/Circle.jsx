
import classNames from "classnames/bind"
import style from './Circle.module.scss'

const cn = classNames.bind(style)

export default function Circle() {
    return (
        <div className={cn("lds-dual-ring")}> 
            <div className={cn('circle')}>
            </div>
        </div> 
    );
} 