
import {connectDatabaseNowbuys} from "../../databases/connect.js";

export default new class VoucherModel {

    async checkVoucher(voucher_code) {
        return await new Promise((resolve, reject) => {
            if (voucher_code.trim() === 'abc')
                resolve({
                    is_valid: true,
                    code: voucher_code,
                    expired: '2023-10-30 23:59:59',
                    discount_for_product: {
                        percent: 0,
                        maximum_price: 0,
                        for_price_total_product_minimum: 0
                    },
                    discount_for_ship: {
                        percent: 60, 
                        maximum_price: 80000,
                        for_price_ship_minimum: 100000
                    }
                })
            
            if (voucher_code.trim() === '123')
                resolve({
                    is_valid: true,
                    code: voucher_code,
                    expired: '2023-10-30 23:59:59',
                    discount_for_product: {
                        percent: 5,
                        maximum_price: 700000,
                        for_price_total_product_minimum: 50000000
                    },
                    discount_for_ship: {
                        percent: 0,
                        maximum_price: 0,
                        for_price_ship_minimum: 0
                    }
                })
            
                
            resolve({
                is_valid: false,
                code: voucher_code,
                discount_for_product: {
                    percent: 0,
                    maximum_price: 0,
                    for_price_total_product_minimum: 0
                },
                discount_for_ship: {
                    percent: 0,
                    maximum_price: 0,
                    for_price_ship_minimum: 0
                }
            })
        })
    }
    
}
