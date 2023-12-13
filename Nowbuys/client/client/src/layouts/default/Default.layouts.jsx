
import Header from "../../Components/header/Header.jsx"
import Footer from "../../Components/footer/Footer.jsx"
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