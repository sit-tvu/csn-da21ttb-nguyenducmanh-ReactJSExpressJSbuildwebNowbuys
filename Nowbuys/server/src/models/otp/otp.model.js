
import {connectDatabaseNowbuys} from "../../databases/connect.js";

export default new class OTPModel {

    async insertOTP(user_id, otp, type) {
        return await new Promise((resolve, reject) => {
            let sql = `
                INSERT INTO otp
                (user_id, otp, type)               
                VALUES (${user_id}, '${otp}', '${type}');
            `;     

            connectDatabaseNowbuys.query(sql, (err, result) => { 
                if (err)
                    reject(err)
                resolve(true)
            })
        })
    }

    async isExistOTP(user_id, otp, type) {
        return await new Promise((resolve, reject) => {
            let sql = `
                SELECT * 
                FROM 
                    otp
                WHERE user_id = ${user_id} AND otp = ${otp} AND type = '${type}';
            `;     

            connectDatabaseNowbuys.query(sql, (err, result) => { 
                console.log(result);
                if (err)
                    reject(err)
                resolve(result&&result.length===1?true:false)
            })
        })
    }

    async deleteOTP(user_id, otp, type) {
        return await new Promise((resolve, reject) => {
            let sql = `
                DELETE FROM 
                    otp
                WHERE user_id = ${user_id} AND type = '${type}';
            `;     

            connectDatabaseNowbuys.query(sql, (err, result) => {  
                if (err)
                    resolve(false)
                    // reject(err)
                setTimeout(() => {
                    resolve(true)
                }, 0)
            })
        })
    }
 
}
