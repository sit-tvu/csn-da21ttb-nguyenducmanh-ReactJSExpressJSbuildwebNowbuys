
import classNames from 'classnames/bind'
import style from './Nowbuys.module.scss'

const cn = classNames.bind(style)

export default function Nowbuys({props}) {

    let color = (props && props.color)?props.color:'#ccc';
    
    return (
        <div className={cn('loading-container')}>
            <h1 style={{color: `${color}`}}>Nowbuys</h1>
            <div className={cn('dot-loader')}>
                <span style={{backgroundColor: `${color}`}}></span>
                <span style={{backgroundColor: `${color}`}}></span>
                <span style={{backgroundColor: `${color}`}}></span>
                <span style={{backgroundColor: `${color}`}}></span>
            </div>
        </div>
    );
} 