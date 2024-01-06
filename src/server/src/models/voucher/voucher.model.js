
import {connectDatabaseNowbuys} from "../../databases/connect.js";

export default new class VoucherModel {

    async checkVoucher(voucher_code) {
        return await new Promise((resolve, reject) => {

            let sql = `
                SELECT 
                    *, 
                    UNIX_TIMESTAMP(start) AS start,
                    UNIX_TIMESTAMP(expired) AS expired,
                    CASE
                        WHEN NOW() < expired THEN 'valid'
                        ELSE 'invalid'
                    END AS state
                FROM voucher WHERE code = '${voucher_code}';
            `;

            connectDatabaseNowbuys.query(sql, (err, result) => {
                if (err)
                    resolve([]);
                resolve(result);
            }); 
        })
    }

    async checkVoucherById(voucher_id) {
        return await new Promise((resolve, reject) => {

            let sql = `
                SELECT * FROM ship WHERE id = ${voucher_id};
            `;

            connectDatabaseNowbuys.query(sql, (err, result) => {
                if (err)
                    resolve([]);
                resolve(result);
            });
        })
    }
}
