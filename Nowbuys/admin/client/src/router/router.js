

import { Home, Signin, Details } from '../pages/index.js';
import { Default, Single } from '../layouts/index.js';

const routers = [
    {path: '/', component: Home, layout: Default},
    {path: '/sign-in', component: Signin, layout: Single},
    {path: '/product/:slug?', component: Details, layout: Single}
]

export default routers