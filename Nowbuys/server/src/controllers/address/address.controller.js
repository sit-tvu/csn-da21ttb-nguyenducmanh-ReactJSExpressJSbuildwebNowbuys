
import { AddressModel } from '../../models/index.js'

export default new class AddressController {
 
    getAddressForUser(req, res) {
        let credentials_info = (req.session && req.session.user)?req.session.user:{}; 

        if (credentials_info.id) {
            (async () => {
                try {
                    const result = await AddressModel.getAddressForUser(credentials_info.id)
                    return  res.status(200).json({
                        error: false,
                        address_list: result
                    })
                } catch (err) {
                    return  res.status(500).json({ 
                        error: true, 
                        message: "Error"
                    })
                }
            })() 
        } else {
            return res.json({
                error: true, 
                message: "You are not log in"
            })
        }
    }

    addAddress(req, res) {
        let credentials_info = (req.session && req.session.user)?req.session.user:{};
        let address = {
            consignee_name: req.body.consignee_name.trim()?req.body.consignee_name.trim():'',
            consignee_phone: req.body.consignee_phone.trim()?req.body.consignee_phone.trim():'',
            desc_address: req.body.desc_address.trim()?req.body.desc_address.trim():'',
            province_id: req.body.province_id?req.body.province_id:null,
            province_name: req.body.province_name.trim()?req.body.province_name.trim():'',
            district_id: req.body.district_id?req.body.district_id:null,
            district_name: req.body.district_name.trim()?req.body.district_name.trim():'',
            ward_id: req.body.ward_id?req.body.ward_id:null,
            ward_name: req.body.ward_name.trim()?req.body.ward_name.trim():'',
            type: Number(req.body.type)?Number(req.body.type):1,
            is_default: req.body.is_default?1:0
        }

        if (credentials_info.id) {
            (async () => {
                try {
                    const is_success = await AddressModel.addAddress(credentials_info.id, address)
                    return  res.status(200).json({
                        error: false,
                        is_success: is_success
                    })
                } catch (err) {
                    return  res.status(500).json({ 
                        error: true, 
                        message: "Error"
                    })
                }
            })() 
        } else {
            return res.json({
                error: true, 
                message: "You are not log in"
            })
        }
    } 

    updateAddress(req, res) {
        let credentials_info = (req.session && req.session.user)?req.session.user:{};

        let address = {
            id_address_update: req.body.id_address_update?req.body.id_address_update:0,
            consignee_name: req.body.consignee_name.trim()?req.body.consignee_name.trim():'',
            consignee_phone: req.body.consignee_phone.trim()?req.body.consignee_phone.trim():'',
            desc_address: req.body.desc_address.trim()?req.body.desc_address.trim():'',
            province_id: req.body.province_id?req.body.province_id:null,
            province_name: req.body.province_name.trim()?req.body.province_name.trim():'',
            district_id: req.body.district_id?req.body.district_id:null,
            district_name: req.body.district_name.trim()?req.body.district_name.trim():'',
            ward_id: req.body.ward_id?req.body.ward_id:null,
            ward_name: req.body.ward_name.trim()?req.body.ward_name.trim():'',
            type: Number(req.body.type)?Number(req.body.type):1,
            is_default: req.body.is_default?1:0
        }

        if (credentials_info.id) {
            (async () => {
                try {
                    const is_success = await AddressModel.updateAddress(credentials_info.id, address)
                    return  res.status(200).json({
                        error: false,
                        is_success: is_success
                    })
                } catch (err) {
                    return  res.status(500).json({ 
                        error: true, 
                        message: "Error"
                    })
                }
            })() 
        } else {
            return res.json({
                error: true, 
                message: "You are not log in"
            })
        }
    } 

    searchAddress(req, res) {
        let search = req.body.search?req.body.search:'';

        (async () => {
            try {
                const datas = await AddressModel.searchAddress(search)
                return  res.status(200).json({
                    error: false,
                    ...datas
                })
            } catch (err) {
                console.log(err)
                return  res.status(500).json({ 
                    error: true, 
                    message: "Error"
                })
            }
        })() 
    }  

    getAllProvinces(req, res) { 
        (async () => {
            try {
                const datas = await AddressModel.getAllProvinces()
                return  res.status(200).json({
                    error: false,
                    data: datas
                })
            } catch (err) {
                console.log(err)
                return  res.status(500).json({ 
                    error: true, 
                    message: "Error"
                })
            }
        })() 
    } 

    getDistrictsDependent(req, res) { 
        let province_id = req.body.province_id?req.body.province_id:'';
        (async () => {
            try {
                const datas = await AddressModel.getDistrictsDependent(province_id)
                return  res.status(200).json({
                    error: false,
                    data: datas
                })
            } catch (err) {
                console.log(err)
                return  res.status(500).json({ 
                    error: true, 
                    message: "Error"
                })
            }
        })() 
    }  

    getWardsDependent(req, res) { 
        let district_id = req.body.district_id?req.body.district_id:'';
        (async () => {
            try {
                const datas = await AddressModel.getWardsDependent(district_id)
                return  res.status(200).json({
                    error: false,
                    data: datas
                })
            } catch (err) {
                console.log(err)
                return  res.status(500).json({ 
                    error: true, 
                    message: "Error"
                })
            }
        })() 
    }  
}