import React, { useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { useUser } from '../contexts/UserContext';
import { authHeaderCheck } from '../../utils/authHeaderCheck';




const Header = () => {


    const UserContextState = useUser();

    const { user, setUser } = UserContextState;

    const loggedIn = user.loggedIn;

    let email;
    let role;

    if (loggedIn) {
        email = user.email;
        role = user.role;
    }


    useEffect(() => {

        const loggedInCheck = authHeaderCheck();  // returns false  or the object containing logged in info. 



    }, [user]);


    const logOut = async () => {

        await axios.put('/auth/logout');

        setUser({ loggedIn: false });

    }




    if (loggedIn) {
        return (<div className='flex'>

            <NavLink to="/" className="text-lg"> BookHive   </NavLink>
            <NavLink to="/"> Dashboard   </NavLink>
            <NavLink to="/books"> Books  </NavLink>
            <NavLink to="/authors"> Authors </NavLink>
            <NavLink to="/publications"> Publications  </NavLink>
            <div>
                <input placeholder='search' />
            </div>
            <NavLink to="/profile" > <img src="/profile.svg" /></NavLink>
            <button onClick={logOut}  > Logout </button>

        </div>)
    }

    else {
        return (
            <div className='flex'>
                <NavLink to="/" className="text-lg"> BookHive   </NavLink>
                <NavLink to="/books"> Books  </NavLink>
                <NavLink to="/authors"> Authors </NavLink>
                <NavLink to="/publications"> Publications  </NavLink>
                <div>
                    <input placeholder='search' />
                </div>
                <NavLink to="/auth/login" > Log in  </NavLink>
            </div>
        )



    }
}

export default Header; 