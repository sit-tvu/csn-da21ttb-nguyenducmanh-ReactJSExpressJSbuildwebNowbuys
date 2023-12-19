
import {connectDatabaseNowbuys} from "../../databases/connect.js";

export default new class ProductModel {

    async searchProducts(search, product_per_page) {
        return await new Promise((resolve, reject) => {  

            let sql = `
                SELECT 
                    product.*,
                    (product.price - (product.price * product.discount_percentage / 100)) AS price_after_discount
                FROM product
                WHERE (
                    CASE 
                        WHEN LOWER(product.full_name) = '${search.toLowerCase()}' THEN 1      
                        WHEN LOWER(product.full_name) LIKE '${search.toLowerCase()}%' THEN 2  
                        WHEN LOWER(product.full_name) LIKE '%${search.toLowerCase()}' THEN 3     
                        WHEN LOWER(product.full_name) LIKE '%${search.toLowerCase()}%' THEN 4
                        ${ search.split(' ').reduce((contain, item, i) => { return contain + ` WHEN LOWER(product.full_name) LIKE '${item.toLowerCase()} %' THEN ${5+i} `}, '') }
                        ${ search.split(' ').reduce((contain, item, i) => { return contain + ` WHEN LOWER(product.full_name) LIKE '% ${item.toLowerCase()} %' THEN ${500+i} `}, '') }
                        ELSE 99999
                    END
                ) <> 99999
                ORDER BY (
                        CASE 
                            WHEN LOWER(product.full_name) = '${search.toLowerCase()}' THEN 1      
                            WHEN LOWER(product.full_name) LIKE '${search.toLowerCase()}%' THEN 2  
                            WHEN LOWER(product.full_name) LIKE '%${search.toLowerCase()}' THEN 3     
                            WHEN LOWER(product.full_name) LIKE '%${search.toLowerCase()}%' THEN 4
                            ${ search.split(' ').reduce((contain, item, i) => { return contain + ` WHEN LOWER(product.full_name) LIKE '${item.toLowerCase()} %' THEN ${5+i} `}, '') }
                            ${ search.split(' ').reduce((contain, item, i) => { return contain + ` WHEN LOWER(product.full_name) LIKE '% ${item.toLowerCase()} %' THEN ${500+i} `}, '') }
                            ELSE 99999
                        END 
                    )
                LIMIT ${product_per_page} OFFSET 0;
            `;   

            connectDatabaseNowbuys.query(sql, (err, product_list) => { 
                // setTimeout(() => {
                    if (err) reject(err)
                    resolve(product_list?product_list:[])
                // }, 3000)
            })
        })
    } 

    async getProductsMostSearched(product_per_page) {
        return await new Promise((resolve, reject) => {
            let sql = `
                SELECT 
                    product.*,
                    (product.price - (product.price * product.discount_percentage / 100)) AS price_after_discount
                FROM product 
                ORDER BY RAND()
                LIMIT ${product_per_page} OFFSET 0;
            `; 

            connectDatabaseNowbuys.query(sql, (err, results) => { 
                // setTimeout(() => {
                    if (err) reject(err)
                    resolve(results?results:[])
                // }, 3000)
            })
        })
    }  

    async getProductShowInHomePage(catelogy_id) {
        return await new Promise((resolve, reject) => {
            // let sql = `
            //     SELECT
            //         product.*,
            //         (product.price - (product.price * product.discount_percentage / 100)) AS price_after_discount,
            //         ${user_id?'IF(cart.product_id IS NOT NULL, true, false)':'false'} AS is_in_cart
            //     FROM product LEFT JOIN cart ON product.id = cart.product_id ${user_id?`AND cart.user_id = ${user_id}`:''} 
            //     WHERE product.catelogy_id = ${catelogy_id} AND product.is_show_home = true;
            // `; 
            let sql = `
                SELECT
                    product.*,
                    (product.price - (product.price * product.discount_percentage / 100)) AS price_after_discount,
                    COUNT(comment.id) AS total_num_star,
                    ROUND(AVG(comment.star), 1) AS average_star
                FROM 
                    product LEFT JOIN comment ON product.id = comment.product_id
                WHERE 
                    product.catelogy_id = ${catelogy_id} AND product.is_show_home = true
                GROUP BY product.id;
            `; 

            connectDatabaseNowbuys.query(sql, (err, results) => { 
                // setTimeout(() => {
                    if (err) reject(err)
                    resolve(results?results:[])
                // }, 3000)
            })
        })
    } 
    
    async getProductFollowCatelogy(catelogy_id, brand_id, sort_by) {
        return await new Promise((resolve, reject) => {
            // let sql = `
            //     SELECT 
            //         product.*, 
            //         ${user_id?'IF(cart.product_id IS NOT NULL, true, false)':'false'} AS is_in_cart,
            //         (product.price - (product.price * product.discount_percentage / 100)) AS price_after_discount
            //     FROM product ${user_id?'LEFT JOIN cart ON product.id = cart.product_id':''}
            // `;

            let sql = `
                SELECT
                    product.*,
                    (product.price - (product.price * product.discount_percentage / 100)) AS price_after_discount,
                    COUNT(comment.id) AS total_num_star,
                    ROUND(AVG(comment.star), 1) AS average_star
                FROM 
                    product LEFT JOIN comment ON product.id = comment.product_id
            `; 

            sql += Number(catelogy_id)?` WHERE product.catelogy_id = ${Number(catelogy_id)}`:'';
            sql += Number(brand_id)?` AND product.brand_id = ${Number(brand_id)}`:'';

            sql += ` GROUP BY product.id`;

            if (sort_by === 'random') {
                sql +=  ' ORDER BY RAND()';
            } else {
                if (sort_by === 'discount')
                    sql += ' ORDER BY (product.price * product.discount_percentage / 100) DESC';

                if (sort_by !== 'default' && sort_by !== 'discount')
                    sql += sort_by==='increase'?' ORDER BY price_after_discount ASC': ' ORDER BY price_after_discount DESC';
            } 

            connectDatabaseNowbuys.query(sql, (err, results) => {
                setTimeout(() => {
                    if (err) reject(err)
                    resolve(results?results:[])
                }, 500)
            })
        })
    } 
     
    async getDetailsProduct(user_id, slug_product) {
        return await new Promise((resolve, reject) => {
            let sql = `
                SELECT 
                    product_detail.*,
                    product.name_display,
                    product.full_name,
                    product.thumbnail_url,
                    product.price,
                    product.discount_percentage,
                    (product.price - (product.price * product.discount_percentage / 100)) AS price_after_discount,
                    ${user_id?`IF(EXISTS (SELECT * FROM product LEFT JOIN cart ON product.id = cart.product_id WHERE cart.user_id = ${user_id} AND product.slug = '${slug_product}'), true, false)`:'false'} AS is_in_cart
                FROM product, product_detail WHERE product_detail.product_id = product.id AND product.slug = '${slug_product}';
            `;
            connectDatabaseNowbuys.query(sql, (err, results) => { 
                // setTimeout(() => {
                    if (err) reject(err);
                    resolve(results?results:[]);
                // }, 2000)
            })
        })
    } 

    async getProductForCheckout(user_id, product_id_list) {
        return await new Promise((resolve, reject) => {
            let sql = `
                SELECT 
                    product.*,
                    cart.number,
                    UNIX_TIMESTAMP(cart.updated_at) AS index_update,
                    (product.price - (product.price * product.discount_percentage / 100)) AS price_after_discount,
                    ${(user_id)?'IF(cart.product_id IS NOT NULL, true, false)':'false'} AS is_in_cart,
                    IF(cart.number IS NOT NULL, cart.number, 1) AS number
                FROM product LEFT JOIN cart ON product.id = cart.product_id AND cart.user_id = ${(user_id)?user_id:0}
                WHERE  
                    product.id IN (${product_id_list})
                ORDER BY index_update DESC; 
            `; 

            connectDatabaseNowbuys.query(sql, (err, results) => { 
                // setTimeout(() => {
                    if (err) reject(err);
                    resolve(results?results:[]);
                // }, 2000)
            })
        })
    }
     
}
