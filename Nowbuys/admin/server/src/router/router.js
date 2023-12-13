
import productRouter from './product/product.js';
// import orderRouter from './order/order.js';

function router(app) {
    app.use('/api/admin/product', productRouter);
    // app.use('/api/admin/order', orderRouter); 
}

export default router