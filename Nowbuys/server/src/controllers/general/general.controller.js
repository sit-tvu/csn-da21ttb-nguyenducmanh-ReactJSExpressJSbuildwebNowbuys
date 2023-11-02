
import { GeneralModel } from "../../models/index.js";

export default new class GeneralController {

    // [GET] /general/brand/get
    getBrands(req, res) {
        let catelogy_id = req.query.catelogy?req.query.catelogy:0;
        (async () => {
            try {
                const results = await GeneralModel.getBrands(catelogy_id)
                return  res.json(results)
            } catch (err) {
                console.log('GeneralController.getBrands : ' + err)
                return  res.status(500).json([])
            }
        })()
    }

    // [GET] /general/catelogy/get
    getCatelogys(req, res) { 
        (async () => {
            try {
                const results = await GeneralModel.getCatelogys()

                return  res.json(results)
            } catch (err) {
                console.log('GeneralController.getCatelogys : ' + err)
                return  res.status(500).json([])
            }
        })()
    }
}