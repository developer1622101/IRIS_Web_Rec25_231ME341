import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import { useUser } from '../contexts/UserContext';


const Header = () => {

    const UserContextState = useUser();

    if (UserContextState && UserContextState.user.loggedIn) {

        const { user, setUser } = UserContextState;

        const logOut = async () => {
            await axios.put('/auth/logout');
            setUser({ loggedIn: false });
        }
        return (<div className='flex'>
            <NavLink to="/app" className="text-lg"> BookHive   </NavLink>
            <NavLink to="/app"> Dashboard   </NavLink>
            <NavLink to="/app/books"> Books  </NavLink>
            <NavLink to="/app/authors"> Authors </NavLink>
            <NavLink to="/app/publications"> Publications  </NavLink>
            <NavLink to="/app/profile" > <img src="/profile.svg" /></NavLink>
            <button onClick={logOut}  > Logout </button>
        </div>)
    }
    else {
        return (
            <div className='flex'>
                <NavLink to="/app" className="text-lg"> BookHive   </NavLink>
                <NavLink to="/app/books"> Books  </NavLink>
                <NavLink to="/app/authors"> Authors </NavLink>
                <NavLink to="/app/publishers"> Publications  </NavLink>
                <NavLink to="/auth/login" > Log in  </NavLink>
            </div>
        )
    }
}

export default Header; 