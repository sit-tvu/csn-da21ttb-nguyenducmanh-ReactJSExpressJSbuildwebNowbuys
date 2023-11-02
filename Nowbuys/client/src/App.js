import React, { Fragment, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';


import DefaultLayout from './layouts/default/Default.layouts.jsx'
import routers from './router/Router'; 


// let initial_localStorage_nowbuys_suport_UX = {
//     all_products_page: {
//         location_scroll: 0,
//     },
//     phone_products_page: {
//         location_scroll: 0,
//         select: {
//             brand: null,
//             sortBy: null
//         }
//     },
//     laptop_products_page: {
//         location_scroll: 0,
//         select: {
//             brand: null,
//             sortBy: null
//         }
//     }
// }


function App() {

    // localStorage.setItem('nowbuys_suport_UX', JSON.stringify(initial_localStorage_nowbuys_suport_UX))
    // if (localStorage.getItem('nowbuys_suport_UX') == null) {
    //     localStorage.setItem('nowbuys_suport_UX', JSON.stringify(initial_localStorage_nowbuys_suport_UX))
    // } 

    if ( window.innerWidth > 0)
        return (
            <div id="app">

                <Routes>
                    {
                        routers.map((router, index) => {
                            let Layout 
                            
                            switch(router.layout) {
                                case 'singlePage':
                                    Layout = Fragment
                                break
                                default:
                                    Layout = DefaultLayout
                            }

                            let Page = router.component

                            return (
                                <Route
                                    key = {index}
                                    path = {router.path}
                                    element = {
                                        <Layout>
                                            <Page></Page>
                                        </Layout>
                                    }
                                    exact
                                />
                            )
                        })
                    }
                </Routes>
            </div>
        );
    else return (
        <div style={
                {display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
                color: '#333',
                fontSize: '1.3rem'}
            }
        >
            <span>Hãy sử dụng thiết bị khác</span>
            <span> có chiều rộng màn hình lớn hơn 1250px</span>
        </div>
    )
}

export default App;