import { Outlet } from "react-router-dom";


import React, { useEffect } from 'react'
import Header from "./components/Header";
import Footer from "./components/Footer";

import { decrypt } from "../utils/encrypt";

import { UserProvider } from "./contexts/UserContext";


import { Role } from "@prisma/client";
import { isTSInterface } from "../utils/isTSInterface";

import { useUser } from "./contexts/UserContext";

import { UserInterface } from "../utils/UserInterface";

import { authHeaderCheck } from "../utils/authHeaderCheck";





const Layout = () => {


    const UserContextState = useUser();

    let user;
    let setUser;

    if (UserContextState) {
        user = UserContextState.user;
        setUser = UserContextState.setUser;
    }







    useEffect(() => {

        const isUserLogged = authHeaderCheck();

        if (isUserLogged) {


        }
    }, [])







    return (
        <UserProvider >
            <Header />
            <div>
                <Outlet />
            </div>
            <Footer />
        </UserProvider>

    )
}

export default Layout
