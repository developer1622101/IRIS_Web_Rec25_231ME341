import React from 'react'
import { NavLink } from 'react-router-dom'
import { useUser } from './contexts/UserContext'



const Dashboard = () => {

    const UserContextState = useUser();

    if (UserContextState && UserContextState.user.loggedIn) {

        const user = UserContextState.user;

        return (
            <div>
                <div className='text-lg'> Hi {user.email} </div>
                <div>
                    <div>  Borrowed Books
                    </div>
                    <div> Want to read </div>
                    <div> Dues </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                Login to borrow books and get a personalised dashboard.
                <NavLink to="/auth/login"> Login  </NavLink>
            </div>)
    }
}

export default Dashboard