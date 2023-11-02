
import { useState, useEffect } from 'react'

import myAxios from '../../../api/axios.js'
import { Loading } from '../../../Components/index.js'

import AddAddress from './AddAddress/AddAddress.jsx'

import classNames from 'classnames/bind'
import style from './AddressPopup.module.scss'
const cn = classNames.bind(style)  

export default function AddressPopup({props}) {

    const [listAddressOfUser, setListAddressOfUser] = useState(null) 
    const [idOfAddressSelected, setIdOfAddressSelected] = useState(props.idOfAddressSelected)
    const [addressNeedUpdate, setAddressNeedUpdate] = useState(null)

    const [isShowPopupAddAddress, setIsShowPopupAddAddress] = useState(false) 

    useEffect(() => {
        if (isShowPopupAddAddress === false)
            handleGetAddressOfUser()
    }, [isShowPopupAddAddress])

    const handleGetAddressOfUser = () => {
        setListAddressOfUser(null)
        myAxios.post('/address/for-user/get')
            .then(API => {
                setListAddressOfUser(API.data.address_list)
            })
            .catch(err => console.log(err))
    } 

    const handleSaveChange = () => {
        props.setIdOfAddressSelected(idOfAddressSelected)
        props.setShowAddressPopup(false)
    }
 

    return (
        <div className={cn('address-popup')}>
            {
                listAddressOfUser === null
                &&
                <div style={{marginTop: '100px'}}>
                    <Loading></Loading>
                </div>
                ||
                (
                    (isShowPopupAddAddress || listAddressOfUser.length === 0)
                    &&
                    <AddAddress props={{listAddressOfUser, setAddressNeedUpdate, addressNeedUpdate, setIsShowPopupAddAddress}} />
                    ||
                    <div className={cn('popup-container')}>
                        <div className={cn('header')}>
                            <h2>Địa chỉ của tôi</h2>
                        </div>
                        <div className={cn('container')}>
                            {
                                listAddressOfUser.map(address => {
                                    return ( 
                                        <div key={address.id} className={cn('address-item')}>
                                            <div className={cn('left')}>
                                                {
                                                    idOfAddressSelected === address.id
                                                    &&
                                                    <span className="material-icons-outlined">radio_button_checked</span>
                                                    ||
                                                    <span className="material-icons-outlined"
                                                        onClick={() => {
                                                            if (idOfAddressSelected !== address.id)
                                                                setIdOfAddressSelected(address.id)
                                                        }}
                                                    >radio_button_unchecked</span>
                                                }
                                            </div>
                                            <div className={cn('center')}>
                                                <div className={cn('center_head')}>
                                                    <h3 className={cn('center_head__name')}>{address.consignee_name}</h3>
                                                    <h4 className={cn('center_head__phone')}>{address.consignee_phone}</h4>
                                                </div>
                                                <div className={cn('center_content')}>
                                                    <p className={cn('center_content__desc')}>{address.desc}</p>
                                                    <p className={cn('center_content__address')}>{`${address.ward_name}, ${address.district_name}, ${address.province_name}`}</p>
                                                </div>
                                            </div>
                                            <div className={cn('right')}>
                                                <p onClick={() => {
                                                    setAddressNeedUpdate(address)
                                                    setIsShowPopupAddAddress(true)
                                                }}>Cập nhật</p>
                                            </div>
                                        </div> 
                                    )
                                })
                            } 
                            <button type='button' className={cn('btn-add-address')}
                                onClick={() => setIsShowPopupAddAddress(true)}
                            > 
                                <span className="material-icons-round">add</span>
                                <p>Thêm địa chỉ mới</p>
                            </button>
                        </div>
                        <div className={cn('button-bar')}>
                            <button type='button' className={cn('btn-exit')}
                                onClick={() => props.setShowAddressPopup(false)}
                            >Huỷ</button>
                            <button type='button' className={cn('btn-save')}
                                onClick={() => handleSaveChange()}
                            >Xác nhận</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}