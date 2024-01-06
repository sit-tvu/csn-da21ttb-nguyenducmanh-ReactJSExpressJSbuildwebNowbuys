
import { CartModel } from "../../models/index.js";

export default new class CartController {

    // [POST] /cart/products-in-cart/get/all
    async getAllProductsInCart(req, res) {
        let credentials_info = (req.session && req.session.user)?req.session.user:{};
        
        if (credentials_info.id) {
            (async () => {
                try {
                    const results = await CartModel.getAllProductsInCart(credentials_info.id)
                    return  res.status(200).json({
                        error: false,
                        is_login: true,
                        product_in_cart: results
                    }) 
                } catch (err) { 
                    return  res.status(500).json({
                        error: true,
                        is_login: false,
                        product_in_cart: [err]
                    })
                }
            })()
        } else {
            return res.status(401).json({
                error: true,
                is_login: false,
                product_in_cart: []
            }) 
        }
    }

    // [POST] /cart/products-in-cart/get/some
    async getSomeProductsInCart(req, res) {
        let credentials_info = (req.session && req.session.user)?req.session.user:{};
        let product_id_list = req.body.product_id_list?JSON.parse(req.body.product_id_list):[]; 

        if (credentials_info.id) {
            (async () => {
                try {
                    const results = await CartModel.getSomeProductsInCart(credentials_info.id, product_id_list)
                    return  res.json({
                        error: false,
                        is_login: true,
                        product_in_cart: results
                    }) 
                } catch (err) {
                    console.log(err)
                    return  res.status(500).json({
                        error: true,
                        is_login: false,
                        product_in_cart: [err]
                    })
                }
            })()
        } else {
            return  res.json({
                error: true,
                is_login: false,
                product_in_cart: []
            }) 
        }
    }

    // [POST] /cart/add-product-to-cart
    async addProductToCart(req, res) {
        let credentials_info = (req.session && req.session.user)?req.session.user:{};
        let product_id = req.query.product_id?req.query.product_id:0;

        if (credentials_info.id) { 
            (async () => {
                try {
                    const result = await CartModel.addProductToCart(credentials_info.id, product_id)
    
                    return  res.json({
                        error: false,
                        message: 'Add cart is success',
                        code_status: result.status_code,
                        product_data: result.product_data
                    })
                } catch (code_status) {
                    return  res.status(500).json({
                        error: true,
                        message: 'Error! An error occurred. Please try again this in app',
                        code_status: code_status,
                        product_data: {}
                    })
                }
            })()
        } else { 
            return res.json({
                error: true,
                message: 'User is not authenticated!',
                code_status: 0,
                product_data: {}
            })
        } 
    }  

    // [POST] /cart/remove-many-products-to-cart
    async removeProductsFromCart(req, res) {
        let credentials_info = (req.session && req.session.user)?req.session.user:{};
        let product_id_list = req.body.product_id_list?JSON.parse(req.body.product_id_list):[];

        if (credentials_info.id) { 
            (async () => {
                try {
                    const code_success = await CartModel.removeProductsFromCart(credentials_info.id, product_id_list)
    
                    return  res.json({
                        error: false,
                        message: 'Remove product from cart is success',
                        code_status: code_success
                    })
                } catch (code_err) {
                    return  res.status(500).json({
                        error: true,
                        message: 'Error! An error occurred. Please try again this in app',
                        code_status: code_err
                    })
                }
            })()
        } else { 
            return res.json({
                error: true,
                message: 'User is not authenticated!',
                code_status: 0 
            })
        }  
    } 

    // [POST] /cart/change-product-number
    async changeProductNumberInCart(req, res) {
        let credentials_info = (req.session && req.session.user)?req.session.user:{};
        let product_id = req.body.product_id?req.body.product_id:(-1);
        let number = req.body.number?req.body.number:1;

        if (credentials_info.id) { 
            if (number > 0 && number < 128) {
                (async () => {
                    try {
                        const code_success = await CartModel.changeProductNumberInCart(credentials_info.id, product_id, number)
        
                        return res.json({
                            error: false,
                            message: 'Change product number is successful!',
                            code_status: code_success
                        })
                    } catch (code_err) {
                        return res.status(500).json({
                            error: true,
                            message: 'Error! An error occurred. Please try again this in app',
                            code_status: code_err
                        })
                    }
                })()
            } else {
                return res.status(500).json({
                    error: true,
                    message: 'Error! An error occurred. Please try again this in app',
                    code_status: 2
                })
            }
        } else { 
            return res.json({
                error: true,
                message: 'User is not authenticated!',
                code_status: 0 
            })
        }  
    } 
}