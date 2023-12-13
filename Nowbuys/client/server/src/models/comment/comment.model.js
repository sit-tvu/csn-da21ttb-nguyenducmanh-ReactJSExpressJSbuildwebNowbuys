
import {connectDatabaseNowbuys} from "../../databases/connect.js";

export default new class CommentModel {

    async getStatisticalCommentsForProduct(product_id) {
        return await new Promise((resolve, reject) => {
            const sql = `
                SELECT  
                    COUNT(id) AS total_num_star,
                    ROUND(AVG(star), 1) AS average_star,
                    SUM(star = 5) AS five_star,
                    SUM(star = 4) AS four_star,
                    SUM(star = 3) AS three_star,
                    SUM(star = 2) AS two_star,
                    SUM(star = 1) AS one_star
                FROM comment
                WHERE product_id = ${product_id}
                GROUP BY product_id
            `; 

            connectDatabaseNowbuys.query(sql, (err, results) => { 
                if (err) 
                    reject(err)
                resolve(results?results:[])
            })
        })
    }

    async getCommentsForProduct(product_id, cmt_per_load, offset) {
        return await new Promise((resolve, reject) => {
            const sql = `
                SELECT
                    comment.*,
                    JSON_OBJECT('id', user.id, 'avatar_url', user.avatar_url , 'firstname', user.firstname, 'lastname', user.lastname) AS user_info,
                    (SELECT COUNT(id) FROM comment WHERE comment.product_id = ${product_id}) AS total_comments
                FROM
                    comment
                INNER JOIN user ON comment.user_id = user.id 
                WHERE comment.product_id = ${product_id}
                ORDER BY comment.star DESC
                LIMIT ${cmt_per_load} OFFSET ${offset};
            `;

            connectDatabaseNowbuys.query(sql, (err, results) => { 
                // parse json from query 
                let modified_results = results.map(item => { 
                    // return {...item, user_info: JSON.parse(item.user_info)}
                    return {...item, user_info: item.user_info}
                })

                if (err) reject(err)
                resolve(modified_results)
            })
        })
    }
     
}
