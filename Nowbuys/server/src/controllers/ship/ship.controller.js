
import { ShipModel } from "../../models/index.js";

export default new class ShipController {

    // [POST] /ship/get
    async get(req, res) {
        let credentials_info = (req.session && req.session.user)?req.session.user:{};
        
        if (credentials_info.id) {
            (async () => {
                try {
                    const result = await ShipModel.get(credentials_info.id, null)
                    return  res.json({
                        error: false,
                        is_login: true,
                        ship_details: result
                    }) 
                } catch (err) {
                    console.log(err)
                    return  res.status(500).json({
                        error: true,
                        is_login: true,
                        ship_details: null,
                        messsage: err
                    })
                }
            })()
        } else {
            return  res.status(500).json({
                error: true,
                is_login: false
            }) 
        }
    }

    // [POST] /ship/new
    async new(req, res) {
        let credentials_info = (req.session && req.session.user)?req.session.user:{};
        
        if (credentials_info.id) {
            (async () => {
                try {
                    const result = await ShipModel.get(credentials_info.id, null)
                    return  res.json({
                        error: false,
                        is_login: true,
                        ship_details: result
                    }) 
                } catch (err) {
                    console.log(err)
                    return  res.status(500).json({
                        error: true,
                        is_login: true,
                        ship_details: null,
                        messsage: err
                    })
                }
            })()
        } else {
            return  res.status(500).json({
                error: true,
                is_login: false
            }) 
        }
    }
 
}