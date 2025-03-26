import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import { useUser } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

import axios from 'axios';




const Header = () => {



    const [filter, setFilter] = useState('Books');


    const showFilterList = () => {

        const filterListElement = document.getElementsByClassName('filterList');

        filterListElement[0].classList.toggle('active');

    }

    const handleFiltetListClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {


        e.preventDefault();

        const target = e.target as HTMLElement

        if (target.tagName === 'LI') { setFilter(target.textContent || ''); }

        const filterListElement = document.getElementsByClassName('filterList');

        filterListElement[0].classList.remove('active')


    }

    const UserContextState = useUser();

    if (UserContextState && UserContextState.user.loggedIn) {

        const { user, setUser } = UserContextState;


        const logOut = async () => {
            await axios.put('/auth/logout');
            window.location.reload();
        }


        return (<div className='headerDiv' >
            <NavLink to="/app"  > BookHive   </NavLink>
            <NavLink to="/app" > Dashboard   </NavLink>
            <NavLink to="/app/books"  > Books  </NavLink>
            <NavLink to="/app/authors"> Authors </NavLink>
            <NavLink to="/app/publications"> Publications  </NavLink>
            <NavLink to="/app/profile" >  Profile  </NavLink>

            <div className='searchBar'>
                <div>
                    <div className='filterText' onClick={showFilterList} > <span> {filter}  </span> <img src='/down.svg' width={15} height={15} />      </div>
                    <div className='filterList' onClick={handleFiltetListClick}    >
                        <li> Books  </li>
                        <li>Authors   </li>
                        <li> Publications </li>
                    </div>
                </div>

                <input type='text' placeholder='Search' />
                <img src='/search.svg' width={25} height={25} />
            </div>

            <button onClick={logOut} style={{ padding: '5px 10px ', backgroundColor: 'black', color: 'white', borderRadius: '5px', fontWeight: 'bold', border: '0px', cursor: 'pointer' }}  > Logout </button>
        </div>
        )
    }

    else {
        return (
            <div className='headerDiv'  >
                <NavLink to="/app"  >  BookHive   </NavLink>
                <NavLink to="/app/books"  > Books  </NavLink>
                <NavLink to="/app/authors"  > Authors </NavLink>
                <NavLink to="/app/publishers"> Publications  </NavLink>
                <div className='searchBar'>
                    <div>
                        <div className='filterText' onClick={showFilterList} > <span> {filter}  </span> <img src='/down.svg' width={15} height={15} />      </div>
                        <div className='filterList' onClick={handleFiltetListClick}    >
                            <li> Books  </li>
                            <li>Authors   </li>
                            <li> Publications </li>
                        </div>
                    </div>

                    <input type='text' placeholder='Search' />
                    <img src='/search.svg' width={25} height={25} />
                </div>
                <NavLink to="/auth/login" > Log in  </NavLink>
            </div>
        )
    }
}

export default Header; 