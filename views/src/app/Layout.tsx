import { Outlet } from "react-router-dom";


import React from 'react'
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = () => {
    return (
        <div>
            <Header />
            <div>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout
