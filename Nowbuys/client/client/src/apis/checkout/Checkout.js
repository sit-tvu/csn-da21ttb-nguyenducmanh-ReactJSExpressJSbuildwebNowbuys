
import { axiosAppJson } from '../../configs/axios.js';

import ResConfig from '../../configs/res/index.js';

export default new class CheckoutAPI { 

    async refreshCheckout(product_id_list, voucher_code, id_of_address_selected, is_using_nowbuys_coin) { 
        try {
            let res = await axiosAppJson.post(`${process.env.REACT_APP_API_CHECKOUT_REFRESH_DATA}`, {
                product_id_list: JSON.stringify(product_id_list),
                voucher_code: voucher_code,
                to_address_id: id_of_address_selected, // 0: get address default of user
                is_using_nowbuys_coin: is_using_nowbuys_coin
            });
            console.log(res);
            return {data: res.data, status: {code: res.status, text: res.statusText}};
        } catch (err) {
            console.log(err);
            return ResConfig.err(err);
        }
    }
} 