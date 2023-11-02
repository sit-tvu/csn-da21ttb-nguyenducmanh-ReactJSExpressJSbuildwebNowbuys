
import { CommentModel } from "../../models/index.js";

export default new class CommentController {

    // [POST] /comment/statistical-comments/get
    getStatisticalCommentsForProduct(req, res) { 
        let product_id = req.query.product_id?req.query.product_id:0;

        (async () => {
            try {
                const result = await CommentModel.getStatisticalCommentsForProduct(product_id)

                return res.json({
                    error: false,
                    message: 'Success',
                    statistical: result[0] || {
                        total_num_star: 0,
                        average_star: 0,
                        five_star: 0,
                        four_star: 0,
                        three_star: 0,
                        two_star: 0,
                        one_star: 0
                    }
                })
            } catch (err) {
                console.log('CommentController.getStatisticalCommentsForProduct : '+err)
                return  res.status(500).json({
                    error: true,
                    message: 'Error!',
                    statistical: {}
                })
            }
        })() 
    }

    // [POST] /comment/comments/get
    getCommentsForProduct(req, res) {

        let product_id = req.query.product_id?req.query.product_id:0;

        const paginate = Number(req.query.paginate) || 1; // 
        const cmt_per_load = Number(req.query.cmt_per_load) || 4; // Number of comments per load or show more, default is 4 comments
        const offset = (paginate - 1) * cmt_per_load;   
 
        (async () => {
            try { 
                const results = await CommentModel.getCommentsForProduct(product_id, cmt_per_load, offset)  
                
                if (results && results.length > 0) {
                    return  res.json({
                        error: false,
                        message: 'Success!',
                        next_paginate: (offset+cmt_per_load<results[0].total_comments)?(paginate+1):0,
                        current_paginate: paginate,
                        prev_paginate: paginate - 1,
                        cmt_per_paginate: cmt_per_load,
                        total_comments: results[0].total_comments, 
                        comment_list: results
                    })
                } else {
                    return  res.json({
                        error: true,
                        message: 'Request is failed!',
                        next_paginate: 0,
                        current_paginate: 0,
                        prev_paginate: 0,
                        cmt_per_paginate: 0,
                        total_comments: 0,
                        comment_list: []
                    })
                }

            } catch (code_status) {
                return  res.status(500).json({
                    error: true,
                    message: 'Error!',
                    next_paginate: 0,
                    current_paginate: 0,
                    prev_paginate: 0,
                    cmt_per_paginate: 0,
                    total_comments: 0,
                    comment_list: []
                })
            }
        })() 
    }
}

// This queries are not used for this project but for research.
// const sql = `
//     WITH statistical_star AS (
//         SELECT 
//             product_id,
//             COUNT(id) AS total_star,
//             SUM(star = 5) AS five_star,
//             SUM(star = 4) AS four_star,
//             SUM(star = 3) AS three_star,
//             SUM(star = 2) AS two_star,
//             SUM(star = 1) AS one_star
//         FROM comment
//         WHERE product_id = ${req.query.product_id}
//         GROUP BY product_id
//     )

//     SELECT 
//         JSON_OBJECT('id', user.id, 'avatar_url', user.avatar_url , 'firstname', user.firstname, 'lastname', user.lastname) AS user_info,
//         comment.id, comment.user_id, comment.star, comment.comment, statistical_star.*
//     FROM 
//         comment JOIN statistical_star ON comment.product_id = statistical_star.product_id
//         LEFT JOIN user ON comment.user_id = user.id
//     WHERE comment.product_id = ${req.query.product_id}
//     LIMIT ${cmt_per_load} OFFSET ${offset};
// `; 