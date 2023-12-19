
import { AuthModel, ProductModel, ShipModel, VoucherModel } from '../../models/index.js'

export default new class CheckoutController {

    // [POST] checout/check
    async checkAll(req, res) {
        let credentials_info = (req.session && req.session.user)?req.session.user:{};
        let product_id_list = req.body.product_id_list?JSON.parse(req.body.product_id_list):[];
        let to_address_id = Number(req.body.to_address_id)?Number(req.body.to_address_id):null;
        let voucher_code = req.body.voucher_code?req.body.voucher_code:''; 
        let is_using_nowbuys_coin = req.body.is_using_nowbuys_coin?req.body.is_using_nowbuys_coin:false; 

        if (product_id_list.length > 0) {
            try {
                const user_info = await AuthModel.getProfile(credentials_info.id);
                let product_list = await ProductModel.getProductForCheckout(credentials_info.id, product_id_list);
                const ship = await ShipModel.get(credentials_info.id, to_address_id, product_id_list);
                let voucher = await VoucherModel.checkVoucher(voucher_code);
                
                
                if (voucher.length == 0) {
                    voucher = {
                        code: voucher_code,
                        state: "invalid"
                    }
                } else {
                    voucher = voucher[0];
                }
    
                // init order price
                let order_price = {
                    total_product_price: 0,
                    discount_product_price: 0,
                    discount_ship_price: 0,
                    nowbuys_coin: 0,
                    deposit_price: ship.price * 2,
                    total_payment_price: 0
                }
    
                order_price.total_product_price = product_list.reduce((total_product, product) => (total_product + product.number*product.price_after_discount), 0)
      

                if (voucher) {
                    if (voucher.for_discount == 'product') {
                        if (order_price.total_product_price>=voucher.order_price_min)
                            order_price.discount_product_price = (order_price.total_product_price/100*voucher.percent)<voucher.price_voucher_max?Math.round(order_price.total_product_price/100*voucher.percent):voucher.price_voucher_max;
                        else
                            order_price.discount_product_price = 0;
                    } 

                    if (voucher.for_discount == 'ship') {
                        if (ship.price>=voucher.order_price_min)
                            order_price.discount_ship_price = (ship.price/100*voucher.percent)<voucher.price_voucher_max?Math.round(ship.price/100*voucher.percent):voucher.price_voucher_max;
                        else
                            order_price.discount_ship_price = 0
                    }
                } 
    
    
                order_price.nowbuys_coin = is_using_nowbuys_coin?user_info.coin:0;
                order_price.total_payment_price = order_price.total_product_price - order_price.discount_product_price - order_price.discount_ship_price + ship.price - order_price.nowbuys_coin
    
                setTimeout(() => {
                    return  res.status(200).json({
                        error: false,
                        data: {
                            user_info,
                            order_price,
                            order_product: product_list,
                            ship,
                            voucher: voucher,
                        }
                    })
                }, 500)
            } catch (err) {
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
 
}