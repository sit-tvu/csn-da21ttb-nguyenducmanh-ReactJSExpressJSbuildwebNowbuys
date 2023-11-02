
import { useRef, useState, useEffect, Fragment } from 'react' 

import { Loading } from '../../Components/index.js' 

import ChangeEmailPopup from './components/ChangeEmailPopup/ChangeEmailPopup.jsx'

import myaxios from '../../api/axios.js'

import style from './Account.module.scss'
import classNames from 'classnames/bind'
const cn = classNames.bind(style)

export default function Account() {  

    document.title = 'Nowbuys - Thông tin tài khoản' 

    const [disableAction, setDisableAction] = useState(false);

    const [isShowChangeEmailPopup, setShowChangeEmailPopup] = useState(false);

    const init_check_data_change = {firstname: true, lastname: true, birthday: {day: true, month: true, year: true}}

    const [isSaving, setIsSaving] = useState(false)
    const [hasBeenChange, setHasBeenChange] = useState(false)
    const [checkDataChange, setCheckDataChange] = useState(init_check_data_change)


    const [userInf, setUserInf] = useState(null)

    const [newUserInf, setNewUserInf] = useState(null)

    const [selectedFile, setSelectedFile] = useState(null);


    // For select date
    const init_day = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    const init_month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const init_year = [1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005];

    const selectDayRef = useRef(null);
    const selectMonthRef = useRef(null);
    const selectYearRef = useRef(null);

    const [newUserBirthday, setNewUserBirthday] = useState({day: 0, month: 0, year: 0})

    const [isShowDropdownSelectDay, setIsShowDropdownSelectDay] = useState(false);
    const [isShowDropdownSelectMonth, setIsShowDropdownSelectMonth] = useState(false);
    const [isShowDropdownSelectYear, setIsShowDropdownSelectYear] = useState(false);
    // end for select date

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectDayRef.current && !selectDayRef.current.contains(event.target)) {
                setIsShowDropdownSelectDay(false)
            }
            if (selectMonthRef.current && !selectMonthRef.current.contains(event.target)) {
                setIsShowDropdownSelectMonth(false)
            }
            if (selectYearRef.current && !selectYearRef.current.contains(event.target)) {
                setIsShowDropdownSelectYear(false)
            }
        }
        document.addEventListener('click', handleClickOutside) 
        
        handleGetUserInf()

        return () => { document.removeEventListener('click', handleClickOutside) }
    }, [])

    useEffect(() => {
        if (userInf && newUserInf) {
            setHasBeenChange(prev => {
                if (userInf.firstname!=newUserInf.firstname.trim()) return true;
                if (userInf.lastname!=newUserInf.lastname.trim()) return true;
                if (userInf.sex!=newUserInf.sex) return true;
                if (userInf.birthday.day!=newUserBirthday.day) return true;
                if (userInf.birthday.month!=newUserBirthday.month) return true;
                if (userInf.birthday.year!=newUserBirthday.year) return true;
                if (userInf.avatar_url!=newUserInf.avatar_url) return true;
                return false;
            }) 
        }
    }, [newUserInf, newUserBirthday])

    const handleGetUserInf = () => {
        myaxios.post(`/auth/profile/get`)        
            .then(API => { 
                if (API.data.is_login) {
                    setUserInf(API.data.user_info)
                    setNewUserInf((prev) => { 
                        return {
                            firstname: API.data.user_info.firstname,
                            lastname: API.data.user_info.lastname,
                            avatar_url: API.data.user_info.avatar_url,
                            sex: API.data.user_info.sex
                        }
                    })
                    setNewUserBirthday(API.data.user_info.birthday)
                }
            })
            .catch(error => console.log(error))
    }

    const handleCheckData = () => { 
        if (newUserInf.firstname.trim() == '' || newUserInf.lastname.trim() == '' || newUserBirthday.day == 0 || newUserBirthday.month == 0 || newUserBirthday.year == 0) {
            setCheckDataChange(prev => {
                return {
                    firstname: newUserInf.firstname.trim() != '',
                    lastname: newUserInf.lastname.trim() != '',
                    birthday: {
                        day: newUserBirthday.day!==0,
                        month: newUserBirthday.month!==0,
                        year: newUserBirthday.year!==0
                    }
                }
            })
        } else {
            setCheckDataChange(init_check_data_change) 
            handleSaveChange()
        }
    }

    const handleSaveChange = () => {

        setIsSaving(true)

        const formData = new FormData() 
        formData.append('image', selectedFile) 

        myaxios.postForm('/upload/test/update', formData, {
            headers: {
                "Content-type": "multipart/form-data",
            }
        }) 
            .then(API => {
                console.log(API);
                // success
                handleGetUserInf()
                setIsSaving(false) 
                setHasBeenChange(false)
            })
            .catch(e => console.log(e))  
    }


    const handleSelectDate = (change_unit, value) => {
        switch (change_unit) {
            case 'day': 
                    let month = newUserBirthday.month, year = newUserBirthday.year;
                    
                    if (value == 29) {
                        if (newUserBirthday.month == 2 && newUserBirthday.year % 4 != 0)
                            year = 0;
                    }
                    if (value >= 30 && newUserBirthday.month == 2) {
                        month = 0; year = 0;
                    }

                    setNewUserBirthday({day: value, month, year}) 

                    setIsShowDropdownSelectDay(false)
                break;
            case 'month':
                    if (value == 2 && newUserBirthday.day == 29 && newUserBirthday.year%4!=0)
                        setNewUserBirthday(prev => { return {...prev, month: value, year: 0} })
                    else
                        setNewUserBirthday(prev => { return {...prev, month: value} })

                    setIsShowDropdownSelectMonth(false)
                break;
            case 'year':
                    setNewUserBirthday(prev => { return {...prev, year: value} })
                    setIsShowDropdownSelectYear(false)
                break;
        }
    } 

    console.log(isShowChangeEmailPopup);


    return (
        <div className={cn('container')} > 
            {
                userInf
                &&
                <Fragment>
                    <h1 className={cn('title')}>Xin chào</h1>
                    <div className={cn('user-inf')}>
                        <div className={cn('left')}> 
                            <form className={cn('left_inf-change')}>

                                <div className={cn('cluster-col')}> 
                                    <div className={cn('text-change')}><h4>Tên đăng nhập:</h4><p>{userInf.username}</p></div>
                                    <div className={cn('text-change')}><h4>Email:</h4><p>{userInf.email}</p><span>Thay đổi</span></div>
                                    <div className={cn('text-change')}><h4>Số điện thoại:</h4><p>{userInf.phone}</p><span>Thay đổi</span></div>
                                </div>

                                <div className={cn('cluster-row')}>
                                    <div className={cn('input-area-text', {'warning': !checkDataChange.lastname})}>
                                        {
                                            newUserInf.lastname
                                            &&
                                            <label>Họ và tên đệm</label>
                                        }
                                        <input type="text" placeholder='Họ và tên đệm'
                                            value={newUserInf.lastname}
                                            onChange = {disableAction ? () => {} : (e) => {
                                                setNewUserInf((prev) => {
                                                    prev.lastname = e.target.value
                                                    return { ...prev} 
                                                })
                                            }}
                                        ></input>
                                        {
                                            !checkDataChange.lastname
                                            &&
                                            <span className={cn('warning-status')}>*Không hợp lệ</span>
                                        }
                                    </div>
                                    <div className={cn('input-area-text', {'warning': !checkDataChange.firstname})}>
                                        {
                                            newUserInf.firstname
                                            &&
                                            <label>Tên</label>
                                        }
                                        <input type="text" placeholder='Tên'
                                            value={newUserInf.firstname}
                                            onChange = {disableAction ? () => {} : (e) => {
                                                setNewUserInf((prev) => {
                                                    prev.firstname = e.target.value
                                                    return { ...prev} 
                                                })
                                            }}
                                        ></input>
                                        {
                                            !checkDataChange.firstname
                                            &&
                                            <span className={cn('warning-status')}>**Không hợp lệ</span>
                                        }
                                    </div>
                                </div>

                                <div className={cn('select-date')}>
                                    <div className={cn('select-cluster')}>
                                        <div ref={selectDayRef} className={cn('select_body', {'warning': !checkDataChange.birthday.day})}
                                            onClick={disableAction ? () => {} : () => { setIsShowDropdownSelectDay(true) }}
                                        >
                                            {
                                                (isShowDropdownSelectDay || newUserBirthday.day !== 0)
                                                &&
                                                <label>Ngày</label> 
                                            }
                                            <p>{newUserBirthday.day!==0?newUserBirthday.day:isShowDropdownSelectDay?'':'Ngày'}</p>
                                            {
                                                isShowDropdownSelectDay
                                                &&
                                                <span className="material-icons-round">expand_less</span>
                                                ||
                                                <span className="material-icons-round">expand_more</span>
                                            }
                                        </div>
                                        {
                                            isShowDropdownSelectDay
                                            &&
                                            <div className={cn('dropdown', 'day')}>
                                                {
                                                    init_day.map(item => {
                                                        return <span key={item} onClick={() => handleSelectDate('day', item)} className={cn('allow-select')}>{item}</span>
                                                    })
                                                } 
                                            </div>
                                        }
                                    </div>   
                                    <div ref={selectMonthRef} className={cn('select-cluster')}>
                                        <div  className={cn('select_body', {'warning': !checkDataChange.birthday.month})}
                                            onClick={disableAction ? () => {} : () => { setIsShowDropdownSelectMonth(true) }}
                                        >
                                            {
                                                (isShowDropdownSelectMonth || newUserBirthday.month !== 0)
                                                &&
                                                <label>Tháng</label> 
                                            }
                                            <p>{newUserBirthday.month!==0?newUserBirthday.month:isShowDropdownSelectMonth?'':'Tháng'}</p>
                                            {
                                                isShowDropdownSelectMonth
                                                &&
                                                <span className="material-icons-round">expand_less</span>
                                                ||
                                                <span className="material-icons-round">expand_more</span>
                                            }
                                        </div>
                                        {
                                            isShowDropdownSelectMonth
                                            &&
                                            <div className={cn('dropdown', 'month')}>
                                                {
                                                    init_month.map(item => {
                                                        if (newUserBirthday.day == 31)
                                                            if ([2, 4, 6, 9, 11].indexOf(item)!=-1)
                                                                return <span key={item} className={cn('not-allow-select')}>{item}</span>
                                                        if (newUserBirthday.day == 30 && item == 2)
                                                                return <span key={item} className={cn('not-allow-select')}>{item}</span>

                                                        return <span key={item} onClick={() => handleSelectDate('month', item)} className={cn('allow-select')}>{item}</span>
                                                    })
                                                }   
                                            </div>
                                        }
                                    </div>   
                                    <div className={cn('select-cluster')}>
                                        <div ref={selectYearRef} className={cn('select_body', {'warning': !checkDataChange.birthday.year})}
                                            onClick={disableAction ? () => {} : () => { setIsShowDropdownSelectYear(true) }}
                                        >
                                            {
                                                (isShowDropdownSelectYear || newUserBirthday.year !== 0)
                                                &&
                                                <label>Năm</label> 
                                            }
                                            <p>{newUserBirthday.year!==0?newUserBirthday.year:isShowDropdownSelectYear?'':'Năm'}</p>
                                            {
                                                isShowDropdownSelectYear
                                                &&
                                                <span className="material-icons-round">expand_less</span>
                                                ||
                                                <span className="material-icons-round">expand_more</span>
                                            }
                                        </div>
                                        {
                                            isShowDropdownSelectYear
                                            &&
                                            <div className={cn('dropdown', 'year')}>
                                                {
                                                    init_year.map(item => {
                                                        if (newUserBirthday.day == 29 && newUserBirthday.month == 2 && item%4!=0)
                                                            return <span key={item} className={cn('not-allow-select')}>{item}</span>
                                                        return <span key={item} onClick={() => handleSelectDate('year', item)} className={cn('allow-select')}>{item}</span>
                                                    })
                                                }    
                                            </div>
                                        }
                                    </div>   
                                </div>

                                <div className={cn('select-sex-cluster')}>
                                    <p>Giới tính</p>
                                    <div className={cn('select-are-radio')}>
                                        <div className={cn('select-item', {'checked': newUserInf.sex === 'male'})}
                                            onClick = {disableAction ? () => {} : () => {
                                                setNewUserInf((prev) => {
                                                    return {
                                                        ...prev,
                                                        sex: 'male'
                                                    }
                                                })
                                            }}
                                        >
                                            {
                                                newUserInf.sex === 'male'
                                                &&
                                                <span className="material-icons">check_box</span>
                                                ||
                                                <span className="material-icons-outlined">check_box_outline_blank</span>
                                            }
                                            <span>Nam</span>
                                        </div>
                                        <div className={cn('select-item', {'checked': newUserInf.sex === 'female'})}
                                            onClick = {disableAction ? () => {} : () => {
                                                setNewUserInf((prev) => { 
                                                    return { ...prev, sex: 'female'}
                                                })
                                            }}
                                        >
                                            {
                                                newUserInf.sex === 'female'
                                                &&
                                                <span className="material-icons">check_box</span>
                                                ||
                                                <span className="material-icons-outlined">check_box_outline_blank</span>
                                            }
                                            <span>Nữ</span>
                                        </div>
                                        <div className={cn('select-item', {'checked': newUserInf.sex === 'other'})}
                                            onClick = {disableAction ? () => {} : () => {
                                                setNewUserInf((prev) => { 
                                                    return {...prev, sex: 'other'}
                                                })
                                            }}
                                        >
                                            {
                                                newUserInf.sex === 'other'
                                                &&
                                                <span className="material-icons">check_box</span>
                                                ||
                                                <span className="material-icons-outlined">check_box_outline_blank</span>
                                            }
                                            <span>Khác</span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className={cn('user-inf-are_right')}>
                            <div className={cn('avatar')}>
                                <div className={cn('avatar-frame')}>
                                    <img src={newUserInf.avatar_url || "https://manhducjr.com/nowbuys/User/no-avatar.jpg"} alt='Avatar'></img>  
                                </div>
                                <div className={cn('avatar-button')}>
                                    <button className={cn('avatar-button-delete')}
                                        onClick={disableAction ? () => {} : () => {
                                            setSelectedFile(null)
                                            setNewUserInf(prev => {
                                                return {...prev, avatar_url: ''}
                                            })
                                        }}
                                    >Xoá</button>
                                    {/* key = Math.random renew input value, you can select a picture multi time */}
                                    <input key={Math.random()} name="avatar" type="file" accept=".jpg, .png" className={cn('avatar-button-change')}
                                        onChange={disableAction ? () => {} : (e) => {
                                            setSelectedFile(e.target.files[0]); 
                                            setNewUserInf(prev => {
                                                return {...prev, avatar_url: URL.createObjectURL(e.target.files[0])}
                                            })
                                        }}
                                    ></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cn('area-button')}>
                        <button
                            className={cn('button-save', {'not-allow-click': !hasBeenChange})} 
                            onClick={disableAction ? () => {} : () => {
                                if (hasBeenChange)
                                    handleCheckData()
                                
                                console.log('click')
                                setDisableAction(true)
                                setShowChangeEmailPopup(true)

                            }}
                        >Lưu</button>
                    </div>
                </Fragment>
                ||
                <div className={cn('loading-cover')}>
                    <Loading props={{color: '#ccc'}}></Loading>
                </div>
            }
            {
                isSaving
                &&
                <div className={cn('loading-cover')}>
                    <Loading props={{color: '#ccc'}}></Loading>
                </div>
            }
            {
                isShowChangeEmailPopup
                &&
                <ChangeEmailPopup props={{userInf, setShowChangeEmailPopup}}></ChangeEmailPopup> 
            }
        </div>
    )
}  