import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import Header from "./components/Header";
import Footer from "./components/Footer";
import { UserContext } from "./contexts/UserContext"
import { useUser } from "./contexts/UserContext";
import { authHeaderCheck } from "../utils/authHeaderCheck";

import { UserInterface } from "../utils/UserInterface";

const Layout = () => {

    const initialUserInterface: UserInterface = { loggedIn: false };
    const [user, setUser] = useState(initialUserInterface);

    useEffect(() => {
        const a = async () => {
            const isUserLogged = await authHeaderCheck();
            if (isUserLogged && JSON.stringify(isUserLogged) !== JSON.stringify(user)) {
                setUser(isUserLogged);
            }
        }
        a();
    }, [user])



    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Header />
            <div>
                <Outlet />
            </div>
            <Footer />
        </UserContext.Provider>
    )
}

export default Layout
