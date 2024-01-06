
import {connectDatabaseNowbuys} from "../../databases/connect.js";

export default new class CartModel {

    async getAllProductsInCart(user_id) {
        return await new Promise((resolve, reject) => {
            let sql = `
                SELECT 
                    product.* ,
                    cart.number,
                    UNIX_TIMESTAMP(cart.updated_at) AS index_update,
                    (product.price - (product.price * product.discount_percentage / 100)) AS price_after_discount,
                    ${(user_id)?'IF(cart.product_id IS NOT NULL, true, false)':'false'} AS is_in_cart
                FROM product LEFT JOIN cart ON product.id = cart.product_id 
                WHERE cart.user_id = ${(user_id)?user_id:0}
                ORDER BY index_update DESC; 
            `;         

            connectDatabaseNowbuys.query(sql, (err, results) => { 
                if (err)
                    reject(err)
                // setTimeout(() => {
                    resolve(results?results:[])
                // }, 3000)
            })
        })
    }

    async getSomeProductsInCart(user_id, product_id_list) {
        return await new Promise((resolve, reject) => {
            let sql = `
                SELECT 
                    product.* ,
                    cart.number,
                    UNIX_TIMESTAMP(cart.updated_at) AS index_update,
                    (product.price - (product.price * product.discount_percentage / 100)) AS price_after_discount,
                    ${(user_id)?'IF(cart.product_id IS NOT NULL, true, false)':'false'} AS is_in_cart
                FROM product LEFT JOIN cart ON product.id = cart.product_id 
                WHERE 
                    cart.user_id = ${(user_id)?user_id:0}
                    AND cart.product_id IN (${product_id_list})
                ORDER BY index_update DESC; 
            `;    
             
            connectDatabaseNowbuys.query(sql, (err, results) => { 
                if (err)
                    reject(err)
                // setTimeout(() => {
                    resolve(results?results:[])
                // }, 3000)
            })
        })
    }
    
    async addProductToCart(user_id, product_id) {
        return await new Promise((resolve, reject) => {

            let sql_check_product = `
                SELECT 
                    *,
                    (product.price - (product.price * product.discount_percentage / 100)) AS price_after_discount
                FROM product WHERE product.id = ${product_id}
            `;

            console.log(sql_check_product);
            connectDatabaseNowbuys.query(sql_check_product, (err, result_check_product) => {  
                if (result_check_product.length > 0) {
                    let sql_add_product_to_cart = `INSERT INTO cart (user_id, product_id, number) VALUES (${user_id}, ${product_id}, 1)`;
                    console.log(sql_add_product_to_cart);
                    connectDatabaseNowbuys.query(sql_add_product_to_cart, (err, result_add_product_to_cart) => {  
                        setTimeout(() => {
                            if (err) {
                                reject(3)
                            }
                            console.log(result_add_product_to_cart);
                            resolve({status_code: 1, product_data: {...result_check_product[0]}})
                        }, 2000)
                    })
                } else {
                    reject(2)
                }
            })  
        }) 
        
        // code_status
        // 0: not logged in
        // 1: success
        // 2: product is not exist
        // 3: add product to cart is failed
    }
 
    async removeProductsFromCart(user_id, product_id_list) {
        return await new Promise((resolve, reject) => {
            let sql = `DELETE FROM cart WHERE user_id = ${user_id} AND product_id IN (${product_id_list})`; 

            connectDatabaseNowbuys.query(sql, (err, result) => {  
                setTimeout(() => {
                    if (err) 
                        reject(2)

                    resolve(1)
                }, 2000)
            })
        })
        
        // code_status
        // 0: not logged in
        // 1: success
        // 2: failed
    }

    async changeProductNumberInCart(user_id, product_id, number) {
        return await new Promise((resolve, reject) => {
            let sql = `UPDATE cart SET number = ${number} WHERE product_id = ${product_id} AND user_id = ${user_id}`;
            connectDatabaseNowbuys.query(sql, (err, result) => {  
                // setTimeout(() => {
                    if (err) 
                        reject(2)
                    resolve(1)
                // }, 2000)
            })
        })
        
        // code_status
        // 0: not logged in
        // 1: success
        // 2: failed
    }
}
