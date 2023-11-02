
import Header from "../../Components/Header/Header.jsx"
import Footer from "../../Components/Footer/Footer.jsx"
import { Fragment } from "react"
import { ScrollToTop } from "../../Components/index.js"

function DefaultLayout( {children} ) {
    return (
        <Fragment>
            <ScrollToTop />
            <Header></Header>
            {children}
            <Footer></Footer>
        </Fragment>
    )
}

export default DefaultLayout