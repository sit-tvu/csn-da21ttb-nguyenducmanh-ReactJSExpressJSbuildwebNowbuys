
import { AuthModel, OrderModel, OrderProductsModel, ProductModel, VoucherModel } from '../../models/index.js'
import shipModel from '../../models/ship/ship.model.js';

export default new class OrderController {

    // [POST] /order/order
    async order(req, res) {
        let credentials_info = (req.session && req.session.user)?req.session.user:{};
        let product_list = req.body.product_list?JSON.parse(req.body.product_list):[];
        let ship = req.body.ship?JSON.parse(req.body.ship):null;
        let voucher_id = Number(req.body.voucher_id)?Number(req.body.voucher_id):null;
        let is_using_nowbuys_coin = req.body.is_using_nowbuys_coin?req.body.is_using_nowbuys_coin:false; 
        let order_price = req.body.order_price?req.body.order_price:''; 

        if (product_list.length>0 && ship.to_address_id && order_price.total_payment_price) {
            try { 

                let ship_id = await shipModel.create(ship.to_address_id, ship.price);

                let user_coin = 0;
                if (is_using_nowbuys_coin) {
                    let res = await AuthModel.getProfile(credentials_info.id);
                    user_coin = res.coin;
                }
                
                let order_id = await OrderModel.create(credentials_info.id, ship_id, voucher_id, order_price.total_product_price, user_coin, order_price.total_payment_price, 'on_delivery', 'processing');

                await AuthModel.delCoin(credentials_info.id);

                await OrderProductsModel.create(order_id, product_list);

                setTimeout(() => {
                    return  res.status(200).json({
                        error: false,
                        message: 'Order is successfully'
                    })
                }, 500)
            } catch (err) {
                console.log(err);
                return  res.status(500).json({ 
                    error: true, 
                    message: "Error",
                })
            }
        } else {
            return res.status(400).json({
                error: true,
                message: 'request is invalid' 
            })
        }
    }

    // [POST] /order/get
    async getByState(req, res) { 
        let credentials_info = (req.session && req.session.user)?req.session.user:{};
        let state = (req.body.state && req.body.state)?req.body.state:'all';

        try {
            const order = await OrderModel.getByState(credentials_info.id, state);
            const products_list = [];

            
            for (let i in order) {
                order[i].ship = await shipModel.getById(order[i].ship_id);

                if (order[i].voucher_id)
                    order[i].voucher = await VoucherModel.checkVoucherById(order[i].voucher_id)[0];
                else 
                    order[i].voucher = null;

                order[i].product_list = await OrderProductsModel.getProductByOrder(order[i].id);
            } 

            return  res.status(200).json({
                error: false,
                message: "order by state is success",
                data: order
            })

        } catch (err) {
            console.log("[POST] /order/processing/get " + err);
            return  res.status(500).json({ 
                error: true, 
                message: "Error",
            })
        }
    }
 
}