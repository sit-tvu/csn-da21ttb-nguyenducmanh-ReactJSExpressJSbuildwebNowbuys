
import {connectDatabaseNowbuys ,connectDatabaseAddress} from "../../databases/connect.js";

export default new class AddressModel {

    async getAddressForUser(user_id) {
        return await new Promise((resolve, reject) => { 
            let sql = `
                SELECT * FROM address WHERE user_id = ${user_id};
            `;

            connectDatabaseNowbuys.query(sql, (err, result) => {
                if (err) reject(err);
                setTimeout(() => {
                    resolve(result);
                }, [1000])
            }) 
        })
    }

    async addAddress(user_id, address) {
        return await new Promise((resolve, reject) => {

            console.log(address);

            if (address.is_default === 1) {
                let sql_update = `
                    UPDATE address
                    SET is_default = 0
                    WHERE user_id = ${user_id};
                `;
                connectDatabaseNowbuys.query(sql_update, (err, result) => {
                    if (err) reject(err);
                    
                    let sql_insert = `
                        INSERT INTO address
                        (user_id, consignee_name, consignee_phone, province_id, province_name, district_id, district_name, ward_id, ward_name, desc_address, type, is_default)
                        VALUES (${user_id}, '${address.consignee_name}', '${address.consignee_phone}', ${address.province_id}, '${address.province_name}', ${address.district_id}, '${address.district_name}', ${address.ward_id}, '${address.ward_name}', '${address.desc_address}', ${address.type}, ${address.is_default});
                    `;

                    connectDatabaseNowbuys.query(sql_insert, (err, result) => {
                        if (err) reject(err);
                        resolve(true);
                    })
                }) 
            } else {
                let sql_insert = `
                    INSERT INTO address
                    (user_id, consignee_name, consignee_phone, province_id, province_name, district_id, district_name, ward_id, ward_name, desc_address, type, is_default)
                    VALUES (${user_id}, '${address.consignee_name}', '${address.consignee_phone}', ${address.province_id}, '${address.province_name}', ${address.district_id}, '${address.district_name}', ${address.ward_id}, '${address.ward_name}', '${address.desc_address}', ${address.type}, ${address.is_default});
                `;

                connectDatabaseNowbuys.query(sql_insert, (err, result) => {
                    if (err) reject(err);
                    resolve(true);
                })
            }

        })
    }
    
    async updateAddress(user_id, address) {
        return await new Promise((resolve, reject) => {

            if (address.is_default === 1) {
                let sql_update = `
                    UPDATE address
                    SET is_default = 0
                    WHERE user_id = ${user_id};
                `;
                connectDatabaseNowbuys.query(sql_update, (err, result) => {
                    if (err) reject(err);
                    
                    let sql_update = `
                        UPDATE address  
                        SET user_id=${user_id}, consignee_name='${address.consignee_name}', consignee_phone='${address.consignee_phone}', province_id=${address.province_id}, province_name='${address.province_name}', district_id=${address.district_id}, district_name='${address.district_name}', ward_id=${address.ward_id}, ward_name='${address.ward_name}', desc_address='${address.desc_address}', type=${address.type}, is_default=${address.is_default}
                        WHERE id=${address.id_address_update}
                    `;

                    console.log(sql_update);

                    connectDatabaseNowbuys.query(sql_update, (err, result) => {
                        if (err) reject(err);
                        resolve(true);
                    })
                }) 
            } else {
                let sql_update = `
                    UPDATE address  
                    SET user_id=${user_id}, consignee_name='${address.consignee_name}', consignee_phone='${address.consignee_phone}', province_id=${address.province_id}, province_name='${address.province_name}', district_id=${address.district_id}, district_name='${address.district_name}', ward_id=${address.ward_id}, ward_name='${address.ward_name}', desc_address='${address.desc_address}', type=${address.type}, is_default=${address.is_default}
                    WHERE id=${address.id_address_update}
                `;

                console.log(sql_update);

                connectDatabaseNowbuys.query(sql_update, (err, result) => {
                    if (err) reject(err);
                    resolve(true);
                })
            }

        })
    }

    async searchAddress(search) {
        return await new Promise((resolve, reject) => {

            let sql = `SELECT 
                            ward.id AS ward_id, 
                            ward.name AS ward_name, 
                            district.id AS district_id,  
                            district.name AS district_name,  
                            province.id AS province_id,  
                            province.name AS province_name  
                        FROM province, district, ward 
                        WHERE province.id = district.province_id 
                        AND district.id = ward.district_id 
                `;

            let search_list = search.split(" ");
            
            let sql_extend_1 = search_list.map(search => {
                return ` AND LOWER(province.name) COLLATE utf8mb4_bin LIKE LOWER('%${search}%')`;
            })
            let sql_extend_2 = search_list.map(search => {
                return ` AND LOWER(district.name) COLLATE utf8mb4_bin LIKE LOWER('%${search}%')`;
            })
            let sql_extend_3 = search_list.map(search => {
                return ` AND LOWER(ward.name) COLLATE utf8mb4_bin LIKE LOWER('%${search}%')`;
            })
            let sql_1 = sql + sql_extend_1.join(' ') + ';';
            let sql_2 = sql + sql_extend_2.join(' ') + ';';
            let sql_3 = sql + sql_extend_3.join(' ') + ';'; 

            Promise.all([
                new Promise((resolve, reject) => {
                    connectDatabaseAddress.query(sql_1, (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    });
                }),
                new Promise((resolve, reject) => {
                    connectDatabaseAddress.query(sql_2, (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    });
                }),
                new Promise((resolve, reject) => {
                    connectDatabaseAddress.query(sql_3, (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    });
                })
            ])
            .then(([result_province, result_district, result_wards]) => {
                setTimeout(() => {
                    resolve({ for_provinces: result_province, for_districts: result_district, for_wards: result_wards });
                }, 500);
            })
            .catch(err => {
                reject(err);
            });

        })
    }

    async getAllProvinces() {
        return await new Promise((resolve, reject) => {

            let sql = `SELECT * FROM province`; 

            connectDatabaseAddress.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result);
            }); 
        })
    }

    async getDistrictsDependent(province_id) {
        return await new Promise((resolve, reject) => {

            let sql = `SELECT * FROM district WHERE province_id = ${province_id}`; 

            connectDatabaseAddress.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result);
            }); 
        })
    }

    async getWardsDependent(district_id) {
        return await new Promise((resolve, reject) => {

            let sql = `SELECT * FROM ward WHERE district_id = ${district_id}`; 

            connectDatabaseAddress.query(sql, (err, result) => {
                if (err) reject(err);
                resolve(result);
            }); 
        })
    }
    
}
