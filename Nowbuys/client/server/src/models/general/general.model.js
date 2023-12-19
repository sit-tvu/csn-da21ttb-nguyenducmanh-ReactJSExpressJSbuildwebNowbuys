
import {connectDatabaseNowbuys} from "../../databases/connect.js";

export default new class CommentModel {

    async getBrands(catelogy_id) {
        return await new Promise((resolve, reject) => {
            let sql = `SELECT brand.* FROM brand LEFT JOIN brand_catelogy ON brand.id = brand_catelogy.brand_id WHERE brand_catelogy.catelogy_id = ${catelogy_id}`;

            connectDatabaseNowbuys.query(sql, (err, results) => { 
                if (err) reject(err)
                resolve(results?results:[])
            })
        })
    } 
    
    async getCatelogys(catelogy_id) {
        return await new Promise((resolve, reject) => {
            let sql = `SELECT * FROM catelogy`;

            connectDatabaseNowbuys.query(sql, (err, results) => { 
                // setTimeout(() => {
                    if (err) reject(err)
                    resolve(results?results:[])
                // }, 2000)
            })
        })
    } 
     
}
