
import { ProductModel } from "../../models/index.js";

import { ResError, ResSuccess, ResSuccessProduct } from "../../utilities/index.js";

export default new class Product {

    // [GET] /api/admin/product/get/all
    async getAllProducts(req, res) {
        try {
            let query = await ProductModel.getAll();

            return ResSuccessProduct.typeArrayList(res, query, 200, '');

        } catch (err) { 
            return ResError.fromSystem(res, err, 500, '[GET] /api/admin/product/get/all');
        }
    }

    // [POST] /api/admin/product/change
    async changeProduct(req, res) {
        let product_id = req.body.product_id?req.body.product_id:null;
        let base = req.body.base?req.body.base:null;
        let details = req.body.details?req.body.details:null;

        if (product_id && (base || details)) {
            try {
                if (base)
                    await ProductModel.changeProductBase(product_id, base);
                if (details)
                    await ProductModel.changeProductDetails(product_id, details);

                return ResSuccess.default(res, null, 200, 'change product successfully');
            } catch (err) { 
                return ResError.fromSystem(res, err, 500, '[POST] /api/admin/product/change');
            }
        } else {
            return ResError.requestInvalid(res, null, 400, 'Your request is invalid!');
        }
    }
}