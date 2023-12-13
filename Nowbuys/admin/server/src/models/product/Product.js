
import {connectDatabaseNowbuys} from "../../databases/connect.js";

export default new class Product {

    async getColumnName(table_name) {
        // return await new Promise((resolve, reject) => {
        //     let sql = `SHOW COLUMNS FROM ${table_name} WHERE Field NOT IN ('id', 'created_at', 'updated_at');`;  

        //     connectDatabaseNowbuys.query(sql, (err, results) => { 
        //         if (err)
        //             reject(err)
                
        //         // results = results.map(item => {
        //         //     return item.Field
        //         // })
                    
        //         resolve(results?results:[])
        //     })
        // })
    }

    async getAll(user_id) {
        return await new Promise((resolve, reject) => {
            let sql = `SELECT * FROM product;`; 
            
            connectDatabaseNowbuys.query(sql, (err, results) => { 
                if (err)
                    reject(err)
                resolve(results?results:[])
            })
        })
    }

    async changeProductBase(product_id, data) {
        return await new Promise((resolve, reject) => {

            let properties_list_str = [];

            for (let properties in data) {

                if (data[properties] !== null) {
                    if (typeof data[properties] === 'number') {
                        properties_list_str.push(`${properties}= ${data[properties]}`);
                    } else {
                        properties_list_str.push(`${properties}= '${data[properties]}'`);
                    }
                }
            }  

            let sql =   `UPDATE 
                            product
                        SET 
                            ${properties_list_str.join(', ')} 
                        WHERE id = ${product_id};
            `; 
            
            connectDatabaseNowbuys.query(sql, (err, results) => { 
                if (err)
                    reject(err);
                resolve(results?results:[]);
            })
        })
    }

    async changeProductDetails(product_id, data) {
        return await new Promise((resolve, reject) => {

            let properties_list_str = [];

            for (let properties in data) {

                if (data[properties] !== null) {
                    if (typeof data[properties] === 'number') {
                        properties_list_str.push(`${properties}= ${data[properties]}`);
                    } else {
                        properties_list_str.push(`${properties}= '${data[properties]}'`);
                    }
                }
            }

            let sql =   `UPDATE 
                            product_detail
                        SET 
                            ${properties_list_str.join(', ')} 
                        WHERE product_id = ${product_id};
            `; 
            
            connectDatabaseNowbuys.query(sql, (err, results) => { 
                if (err)
                    reject(err)
                resolve(results?results:[])
            })
        })
    }

}