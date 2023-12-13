
import { useState } from 'react'; 
 

import style from './AddEmail.module.scss'
import classNames from 'classnames/bind'
const cn = classNames.bind(style)

export default function AddEmail({props}) {

    const [newEmail, setNewEmail] = useState('');

    const [newEmailStatusError, setNewEmailStatusError] = useState(1); // 0 empty, 1 valid, 2 invalid
 

    const handleCheckNewEmail = () => { 

        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (newEmail.trim() !== '') {
            if (newEmail.match(validRegex) && newEmail.match(/\.[a-zA-Z0-9-]+$/)) { 
                setNewEmailStatusError(1);
                handleSaveNewEmailToLocal(); 
            } else { 
                setNewEmailStatusError(2);
            }
        } else { 
            setNewEmailStatusError(0);
        }

    } 

    const handleSaveNewEmailToLocal = () => {
        console.log('handle save new email to local');
        props.setNewEmail(newEmail.trim());
    }


    return (
        <div className={cn('popup-container')}>
            <div className={cn('header', 'no-border-bottom')}> 
                <h2>Nhập địa chỉ email mới</h2>
            </div> 

            <div className={cn('container')}> 
                <span>Địa chỉ email trước:</span>
                <span>{props.userInf.email}</span>
                <div className={cn('verification')}>
                    <div className={cn('input-area', {'input-warning': newEmailStatusError !== 1})}>
                        {
                            newEmail != ''
                            &&
                            <label className={cn('field-name-input')}>Địa chỉ email mới</label>
                        }
                        <input
                            name="username"
                            autoComplete="on" 
                            type='text'
                            placeholder="Địa chỉ email mới"
                            value={newEmail}
                            onChange={(e) => setNewEmail(() => { return e.target.value })}
                            onKeyDown={(e) => (e.key === 'Enter')?handleCheckNewEmail():null}
                        />
                        {
                            newEmailStatusError === 0
                            &&
                            <span className={cn('text-error-input')}>*Bạn chưa nhập địa chỉ email mới!</span>
                            ||
                            newEmailStatusError === 2
                            &&
                            <span className={cn('text-error-input')}>*Địa chỉ email mới không hợp lệ</span> 
                        } 
                    </div>
                </div> 
            </div>

            <div className={cn('button-bar', 'no-boder-top', 'btn-center')}>
                <button type='button' className={cn('btn-save', 'with-50', {'no-press': false})}
                    onClick={() => handleCheckNewEmail()}
                >Thay đổi</button>
            </div>
        </div>
    )
}