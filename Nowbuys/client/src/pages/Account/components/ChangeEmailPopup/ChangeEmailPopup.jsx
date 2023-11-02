 
import { useEffect, useState } from 'react';

import VerifyOTPEmail from './VerifyOTPEmail/VerifyOTPEmail.jsx';
import AddEmail from './AddEmail/AddEmail.jsx';

import { Loading } from '../../../../Components/index.js';

import style from './ChangeEmailPopup.module.scss';
import classNames from 'classnames/bind';
import myaxios from '../../../../api/axios.js';
const cn = classNames.bind(style);

export default function ChangeEmailPopup({props}) { 

    const {userInf, setShowChangeEmailPopup} = props; 
    let email = userInf.email;

    const [hasChangedEmail, setHasChangedEmail] = useState(false)
    const [submitingChangeEmail, setSubmitingChangeEmail] = useState(false)
    
    const [verifyOTPIsSuccess, setVerifyOTPIsSuccess] = useState(false);
    const [newEmail, setNewEmail] = useState('');

    useEffect(() => {
        if (newEmail !== '')
            setVerifyOTPIsSuccess(false);
    }, [newEmail])
    
    useEffect(() => {
        if (newEmail !== '' && verifyOTPIsSuccess)
            handleSubmitChangeEmail();
    }, [verifyOTPIsSuccess])

    const handleSubmitChangeEmail = () => {
        setSubmitingChangeEmail(true);
        myaxios.post('profile/change/email')
            .then(API => {
                console.log(API.data);
                setHasChangedEmail(true)
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div className={cn('popup')}> 
            <div className={cn('container')}> 
                {
                    !submitingChangeEmail
                    &&
                    (
                        (!verifyOTPIsSuccess && newEmail === '')
                        &&
                        <VerifyOTPEmail props={{email, setShowChangeEmailPopup, setVerifyOTPIsSuccess}}></VerifyOTPEmail>
                        ||
                        (
                            newEmail === ''
                            &&
                            <AddEmail props={{userInf, setNewEmail}}></AddEmail>
                            ||
                            <VerifyOTPEmail props={{newEmail, setShowChangeEmailPopup, setVerifyOTPIsSuccess}}></VerifyOTPEmail>
                        )
                    )
                    ||
                    (
                        hasChangedEmail
                        &&
                        <p>Đã thay đổi email thành công</p>
                        ||
                        <div className={cn('loading-popup-container')}>
                            <Loading></Loading>
                        </div>
                    )
                }
            </div>
        </div>
    )
}