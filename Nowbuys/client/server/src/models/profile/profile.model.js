
import {connectDatabaseNowbuys, connectDatabaseAddress} from "../../databases/connect.js";

export default new class ProfileModel {
    
    async getProfile(user_id) {
        return await new Promise((resolve, reject) => { 
            // For mySQL version 8.0
            let sql = `
                SELECT
                    user.*,
                    JSON_OBJECT(
                        'year', YEAR(STR_TO_DATE(user.birthday, '%Y-%m-%dT%H:%i:%s.%fZ')),
                        'month', MONTH(STR_TO_DATE(user.birthday, '%Y-%m-%dT%H:%i:%s.%fZ')),
                        'day', DAY(STR_TO_DATE(user.birthday, '%Y-%m-%dT%H:%i:%s.%fZ'))
                    ) AS birthday,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', address.id,
                            'user_id', address.user_id,
                            'consignee_name', address.consignee_name,
                            'consignee_phone', address.consignee_phone,
                            'province_id', address.province_id,
                            'province_name', address.province_name,
                            'district_id', address.district_id,
                            'district_name', address.district_name,
                            'ward_id', address.ward_id,
                            'ward_name', address.ward_name,
                            'desc_address', address.desc_address,
                            'type', address.type,
                            'is_default', address.is_default
                        )
                    ) AS address
                FROM user LEFT JOIN address ON user.id = address.user_id
                WHERE user.id = ${user_id}
                GROUP BY user.id;
            `;

            // let sql = `
            //     SELECT
            //         user.*,
            //         JSON_OBJECT(
            //             'year', YEAR(STR_TO_DATE(user.birthday, '%Y-%m-%dT%H:%i:%s.%fZ')),
            //             'month', MONTH(STR_TO_DATE(user.birthday, '%Y-%m-%dT%H:%i:%s.%fZ')),
            //             'day', DAY(STR_TO_DATE(user.birthday, '%Y-%m-%dT%H:%i:%s.%fZ'))
            //         ) AS birthday,
            //         CONCAT('[', GROUP_CONCAT(
            //             JSON_OBJECT(
            //                 'id', address.id,
            //                 'user_id', address.user_id,
            //                 'consignee_name', address.consignee_name,
            //                 'consignee_phone', address.consignee_phone,
            //                 'province_id', address.province_id,
            //                 'province_name', address.province_name,
            //                 'district_id', address.district_id,
            //                 'district_name', address.district_name,
            //                 'ward_id', address.ward_id,
            //                 'ward_name', address.ward_name,
            //                 'desc_address', address.desc_address,
            //                 'type', address.type,
            //                 'is_default', address.is_default
            //             ) ORDER BY address.id SEPARATOR ', ' ), 
            //         ']') AS address
            //     FROM user
            //     LEFT JOIN address ON user.id = address.user_id
            //     WHERE user.id = ${user_id}
            //     GROUP BY user.id;
            // `; 


            connectDatabaseNowbuys.query(sql, (err, profile) => {
                if (err) reject(err)

                // if (profile && profile[0] && profile[0].address && profile[0].address[0])
                //     if (profile[0].address[0].id === null)
                //         profile[0].address = [];
                //     else 
                //         profile[0].address = JSON.parse(profile[0].address)

                console.log(profile);

                // For mySQL version 8.0
                if (profile && profile.length === 1 && profile[0].address[0].id === null) {
                    profile[0].address = [];
                }

                setTimeout(() => {
                    resolve((profile && profile.length === 1)?profile[0]:{});
                }, [1000])
            })
        })
    } 

    async signinWithLocal(login_inf) {
        return await new Promise((resolve, reject) => {
            let sql = `SELECT * FROM user WHERE username = '${login_inf.username}'`;
            connectDatabaseNowbuys.query(sql, async (err, profile) => {
                if (err) reject(err)
                resolve((profile.length === 0 ? null : profile[0]))
            })
        })
    }

    async addUser(user_data) {
        return await new Promise((resolve, reject) => {

            let sql_check_user = `SELECT id FROM user WHERE id_firebase = '${user_data.id_firebase}' OR id_provider = '${user_data.id_provider}';`;

            connectDatabaseNowbuys.query(sql_check_user, async (err, result) => { 
                if (err) reject(err)  

                if (result.length === 0) { 
                    let sql_add_user = `
                        INSERT INTO user (id_firebase, id_provider, firstname, lastname, phone, sex, birthday, email, username, password, avatar_url, coin, is_delete)
                        VALUES ('${user_data.id_firebase}', '${user_data.id_provider}', '${user_data.firstname}', '${user_data.lastname}', '${user_data.phone}', '${user_data.sex}', '${user_data.birthday}', '${user_data.email}', '${user_data.username}', '${user_data.password}', '${user_data.avatar_url}', ${user_data.coin}, ${user_data.is_delete})
                    `;  

                    connectDatabaseNowbuys.query(sql_add_user, async (err, result_add) => {
                        if (err) reject(err)  

                        try {
                            let profile = await this.getProfile(result_add.insertId);
                            resolve(profile); 
                        } catch (e) {
                            resolve(false);
                        }
                    })
                } else {  
                    try {
                        let profile = await this.getProfile(result[0].id)
                        resolve(profile); 
                    } catch (e) {
                        resolve(false)
                    }
                }
            })  
        })
    }
    
}
