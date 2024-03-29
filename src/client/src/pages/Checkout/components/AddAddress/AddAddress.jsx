
import { useState, useRef, useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

import {axiosAppJson} from '../../../../configs/axios.js'

import classNames from 'classnames/bind'
import style from './AddAddress.module.scss'
const cn = classNames.bind(style) 


export default function AddAddress({props}) { 

    const navigate = useNavigate()

    let init_consignee_info = {
        consignee_name: props.addressNeedUpdate?props.addressNeedUpdate.consignee_name:'',
        consignee_phone: props.addressNeedUpdate?props.addressNeedUpdate.consignee_phone:'',
        desc_address: props.addressNeedUpdate?props.addressNeedUpdate.desc_address:'',
        type: props.addressNeedUpdate?props.addressNeedUpdate.type:1, // 1: home, 2: office
        is_default: props.addressNeedUpdate?props.addressNeedUpdate.is_default:true
    }

    let init_data_address_selected = {
        province: {
            id: props.addressNeedUpdate?props.addressNeedUpdate.province_id:0,
            name: props.addressNeedUpdate?props.addressNeedUpdate.province_name:'',
        },
        district: {
            id: props.addressNeedUpdate?props.addressNeedUpdate.district_id:0,
            name: props.addressNeedUpdate?props.addressNeedUpdate.district_name:'',
        },
        ward: {
            id: props.addressNeedUpdate?props.addressNeedUpdate.ward_id:0,
            name: props.addressNeedUpdate?props.addressNeedUpdate.ward_name:'',
        }
    } 

    let init_data_address_selected_empty = {
        province: { id: 0, name: '',},
        district: { id: 0, name: '',},
        ward: { id: 0, name: '',}
    } 

    const init_check_data_input = {consignee_name: 1, consignee_phone: 1, desc_address: 1}
    const init_check_data_address_selected = {province: 1, district: 1, ward: 1}
    
    const inputAddressRef = useRef(null)
    const dropdownAddressResultSearchRef = useRef(null)
    const dropdownAddressSelectRef = useRef(null)
    
    const [dataInput, setDataInput] = useState(init_consignee_info)
    const [checkDataInput, setCheckDataInput] = useState(init_check_data_input)
    const [dataAddressSelected, setDataAddressSelected] = useState(init_data_address_selected) 
    const [checkDataAddressSelected, setCheckDataAddressSelected] = useState(init_check_data_address_selected)
    
    const [isShowdropdownAddress, setIsShowDropdownAddress] = useState(false)
    const [searchAddress, setSearchAddress] = useState('')
    const [unitAddress, setUnitAddress] = useState(1) // 1: province, 2: district, 3: ward

    const [listAddressForUnit, setListAddressForUnit] = useState([])
    const [listAddressForSearch, setListAddressForSearch] = useState([])

    
    // hidden dropdowns when click outside input or dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if ((inputAddressRef.current && !inputAddressRef.current.contains(event.target)) && (dropdownAddressSelectRef.current && !dropdownAddressSelectRef.current.contains(event.target))) {
                setIsShowDropdownAddress(false)
            } else {
                if ((inputAddressRef.current && !inputAddressRef.current.contains(event.target)) && (dropdownAddressResultSearchRef.current && !dropdownAddressResultSearchRef.current.contains(event.target))) {
                    setIsShowDropdownAddress(false)
                }
            } 
        }
        document.addEventListener('click', handleClickOutside) 

        return () => { document.removeEventListener('click', handleClickOutside) }
    }, [])

    useEffect(() => {
        if (isShowdropdownAddress) { 
            switch (unitAddress) {
                case 1: 
                    axiosAppJson.post('/address/provinces/all') 
                        .then(API => {
                            setListAddressForUnit(API.data.data)
                        })
                        .catch(err => console.log(err))
                    break;
                case 2: 
                    axiosAppJson.post('/address/districts/dependent', {
                        province_id: dataAddressSelected.province.id
                    }) 
                        .then(API => {
                            setListAddressForUnit(API.data.data)
                        })
                        .catch(err => console.log(err))
                    break;
                case 3: 
                    axiosAppJson.post('/address/wards/dependent', {
                        district_id: dataAddressSelected.district.id
                    }) 
                        .then(API => {
                            setListAddressForUnit(API.data.data)
                        })
                        .catch(err => console.log(err))
                    break;
            } 
        }
    }, [isShowdropdownAddress, dataAddressSelected, unitAddress])

    const abortControllerRef = useRef(new AbortController())

    useEffect(() => {
        if (searchAddress.trim() !== '')
            handleSearchAddress();
        return () => {
            // Cleanup function to abort the request if the component unmounts
            abortControllerRef.current.abort();
        };
    }, [searchAddress])

    const handleSearchAddress = async () => {

        if (abortControllerRef.current) {
            // Abort any ongoing request before making a new one
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController(); // Update the AbortController
        try {
            axiosAppJson.post(`/address/search/get`,
                {search: searchAddress}, // when using method post you must pass newAbortController as 3rd argument -- method get, pass newAbortController as 2rd argument
                {
                    signal: abortControllerRef.current.signal, // Set the signal property in the request config
                }
            )   
                .then(({data}) => {
                    console.log(data);
                    setListAddressForSearch(() => [...data.for_provinces, ...data.for_districts, ...data.for_wards])
                })
                .catch(err => console.log(err))
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request aborted:', error.message)
            } else {
                console.log(error)
            }
        }
    } 

    const handleCheckInput = () => {
        let is_accept = true;

        let check_data_input = init_check_data_input;
        let check_data_address_selected = init_check_data_address_selected;

        // Check consignee name
        if (dataInput.consignee_name.trim() === '') {
            check_data_input.consignee_name = 0;
            is_accept = false;
        } else {
            const regex_name = /^[\p{L}\ṣ̀́̉̃]+$/u;
            if (!regex_name.test(dataInput.consignee_name.trim())) {
                check_data_input.consignee_name = 2;
                is_accept = false;
            }
        }


        if (dataInput.consignee_phone.trim() === '') {
            check_data_input.consignee_phone = 0;
            is_accept = false;
        } else {
            const regex_phone = /^0\d{9}$/; // 10 chữ số liên tiếp.
            if (!regex_phone.test(dataInput.consignee_phone)) {
                check_data_input.consignee_phone = 2;
                is_accept = false;
            }
        }

        if (dataAddressSelected.province.id === 0) {
            check_data_address_selected.province = 0;
            is_accept = false;
        }
        if (dataAddressSelected.district.id === 0) {
            check_data_address_selected.district = 0;
            is_accept = false;
        }
        if (dataAddressSelected.ward.id === 0) {
            check_data_address_selected.ward = 0;
            is_accept = false;
        }

        if (dataInput.desc_address.trim() === '') {
            check_data_input.desc_address = 0;
            is_accept = false;
        }
        setCheckDataInput(check_data_input);
        setCheckDataAddressSelected(check_data_address_selected);

        if (is_accept) {
            if (props.addressNeedUpdate !== null)
                handleSubmitUpdateAddress();
            else
                handleSubmitSaveNewAddress();
        } 
    }

    const handleSubmitSaveNewAddress = () => { 
        axiosAppJson.post('/address/add', {
            consignee_name: dataInput.consignee_name,
            consignee_phone: dataInput.consignee_phone,
            desc_address: dataInput.desc_address,
            province_id: dataAddressSelected.province.id,
            province_name: dataAddressSelected.province.name,
            district_id: dataAddressSelected.district.id,
            district_name: dataAddressSelected.district.name,
            ward_id: dataAddressSelected.ward.id,
            ward_name: dataAddressSelected.ward.name,
            type: dataInput.type,
            is_default: dataInput.is_default
        })
            .then(API => {
                if (!API.data.error) {
                    props.setIsShowPopupAddAddress(false);
                } else {
                    // off loading in popup
                }
            })
            .catch(err => console.log(err))
    }

    const handleSubmitUpdateAddress = () => { 
        axiosAppJson.post('/address/update', {
            id_address_update: props.addressNeedUpdate.id,
            consignee_name: dataInput.consignee_name,
            consignee_phone: dataInput.consignee_phone,
            desc_address: dataInput.desc_address,
            province_id: dataAddressSelected.province.id,
            province_name: dataAddressSelected.province.name,
            district_id: dataAddressSelected.district.id,
            district_name: dataAddressSelected.district.name,
            ward_id: dataAddressSelected.ward.id,
            ward_name: dataAddressSelected.ward.name,
            type: dataInput.type,
            is_default: dataInput.is_default
        })
            .then(API => {
                if (!API.data.error) {
                    props.setIsShowPopupAddAddress(false)
                } else {
                    // off loading in popup
                }
            })
            .catch(err => console.log(err))
    }

    const dataNameAddress = (dataAddressSelected.province.name +(dataAddressSelected.district.id!==0?', ':'')+ dataAddressSelected.district.name +(dataAddressSelected.ward.id!==0?', ':'')+ dataAddressSelected.ward.name)

    return (
        <div className={cn('popup-container')}>
            <div className={cn('header', 'no-border-bottom')}>
                {
                    props.addressNeedUpdate !== 0
                    &&
                    <h2>Cập nhật địa chỉ</h2>
                    ||
                    <h2>Địa chỉ mới</h2>
                }
                {
                    props.listAddressOfUser.length === 0
                    &&
                    <p className={cn('sub-desc')}>Để đặt hàng, vui lòng thêm địa chỉ nhận hàng</p>
                }
            </div>
            <div className={cn('container')}>
                <div className={cn('input-cluster', 'row')}>
                    <div className={cn('input-area', {'error': checkDataInput.consignee_name !== 1})}>
                        {
                            dataInput.consignee_name !== ''
                            &&
                            <label className={cn('label-input')}>Họ và tên</label>
                        }
                        <input className={cn('input')} type='text' placeholder='Họ và tên' name='fullname'
                            value={dataInput.consignee_name}
                            onChange={(e) => {setDataInput(prev => {return {...prev, consignee_name: e.target.value}})}}
                        ></input>
                        {
                            checkDataInput.consignee_name === 0
                            &&
                            <span className={cn('err-status')}>*Vui lòng nhập tên người nhận</span>
                            ||
                            checkDataInput.consignee_name === 2
                            &&
                            <span className={cn('err-status')}>*Tên không hợp lệ</span>
                        }
                    </div>
                    <div className={cn('input-area', {'error': checkDataInput.consignee_phone !== 1})}>
                        {
                            dataInput.consignee_phone !== ''
                            &&
                            <label className={cn('label-input')}>Số điện thoại</label>
                        }
                        <input className={cn('input')} type='text' name='phone'
                            // value={`${dataInput.consignee_phone.slice(0, 4)}${dataInput.consignee_phone.length>4?'.':''}${dataInput.consignee_phone.slice(4, 7)}${dataInput.consignee_phone.length>7?'.':''}${dataInput.consignee_phone.slice(7)}`}
                            value={dataInput.consignee_phone}
                            placeholder='Số điện thoại'
                            onChange={(e) => {
                                setDataInput(prev => {return {...prev, consignee_phone: e.target.value.trim()}})
                            }} 
                        ></input>
                        {
                            checkDataInput.consignee_phone === 0
                            &&
                            <span className={cn('err-status')}>**Số điện thoại không được để trống</span>
                            ||
                            checkDataInput.consignee_phone === 2
                            &&
                            <span className={cn('err-status')}>**Số điện thoại không hợp lệ</span>
                        }
                    </div>
                </div>
                <div className={cn('input-cluster', 'col')}>
                    <div ref={inputAddressRef} className={cn('input-area', 'special-address')}>
                        <div className={cn('area-special', {'error': (checkDataAddressSelected.province === 0 || checkDataAddressSelected.district === 0 || checkDataAddressSelected.ward === 0)})}>
                            {
                                (searchAddress !== '' || dataAddressSelected.province.name !== '')
                                &&
                                <label className={cn('label-input')}>Tỉnh/Thành phố, Quận/Huyện, Phường/Xã</label>
                            }
                            <input className={cn('input')} type='text' name='desc' placeholder={dataAddressSelected.province.name?dataNameAddress:'Tỉnh/Thành phố, Quận/Huyện, Phường/Xã'}
                                value={isShowdropdownAddress?searchAddress:dataNameAddress}
                                onChange={(e) => {
                                    setSearchAddress(e.target.value)
                                }}
                                onFocus={() => {
                                    setIsShowDropdownAddress(true)
                                }}
                            ></input>
                            <div className={cn('icon-area')}>
                                { 
                                    isShowdropdownAddress
                                    &&
                                    (
                                        (searchAddress === '' && dataNameAddress === '')
                                        &&
                                        <Fragment>
                                            <span className="material-icons-round">search</span> 
                                            <span className="material-icons-round">expand_more</span>
                                        </Fragment>
                                        ||
                                        (
                                            (searchAddress === '' && dataNameAddress !== '')
                                            &&
                                            <Fragment>
                                                <span className="material-icons-round">search</span> 
                                                <span className={`${cn('small', 'allow-click')} `+"material-icons-round"}
                                                    onClick={() => {
                                                        setDataAddressSelected(init_data_address_selected_empty)
                                                        setUnitAddress(1)
                                                    }}
                                                >cancel</span>
                                                <span className="material-icons-round">expand_more</span>
                                            </Fragment>
                                            ||
                                            searchAddress !== ''
                                            &&
                                            <span className={`${cn('small', 'allow-click')} `+"material-icons-round"}
                                                onClick={() => setSearchAddress('')}
                                            >cancel</span>
                                        )
                                    )
                                    ||
                                    <span className="material-icons-round">expand_more</span> 
                                } 
                            </div>
                        </div>
                        {
                            (checkDataAddressSelected.province === 0 && checkDataAddressSelected.district === 0 && checkDataAddressSelected.ward === 0)
                            &&
                            <span className={cn('err-status')}>***Vui lòng chọn địa chỉ</span>
                            ||
                            (checkDataAddressSelected.province === 0 || checkDataAddressSelected.district === 0 || checkDataAddressSelected.ward === 0)
                            &&
                            <span className={cn('err-status')}>***Vui lòng hoàn tất các đơn vị địa chỉ còn lại</span>
                        }
                        {
                            isShowdropdownAddress
                            &&
                            (
                                (searchAddress !== '')
                                &&
                                <div ref={dropdownAddressResultSearchRef} className={cn('dropdown-address-result-search')}>
                                    <ul>
                                        {
                                            listAddressForSearch.map((item, i) => {
                                                return <li key= {item.province_name+'-'+item.district_name+'-'+item.ward_name+i}
                                                    onClick={() => {
                                                        setDataAddressSelected({
                                                            province: {
                                                                id: item.province_id,
                                                                name: item.province_name,
                                                            },
                                                            district: {
                                                                id: item.district_id,
                                                                name: item.district_name,
                                                            },
                                                            ward: {
                                                                id: item.ward_id,
                                                                name: item.ward_name,
                                                            }
                                                        })
                                                        setIsShowDropdownAddress(false)
                                                        setSearchAddress('')
                                                    }}
                                                >{`${item.ward_name}, `}<span className={cn('text-blur')}>{` ${item.district_name}, ${item.province_name}`}</span></li>
                                            })
                                        }
                                    </ul>
                                </div>
                                ||
                                <div ref={dropdownAddressSelectRef} className={cn('dropdown-address-select')}>
                                    <ul className={cn('nav-bar')}>
                                        <li className={cn({'allow': dataAddressSelected.province.id !== 0}, {'active': unitAddress === 1})}
                                            onClick={() => {
                                                if (dataAddressSelected.province.id !== 0) 
                                                    setUnitAddress(1)
                                            }}
                                        >Tỉnh/Thành phố</li>
                                        <li className={cn({'allow': dataAddressSelected.province.id !== 0}, {'active': unitAddress === 2})}
                                            onClick={() => {
                                                if (dataAddressSelected.province.id !== 0) 
                                                    setUnitAddress(2)
                                            }}
                                        >Quận/Huyện</li>
                                        <li className={cn({'allow': dataAddressSelected.district.id !== 0}, {'active': unitAddress === 3})}
                                            onClick={() => {
                                                if (dataAddressSelected.district.id !== 0) 
                                                    setUnitAddress(3)
                                            }}
                                        >Phường/Xã</li>
                                    </ul> 
                                    <div className={cn('dropdown-container')}>
                                        <ul>
                                            {
                                                listAddressForUnit.map(item => {
                                                    return <li key={item.name} className={cn({'selected': (item.name == dataAddressSelected.province.name || item.name == dataAddressSelected.district.name || item.name == dataAddressSelected.ward.name) })}
                                                        onClick={() => {
                                                            switch (unitAddress) {
                                                                case 1:
                                                                    setDataAddressSelected(prev => {return {province: {id: item.id, name: item.name}, district: {id: 0, name: ''}, ward: {id: 0, name: ''}}})
                                                                    break;
                                                                case 2:
                                                                    setDataAddressSelected(prev => {return {...prev, district: {id: item.id, name: item.name}, ward: {id: 0, name: ''}}})
                                                                    break;
                                                                case 3:
                                                                    setDataAddressSelected(prev => {return {...prev, ward: {id: item.id, name: item.name}}})
                                                                    break;
                                                            }
                                                            if ((unitAddress+1)===4) {
                                                                setUnitAddress(1)
                                                                setIsShowDropdownAddress(false)
                                                            } else {
                                                                setUnitAddress(unitAddress+1)
                                                            }
                                                        }}
                                                    >{item.name}</li>
                                                })
                                            } 
                                        </ul>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={cn('input-cluster', 'col')}>
                    <div className={cn('input-area', {'error': checkDataInput.desc_address !== 1})}>
                        {
                            dataInput.desc_address !== ''
                            &&
                            <label className={cn('label-input')}>Địa chỉ cụ thể</label>
                        }
                        <textarea className={cn('textarea')} value={dataInput.desc_address} onChange={(e) => setDataInput(prev => {return{...prev, desc_address: e.target.value}})} rows="2" placeholder="Địa chỉ cụ thể"></textarea>
                        {
                            checkDataInput.desc_address === 0
                            &&
                            <span className={cn('err-status')}>****Vui lòng nhập mô tả chi tiết địa chỉ nhận hàng</span>
                        }
                    </div>
                </div>
                <div className={cn('google-map-area')}>
                    <h1>Tính năng đang thử nghiệm</h1>
                </div>
                <div className={cn('type-address')}>
                    <p className={cn('type-address_title')}>Loại địa chỉ</p>
                    <div className={cn('type-address_button-bar')}>
                        <button className={cn({'active': dataInput.type === 1})}
                            onClick={() => setDataInput(prev => {return{...prev, type: 1}})}
                        >Nhà riêng</button>
                        <button className={cn({'active': dataInput.type === 2})}
                            onClick={() => setDataInput(prev => {return{...prev, type: 2}})}
                        >Công ty</button>
                    </div>
                </div>
                <div className={cn('button-bar')}>
                    <div className={cn('checkbox-area')}
                        onClick={() => {
                            if (props.listAddressOfUser.length > 0)
                                setDataInput(prev => {return{...prev, is_default: !prev.is_default}})
                        }}
                    >
                        {
                            dataInput.is_default
                            &&
                            <span style={{color: 'red'}} className="material-icons-round">check_box</span>
                            ||
                            <span style={{color: '#ccc'}} className="material-icons-round">check_box_outline_blank</span>
                        }
                        <p>Đặt làm địa chỉ mặc định</p>
                    </div>
                </div>
            </div>
            <div className={cn('button-bar')}> 
                <button type='button' className={cn('btn-exit')}
                    onClick={() => {
                        if (props.listAddressOfUser.length === 0 && props.addressNeedUpdate === 0) {
                            navigate(-1)
                        } else { 
                            props.setAddressNeedUpdate(null)
                            props.setIsShowPopupAddAddress(false)
                        }
                }}>Trở lại</button>
                <button type='button' className={cn('btn-save', 'padding-40')}
                    onClick={() => handleCheckInput()}
                >Lưu</button>
            </div>
        </div>
    )
}