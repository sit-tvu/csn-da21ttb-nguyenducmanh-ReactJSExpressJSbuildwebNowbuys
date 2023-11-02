
import { ProductModel } from "../../models/index.js";

export default new class ProductsController {

    // [POST] /products/search
    searchProducts(req, res) {
        let search = req.body.search.trim()?req.body.search.trim():'';
        let product_per_page = Number(req.body.product_per_page)?Number(req.body.product_per_page):7;

        (async () => {
            try {
                const result_product = await ProductModel.searchProducts(search, product_per_page)
                return  res.json(result_product)
            } catch (err) {
                console.log('ProductController.searchProducts : ' + err)
                return  res.status(500).json([])
            }
        })()
    }
   
    // [POST] /product-most-searched/get
    getProductsMostSearched(req, res) { 
        let product_per_page = Number(req.body.product_per_page)?Number(req.body.product_per_page):4;

        (async () => {
            try {
                const products_most_searched = await ProductModel.getProductsMostSearched(product_per_page)
                return  res.json(products_most_searched)
            } catch (err) {
                console.log('ProductController.searchProducts : ' + err)
                return  res.status(500).json([])
            }
        })()
    } 

    // [POST] /products/show-in-home-page
    getProductShowInHomePage(req, res) {
        let catelogy_id = req.query.catelogy?req.query.catelogy:0;

        (async () => {
            try {
                const result_product = await ProductModel.getProductShowInHomePage(catelogy_id)
                return  res.json(result_product)
            } catch (err) {
                console.log('ProductController.getProductShowInHomePage : ' + err)
                return  res.status(500).json([])
            }
        })()
    }

    // [POST] /products/product-catelogy/get
    getProductFollowCatelogy(req, res) { 
        let catelogy_id = req.query.catelogy?req.query.catelogy:0;
        let brand_id = req.query.brand?req.query.brand:0;
        let sort_by = req.query.sort_by?req.query.sort_by:0;


        (async () => {
            try { 
                const result_product = await ProductModel.getProductFollowCatelogy(catelogy_id, brand_id, sort_by) 
                return  res.json(result_product)
            } catch (err) {
                console.log('ProductController.getProductFollowCatelogy : ' + err)
                return  res.status(500).json([])
            }
        })()
    }

    // [POST] /products/details/get
    getDetailsProduct(req, res) {
        let credentials_info = (req.session && req.session.user)?req.session.user:{}; ;
        let slug_product = req.query.slug?req.query.slug:'';

        (async () => {
            try {
                const result = await ProductModel.getDetailsProduct(credentials_info.id, slug_product)
                return  res.json(result[0])
            } catch (err) {
                console.log('ProductController.getDetailsProduct : ' + err)
                return  res.status(500).json({})
            }
        })()
    }
}