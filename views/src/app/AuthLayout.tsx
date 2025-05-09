import React, { useEffect, useState } from 'react';

import '../App.css';
import axios from 'axios';

import { UserInterface, } from '../utils/UserInterface';

import { Outlet } from 'react-router';
import { UserContext } from '../app/contexts/UserContext';


function AuthLayout() {

    const initialUserInterface: UserInterface = { loggedIn: false };
    const [user, setUser] = useState(initialUserInterface);

    useEffect(() => {

        const a = async () => {

            console.log('running useEffect ')

            try {
                const response = await axios.get('/api/public/checkLoggedIn');
                if (response.status === 200) {
                    const data = await response.data;

                    if (JSON.stringify(user) !== JSON.stringify(data)) {
                        //@ts-ignore  
                        setUser(data);
                    }

                    console.log(user.loggedIn)
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        a();
    }, [user])


    return (
        <div>
            <UserContext.Provider value={{ user, setUser }} >
                <Outlet />
            </UserContext.Provider>
        </div>
    )
}

export default AuthLayout;
