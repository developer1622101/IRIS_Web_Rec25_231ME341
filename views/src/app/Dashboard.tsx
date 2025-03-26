import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getUser } from './contexts/UserContext'

import { Role } from '@prisma/client'
import axios from 'axios'




const Dashboard = () => {

    const UserDetails = getUser();

    const role = UserDetails.role;

    const email = UserDetails.email;

    const profile = UserDetails.profile;

    const id = UserDetails.id;

    const [error, setError] = useState('');


    if (role === Role.Student) {

        const [borrowedBooks, setBorrowedBooks] = useState([]);

        const [tokens, setTokens] = useState([]);

        const [allTokens, setAllTokens] = useState([]);






        const getAllTokens = async () => {

            const response = await axios.get('/api/allTokens');

            if (response.status !== 200) {
                setError('Error fetching books');
            }

            const responseData = await response.data;

            //@ts-ignore
            setAllTokens[responseData.tokens];

        }

        const [dues, setDues] = useState(0);


        useEffect(() => {

            const fetchBorrowedBooks = async () => {


                try {
                    const response = await axios.get('/api/currentTokens');

                    if (response.status !== 200) {
                        setError('Error fetching books');
                    }

                    const responseData = await response.data;

                    /* sample response : 
                    {
                      "tokens": [
                        {
                          "createdAt": "2025-03-25T17:20:27.327Z",
                          "dueDate": "2025-03-28T23:59:59.000Z",
                          "dues": 0,
                          "books": [
                            {
                              "id": 100833,
                              "title": "Petals on the Wind",
                              "description": null
                            },
                            {
                              "id": 100684,
                              "title": "Royal Book of Oz",
                              "description": null
                            }
                          ]
                        }
                      ]
                    } */
                    //@ts-ignore
                    const tokenArray = responseData.tokens;

                    //@ts-ignore
                    const bookCollectedTokens = tokenArray.filter(token => token.collected === true);

                    //@ts-ignore
                    const bookNotCollectedTokens = tokenArray.filter(token => token.collected === false);

                    setTokens(tokenArray);

                    let currentDues = 0;


                    //@ts-ignore
                    const borrowedBooks2 = [];
                    //@ts-ignore 
                    tokenArray.forEach((token) => {


                        currentDues += token.dues
                        //@ts-ignore
                        token.books.forEach((book) => {
                            borrowedBooks2.push({ id: book.id, title: book.title, borrowedAt: token.createdAt, dueDate: token.dueDate })
                        })
                    })

                    //@ts-ignore
                    setBorrowedBooks(borrowedBooks2);

                    setDues(currentDues);
                }
                catch (e) {
                    console.log(e);
                    setError('Error fetching books');
                }
            }

            fetchBorrowedBooks();
        }, [])

        return (
            <div>
                <div className='text-lg'> Hi {email} </div>

                {dues > 0 && <NavLink to='/app/payDues' > Pay dues  </NavLink>}

                <div>
                    <div>

                        Borrowed Books <br />

                        {
                            borrowedBooks.map(book => (<div>
                                { //@ts-ignore 
                                    `title : ${book.title} ,  description : ${book.description} , borrowedAt : ${book.borrowedAt} , dueDate : ${book.dueDate}  `}
                            </div>))
                        }
                    </div>
                    <div> Want to read </div>

                    <div>
                        My current  tokens

                        <br />

                        Total dues : {dues}
                        {
                            tokens.map(token =>
                            (<div>

                                { //@ts-ignore 
                                    `createdAt : ${token.createdAt} ,  dueDate : ${token.dueDate} ,  dues: ${token.dues} `}
                                <br />
                                Books : <br />

                                { //@ts-ignore 
                                    token.books.map(book => (<div> title :  {book.title} <br />  description : {title.description}  </div>))}

                            </div>))
                        }

                        <div>

                            <button onClick={getAllTokens}> Get all my tokens </button>

                            {allTokens.length > 0 &&

                                allTokens.map(token => (<div>

                                    { //@ts-ignore 
                                        `createdAt : ${token.createdAt} ,  dueDate : ${token.dueDate} ,  dues: ${token.dues} `}
                                    <br />
                                    Books : <br />

                                    { //@ts-ignore 
                                        token.books.map(book => (<div> title :  {book.title} <br />  description : {title.description}  </div>))}

                                </div>))
                            }
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    else if (role === Role.Librarian) {

        <div>
            You are a librarian
        </div>

    }

    else if (role === Role.Admin) {
        <div> You are the admin. </div>

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