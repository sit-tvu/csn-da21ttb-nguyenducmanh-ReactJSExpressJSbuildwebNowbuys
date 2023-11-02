
import authRouter from './auth/auth.router.js'
import profileRouter from './profile/profile.router.js'
import productRouter from './products/products.router.js'
import generalRouter from './general/general.router.js'
import cartRouter from './cart/cart.router.js'
import commentRouter from './comment/comment.router.js'
import voucherRouter from './voucher/voucher.router.js'
import shipRouter from './ship/ship.router.js'
import addressRouter from './address/address.router.js'
import checkoutRouter from './checkout/checkout.router.js'
import verificationRouter from './verification/verification.router.js'
import uploadRouter from './upload/upload.router.js'

function router(app) {
    app.use('/api/auth', authRouter)
    app.use('/api/profile', profileRouter)
    app.use('/api/products', productRouter)
    app.use('/api/general', generalRouter)
    app.use('/api/cart', cartRouter)
    app.use('/api/comment', commentRouter)
    app.use('/api/voucher', voucherRouter)
    app.use('/api/ship', shipRouter)
    app.use('/api/address', addressRouter)

    app.use('/api/checkout', checkoutRouter)

    app.use('/api/verification', verificationRouter)


    app.use('/api/upload', uploadRouter)
}

export default router