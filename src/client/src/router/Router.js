
import { AllProducts, Products, Signin, Signup, Cart, 
    Checkout, Order, Details, Search, NotFound404, Account } from '../pages/index.js';

import { DefaultLayout, SingleLayout } from '../layouts/layouts.js';

const routers = [
    {path: '/', component: AllProducts, layout: DefaultLayout},
    {path: '/products-catelogy', component: Products, layout: DefaultLayout},
    {path: '/signin', component: Signin, layout: SingleLayout},
    {path: '/signup', component: Signup, layout: SingleLayout}, 
    {path: '/cart', component: Cart, layout: DefaultLayout},
    {path: '/checkout/:payment_data?', component: Checkout, layout: SingleLayout},
    {path: '/order', component: Order, layout: DefaultLayout},
    {path: '/product/details/:slug?', component: Details, layout: DefaultLayout},
    {path: '/search/:search?', component: Search, layout: DefaultLayout},
    {path: '/user/account', component: Account, layout: DefaultLayout},
    {path: '*', component: NotFound404, layout: SingleLayout},
];

export default routers;

