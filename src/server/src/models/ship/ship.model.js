
import {connectDatabaseNowbuys} from "../../databases/connect.js";

export default new class ShipModel {

    async get(user_id, to_address_id, product_id_list) {
        return await new Promise((resolve, reject) => {
            let sql = `
                SELECT 
                    id 
                FROM address
                WHERE address.user_id = ${user_id?user_id:0}
            `;     

            if (to_address_id!==null && (Math.round(to_address_id) - to_address_id === 0))
                sql += ` AND address.id = ${to_address_id};`;
            else
                sql += ` AND address.is_default = 1;`;
 

            connectDatabaseNowbuys.query(sql, (err, result) => { 
                if (err) reject(err) 

                // setTimeout(() => {
                    // solve price ship

                    let price_ship = Math.round(Math.random() * 200000 + Math.random() * 100000 * product_id_list.length);

                    if (result.length > 0)
                        resolve({
                            from: 'Nowbuys',
                            to_address_id: result[0].id,
                            price: price_ship
                        })
                    else
                        resolve({
                            from: 'Nowbuys',
                            to_address_id: -1, // Not found address for user
                            price: 0
                        })
                // }, 3000)
            })
        })
    }

    async create(to_address_id, price) {
        return await new Promise((resolve, reject) => {
            let sql = `
                INSERT INTO ship(name_from, to_address_id, price)
                VALUES ('Nowbuys', ${to_address_id}, ${price});
            `;

            connectDatabaseNowbuys.query(sql, (err, result) => {
                if (err)
                    reject(err);

                resolve(result.insertId);
            })
        })
    }

    async getById(ship_id) {
        return await new Promise((resolve, reject) => {
            let sql = `
                SELECT 
                    * 
                FROM 
                    ship, address 
                WHERE ship.id = ${ship_id} AND ship.to_address_id = address.id;
            `;

            connectDatabaseNowbuys.query(sql, (err, result) => {
                if (err)
                    reject(err);

                console.log(result);

                resolve(result[0]);
            })
        })
    }

}
