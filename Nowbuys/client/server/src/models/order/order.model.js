
import {connectDatabaseNowbuys} from "../../databases/connect.js";

export default new class VoucherModel {

    async getByState(user_id, state) {
        return await new Promise((resolve, reject) => {
            let sql = `
                SELECT 
                    * 
                FROM 
                    orders 
                WHERE 
                    user_id = ${user_id} ${state!='all' ? `AND state = '${state}'`:''}
                ORDER BY id DESC;
            `;

            connectDatabaseNowbuys.query(sql, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            })
        })
    }


    async create(user_id, ship_id, voucher_id, total_product_price, user_coin, total_payment_price, payment_method, state) {
        return await new Promise((resolve, reject) => {

            let sql = `
                INSERT INTO orders
                (user_id, ship_id, voucher_id, total_product_price, nowbuys_coin, total_payment_price, payment_method, state)
                VALUES (${user_id}, ${ship_id}, ${voucher_id}, ${total_product_price}, ${user_coin}, ${total_payment_price}, '${payment_method}', '${state}');
            `;
            
            connectDatabaseNowbuys.query(sql, (err, result) => {
                if (err)
                    reject(err);

                resolve(result.insertId);
            })
        })
    }

    
    
}
