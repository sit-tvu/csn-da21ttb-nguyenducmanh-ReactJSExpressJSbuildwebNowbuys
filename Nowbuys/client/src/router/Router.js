
import { AllProducts, Products, Signin, Signup, Cart, Checkout, Order, Details, Search, NotFound404, Account } from '../pages/index.js' 

const routers = [
    {path: '/', component: AllProducts, layout: 'default'},
    {path: '/products-catelogy', component: Products, layout: 'default'},
    {path: '/signin', component: Signin, layout: 'singlePage'},
    {path: '/signup', component: Signup, layout: 'singlePage'}, 
    {path: '/cart', component: Cart, layout: 'default'},
    {path: '/checkout/:payment_data?', component: Checkout, layout: 'singlePage'},
    {path: '/order', component: Order, layout: 'default'},
    {path: '/product/details/:slug?', component: Details, layout: 'default'},
    {path: '/search/:search?', component: Search, layout: 'default'},
    {path: '/user/account', component: Account, layout: 'default'},
    {path: '*', component: NotFound404, layout: 'singlePage'},
]

export default routers
