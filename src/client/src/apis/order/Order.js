
import { axiosAppJson } from '../../configs/axios.js';

import ResConfig from '../../configs/res/index.js';

export default new class OrderAPI {

    async order(product_list, ship, voucher_id, is_using_nowbuys_coin, order_price) {
        try {
            let res = await axiosAppJson.post(`${process.env.REACT_APP_API_ORDER_ORDER}`, {
                product_list: JSON.stringify(product_list),
                ship: JSON.stringify(ship),
                voucher_id: voucher_id, // 0: get address default of user
                is_using_nowbuys_coin: is_using_nowbuys_coin,
                order_price: order_price
            });
            console.log(res);
            return {data: res.data, status: {code: res.status, text: res.statusText}};
        } catch (err) {
            console.log(err);
            return ResConfig.err(err);
        }
    }

    async getOrderByState(state = 'all') {
        try {
            let res = await axiosAppJson.post(process.env.REACT_APP_API_ORDER_GET_BY_TYPE, {
                state: state
            })
            return res;
        } catch (err) {
             return ResConfig.err(err);
        }
    } 
    
}