
import {connectDatabaseNowbuys} from "../../databases/connect.js";

export default new class OrderProductsModel { 

    async create(order_id, product_list) {
        return await new Promise((resolve, reject) => {

            let values = product_list.map(product => {
                return `(${order_id}, ${product.product_id}, ${product.number}, ${product.price_of_one})`;
            })

            let sql = `
                INSERT INTO order_products
                (order_id, product_id, number_product_buy, price_of_one)
                VALUES 
                ${values.join(', ')};
            `;

            connectDatabaseNowbuys.query(sql, (err, result) => {
                if (err)
                    reject(err);

                resolve(result);
            })
        })
    }

    async getProductByOrder(order_id) {
        return await new Promise((resolve, reject) => {

            let sql = `
                SELECT * 
                FROM order_products, product
                WHERE 
                    order_products.order_id = ${order_id}
                    AND order_products.product_id = product.id;
            `;


            connectDatabaseNowbuys.query(sql, (err, result) => {
                if (err)
                    reject(err);

                resolve(result);
            })
        })
    }
    
}
