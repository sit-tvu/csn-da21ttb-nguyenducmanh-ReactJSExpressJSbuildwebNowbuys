
import { axiosAppJson } from '../../configs/axios.js';

export default new class ProductAPI { 

    async search(search, product_per_page = 7) {
        try {
            let res = await axiosAppJson.post(`${process.env.REACT_APP_API_PRODUCT_SEARCH}`, {
                search: search,
                product_per_page: product_per_page
            });
            return {data: res.data, status: {code: res.status, text: res.statusText}};
        } catch (err) {
            return {
                is_err: true,
                status: `${process.env.REACT_APP_API_PRODUCT_SEARCH} -> failed!`,
                message: err
            }
        }
    }

    async mostSearch(product_per_page = 4) {
        try {
            let res = await axiosAppJson.post(`${process.env.REACT_APP_API_PRODUCT_MOST_SEARCHED}`, {
                product_per_page: product_per_page
            });
            return {data: res.data, status: {code: res.status, text: res.statusText}};
        } catch (err) {
            return {
                is_err: true,
                status: `${process.env.REACT_APP_API_PRODUCT_MOST_SEARCHED} -> failed!`,
                message: err
            }
        }
    } 
} 