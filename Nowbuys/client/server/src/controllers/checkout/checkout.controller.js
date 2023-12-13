
import { AuthModel, CartModel, ShipModel, VoucherModel } from '../../models/index.js'

export default new class CheckoutController {

    // [POST] checout/check
    checkAll(req, res) {
        let credentials_info = (req.session && req.session.user)?req.session.user:{};
        let product_id_list = req.body.product_id_list?JSON.parse(req.body.product_id_list):[];
        let to_address_id = Number(req.body.to_address_id)?Number(req.body.to_address_id):null;
        let voucher_code = req.body.voucher_code?req.body.voucher_code:''; 
        let is_using_nowbuys_coin = req.body.is_using_nowbuys_coin?req.body.is_using_nowbuys_coin:false; 

        (async () => {
            try {
                const user_info = await AuthModel.getProfile(credentials_info.id)
                const product_list = await CartModel.getSomeProductsInCart(credentials_info.id, product_id_list)
                const ship = await ShipModel.get(credentials_info.id, to_address_id, product_id_list)
                const voucher = await VoucherModel.checkVoucher(voucher_code)

                // init order price
                let order_price = {
                    total_product_price: 0,
                    discount_product_price: 0,
                    discount_ship_price: 0,
                    nowbuys_coin: 0,
                    total_payment_price: 0
                }

                order_price.total_product_price = product_list.reduce((total_product, product) => (total_product + product.number*product.price_after_discount), 0)

                // Solve order price follow voucher 
                if (voucher.discount_for_product.percent !== 0) {
                    if (order_price.total_product_price>=voucher.discount_for_product.for_price_total_product_minimum)
                        order_price.discount_product_price = (order_price.total_product_price/100*voucher.discount_for_product.percent)<voucher.discount_for_product.maximum_price?Math.round(order_price.total_product_price/100*voucher.discount_for_product.percent):voucher.discount_for_product.maximum_price;
                    else
                        order_price.discount_product_price = 0
                }
                
                if (voucher.discount_for_ship.percent !== 0) {
                    if (ship.price>=voucher.discount_for_ship.for_price_ship_minimum)
                        order_price.discount_ship_price = (ship.price/100*voucher.discount_for_ship.percent)<voucher.discount_for_ship.maximum_price?Math.round(ship.price/100*voucher.discount_for_ship.percent):voucher.discount_for_ship.maximum_price;
                    else
                        order_price.discount_ship_price = 0
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
                            voucher,
                        }
                    })
                }, 2000)
            } catch (err) {
                console.log(err)
                return  res.status(500).json({ 
                    error: true, 
                    message: "Error",
                })
            }
        })() 
    }
 
}