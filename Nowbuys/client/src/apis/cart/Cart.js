
import { axiosAppJson } from '../../configs/axios.js';

export default new class CartAPI { 

    async getAllProducts() {
        try {
            let res = await axiosAppJson.post(`${process.env.REACT_APP_API_CART_GET_ALL_PRODUCTS}`);
            return {data: res.data, status: {code: res.status, text: res.statusText}};
        } catch (err) {
            return {
                is_err: true,
                status: `${process.env.REACT_APP_API_CART_GET_ALL_PRODUCTS} -> failed!`,
                message: err
            }
        }
    }

    async deleteProducts(list_product_id = []) {
        try {
            let res = await axiosAppJson.post(`${process.env.REACT_APP_API_CART_DELETE_PRODUCTS}`, {
                product_id_list: JSON.stringify(list_product_id)
            });
            return {data: res.data, status: {code: res.status, text: res.statusText}};
        } catch (err) {
            return {
                is_err: true,
                status: `${process.env.REACT_APP_API_CART_DELETE_PRODUCTS} -> failed!`,
                message: err
            }
        }
    } 

    async changeNumberProducts(product_id, number) {
        try {
            let res = await axiosAppJson.post(`${process.env.REACT_APP_API_CART_PATCH_NUMBER_PRODUCTS}`, {
                product_id: product_id,
                number: number
            });
            return {data: res.data, status: {code: res.status, text: res.statusText}};
        } catch (err) {
            return {
                is_err: true,
                status: `${process.env.REACT_APP_API_CART_PATCH_NUMBER_PRODUCTS} -> failed!`,
                message: err
            }
        }
    } 
} 