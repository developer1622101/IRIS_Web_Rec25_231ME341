import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import Header from "./components/Header";
import Footer from "./components/Footer";


const Layout = () => {



    return (
        <>
            <Header />
            <div className="AppContainer">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Layout
