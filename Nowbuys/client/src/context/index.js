 

import User, {userContext} from "./UserContext.js"
import Cart, {cartContext} from "./CartContext.js"
import Catelogy, {catelogyContext} from "./CatelogyContext.js"
import SupportUX, {supportUXContext} from "./SupportUX.js"

export default function GlobalUseContext( { children } ) {  

    return (
        <User>
            <Cart> 
                <Catelogy>
                    <SupportUX>
                        {children} 
                    </SupportUX>
                </Catelogy>
            </Cart>
        </User>
    )
}

export {userContext, cartContext, catelogyContext, supportUXContext} 
