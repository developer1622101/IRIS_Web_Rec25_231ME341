//@ts-nocheck

import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import { useUser } from '../contexts/UserContext';

import axios from 'axios';



const Header = () => {

    const [filter, setFilter] = useState('Book');

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
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    useEffect(() => {

        const searchStuff = async () => {

            if (search.trim() === '') {
                setSearchResults([]);
            }

            else {
                try {
                    const response = await axios.get(`/api/public/search?mode=${filter.toLowerCase()}&q=${search}`);
                    if (response.status !== 200) {
                        const data = await response.data;
                        console.log(data.msg);
                    }
                    const data = await response.data;
                    const searchResults = data.searchResults;
                    setSearchResults(searchResults);
                }
                catch (e) {
                    console.log(e);
                }
            }
        }

        searchStuff();

    }, [search])



    const { user, setUser } = UserContextState;


    const logOut = async () => {
        await axios.put('/auth/logout');
        window.location.reload();
    }


    return (<div className='headerDiv' >
        <NavLink to="/app" > BookHive   </NavLink>
        <NavLink to="/app" > Dashboard   </NavLink>
        <NavLink to="/app/books"  > Books  </NavLink>
        <NavLink to="/app/authors"> Authors </NavLink>
        <NavLink to="/app/publications"> Publications  </NavLink>
        <NavLink to="/app/profile" >  Profile  </NavLink>

        <div className=''>
            <div className='searchBar'>
                <div>
                    <div className='filterText' onClick={showFilterList} > <span> {filter}  </span> <img src='/down.svg' width={15} height={15} />      </div>
                    <div className='filterList' onClick={handleFiltetListClick}>
                        <li> Book        </li>
                        <li> Author      </li>
                        <li> Publication </li>
                    </div>
                </div>
                <input type='text' placeholder='Search' value={search} onChange={(e) => { setSearch(e.target.value); console.log(search) }} />
                <img src='/search.svg' width={25} height={25} />
            </div>

            <div style={{ color: 'black', position: 'absolute', top: '40px', overflowY: 'auto', minHeight: '0px', maxHeight: '800px', width: '500px', border: '1px solid black', display: 'flex', flexDirection: 'column', gap: '5px', backgroundColor: '#201F31', padding: '2px 5px', opacity: searchResults.length > 0 ? '1' : '0', transition: 'opacity' }}>
                {searchResults.length > 0 &&

                    filter === 'Book' ?
                    <div >
                        {searchResults.map(book => {
                            let coverId: string | null = null;
                            //@ts-ignore
                            if (book.cover.length > 0) {
                                //@ts-ignor
                                coverId = book.cover[0].coverId
                            }

                            return (<><div style={{ display: 'flex', justifyContent: 'space-between' }} onClick={() => { window.location.assign(`/app/book?id=${book.id}&bookId=${book.bookId}`) }}>
                                {coverId ? <img className='bookImage' src={`https://covers.openlibrary.org/b/id/${coverId}-S.jpg`} /> :
                                    <img src='https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg' width={34} height={58} />}
                                <div  >  {book.title}
                                </div>
                            </div> <br /> </>);
                        })}
                    </div> :
                    filter === 'Author' ? <div className='searchResults'>
                        {searchResults.map(e => {
                            return (<div onClick={() => { window.location.assign(`/app/author?id=${e.id}`) }} >
                                <span style={{ fontWeight: 'bold' }} >  e.name  </span>
                            </div>);
                        })}
                    </div> :
                        <div className='searchResults'>
                            {searchResults.map(e => {
                                return (<div onClick={() => { window.location.assign(`/app/publication?id=${e.id}`) }} >
                                    <span style={{ fontWeight: 'bold' }} >  e.name  </span>
                                </div>);
                            })}
                        </div>
                }
            </div>
        </div>
        <button onClick={logOut} style={{ padding: '5px 10px ', backgroundColor: 'black', color: 'white', borderRadius: '5px', fontWeight: 'bold', border: '0px', cursor: 'pointer' }}  > Logout </button>


    </div>

    )
}


export default Header 