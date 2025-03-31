
import React, { useState, useEffect } from 'react'
import { useGetUser } from './contexts/UserContext';

import { NavLink } from 'react-router-dom';


import axios from 'axios';


const StudentDashboard = () => {




    const UserDetails = useGetUser();

    const role = UserDetails.role;

    const email = UserDetails.email;

    const profile = UserDetails.profile;

    const id = UserDetails.id;

    const [error, setError] = useState('');

    const [borrowedBooks, setBorrowedBooks] = useState([]);

    const [tokens, setTokens] = useState([]);

    const [allTokens, setAllTokens] = useState([]);








    const getAllTokens = async () => {

        const response = await axios.get('/api/student/allTokens');

        if (response.status !== 200) {
            setError('Error fetching books');
        }

        const responseData = await response.data;

        //@ts-ignore
        setAllTokens(responseData.tokens);

    }

    const [dues, setDues] = useState(0);


    useEffect(() => {

        const fetchBorrowedBooks = async () => {


            try {
                const response = await axios.get('/api/student/currentTokens');

                if (response.status !== 200) {
                    setError('Error fetching books');
                }

                const responseData = await response.data;


                //@ts-ignore
                const tokenArray = responseData.tokens;

                //@ts-ignore
                const bookCollectedTokens = tokenArray.filter(token => token.collected === true);

                //@ts-ignore
                const bookNotCollectedTokens = tokenArray.filter(token => token.collected === false);

                setTokens(tokenArray);


                console.log(tokenArray);

                let currentDues = 0;


                //@ts-ignore
                const borrowedBooks2 = [];
                //@ts-ignore
                tokenArray.forEach((token) => {
                    currentDues += token.dues
                    //@ts-ignore
                    token.books.forEach((book) => {
                        if (!book.returned) {
                            borrowedBooks2.push({ id: book.id, title: book.title, borrowedAt: token.createdAt, dueDate: token.dueDate })
                        }
                    })
                })
                //@ts-ignore
                console.log(borrowedBooks2);


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


            {UserDetails.banned && <div style={{ fontSize: 'large' }}> You are banned  ,  you cannot create tokens. </div>}

            <div className='text-lg'> Hi {email} </div>

            {dues > 0 && <NavLink to='/app/payDues' > Pay dues  </NavLink>}

            <div>
                <div>

                    Borrowed Books <br />

                    {borrowedBooks && borrowedBooks.length > 0 &&
                        borrowedBooks.map(book => (<div style={{ border: '1px solid white', padding: '4px', margin: '2px' }}>



                            Title : { //@ts-ignore 
                                book.title}   <br />

                            Description : {//@ts-ignore 
                                book.description} <br />
                            borrowedAt : ${//@ts-ignore 
                                book.borrowedAt}  <br />
                            dueDate : {//@ts-ignore 
                                book.dueDate}
                            collected : { //@ts-ignore
                                book.collected
                            }
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
                        (<div style={{ border: '1px solid white', padding: '4px', margin: '2px' }}>

                            { //@ts-ignore 
                                `createdAt : ${token.createdAt} ,  dueDate : ${token.dueDate} ,  dues: ${token.dues} , collected : ${token.collected ? 'YES' : "No"} `}
                            <br />
                            Books : <br />

                            {   //@ts-ignore 
                                token.books.map(book => (<div> title :  {book.title} <br />  description : {book.description}  </div>))}

                        </div>))
                    }

                    <div>

                        <button onClick={getAllTokens}> Get all my tokens </button>

                        {allTokens.length > 0 &&

                            allTokens.map(token => (<div>

                                { //@ts-ignore 
                                    `createdAt : ${token.createdAt}  ||||   dueDate : ${token.dueDate}  ||||   dues: ${token.dues} |||| collected: ${token.collected}  |||| returned : ${token.returned} `}
                                <br />
                                Books : <br />

                                {   //@ts-ignore  
                                    token.books.map(book => (<div> title :  {  //@ts-ignore
                                        book.title} <br />  description : {book.description}  </div>))
                                }



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

export default StudentDashboard