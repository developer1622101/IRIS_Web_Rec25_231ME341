
import { NavLink } from 'react-router-dom'
import { useGetUser } from './contexts/UserContext'

import { Role, Status } from '@prisma/client'

import StudentDashboard from './StudentDashboard'
import LibrarianDashboard from './LibrarianDashboard'
import AdminDashboard from './AdminDashboard'



const Dashboard = () => {

    const UserDetails = useGetUser();

    const role = UserDetails.role;

    const profile = UserDetails.profile;


    if (role === Role.Student) {

        return (<StudentDashboard />)
    }

    else if (role === Role.Librarian) {
        return (<LibrarianDashboard />)
    }

    else if (role === Role.Admin) {
        return (<AdminDashboard />)
    }
    else {

        if (profile) {

            return (
                <div>
                    You are not authorised to borrow books. <br />

                    How to get access?  <br />
                    1.Create a profile first.  <NavLink to='/app/profile'> Create a profile  </NavLink> <br />
                    2.Then apply to issue a library card.
                </div>

            )
        }

        else {

            return (
                <div>
                    You are not authorised to borrow books. <br />
                    <div>  Get a library card.  <NavLink to='/api/verify'> Click here  </NavLink>  </div>
                </div>
            )
        }

    }
}

export default Dashboard