
import { VoucherModel } from '../../models/index.js'

export default new class VoucherController {

    // ----- General ----- 
    checkVoucher(req, res) { 
        let voucher_code = req.body.voucher_code?req.body.voucher_code:'';

        (async () => {
            try {
                const voucher_detail = await VoucherModel.checkVoucher(voucher_code)
                return  res.status(200).json({
                    error: false,
                    message: "Voucher code is valid",
                    voucher_detail
                })
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