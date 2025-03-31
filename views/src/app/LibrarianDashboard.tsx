import React, { useState, useEffect } from 'react'
import { useGetUser } from './contexts/UserContext';
import axios from 'axios';

import { Token } from '@prisma/client';

const LibrarianDashboard = () => {

    const [error, setError] = useState('');
    const [applications, setApplications] = useState([]);

    const [tokens, setTokens] = useState<Token[]>([]);



    useEffect(() => {

        setError('');
        const fetchStudentApplications = async () => {
            try {
                const response = await axios.get('/api/librarian/studentApplications');
                const responseData = await response.data;

                if (response.status === 200) {
                    //@ts-ignore
                    setApplications(responseData.applications);
                    return;
                }
                //@ts-ignore
                setError(responseData.msg);
            }

            catch (e) {
                setError(JSON.stringify(e));
                console.log(e);
            }
        }

        fetchStudentApplications();

        const fetchTokens = async () => {

            try {
                const response = await axios.get('/api/librarian/allTokens');
                const responseData = await response.data;

                if (response.status === 200) {
                    //@ts-ignore
                    setTokens(responseData.tokens);
                    return;
                }
                //@ts-ignore
                setError(responseData.msg);
            }

            catch (e) {
                setError(JSON.stringify(e));
                console.log(e);
            }
        }

        fetchTokens();

    }, [])

    return (
        <div>

            {error && <div> {error} </div>}

            You are a librarian

            <div style={{ border: '1px solid white', margin: '2px', padding: '5px' }} > Student applications <br />
                {applications.map(e => {


                    //@ts-ignore
                    const User = e.User; const userId = e.userId; const profile = User.Profile; const id = e.id;


                    const { name, rollNo, branch, yearOfGraduation } = profile;

                    const requestAccepted = async (approved: boolean) => {

                        const status = approved ? 1 : 0;

                        try {
                            const response = await axios.put('/api/librarian/studentApplications', { id, status })

                            const data = await response.data;

                            if (response.status === 200) {
                                setError('Updated successfully.');
                                window.location.reload();
                                return;
                            }
                            //@ts-ignore
                            setError(data.msg);
                        }
                        catch (e) {
                            console.log(e);
                            setError(JSON.stringify(e));
                        }
                    }


                    return (<div style={{ border: '1px solid white ', padding: '3px', margin: '2px' }}>

                        <div>
                            ApplicationID : {id} <br />
                            UserId : {userId} <br />
                            Name : {name} <br />
                            Roll.No : {rollNo} <br />
                            Branch : {branch} <br />
                            Year of Graduation  : {yearOfGraduation} <br />
                        </div>

                        <div>
                            <button onClick={(e) => { requestAccepted(true) }} > Approve Request  </button>
                            <button onClick={(e) => { requestAccepted(false) }}> Decline Request </button>
                        </div>
                    </div>
                    )
                })
                }

            </div>


            <div>

                <input type='text' />

                <div>

                    {tokens && tokens.length > 0 &&

                        tokens.map((token) => {


                            const tokenCollected = async () => {


                                try {

                                    const response = await axios.put('/api/librarian/tokenCollected', { tokenId: token.id })

                                    const data = await response.data;

                                    //@ts-ignore
                                    setError(data.msg);

                                    if (response.status === 201) {
                                        window.location.reload();
                                    }

                                }

                                catch (e) {

                                    console.log(e);

                                    setError('some error ');

                                }


                            }

                            const tokenReturned = async () => {

                                try {

                                    const response = await axios.put('/api/librarian/tokenReturned', { tokenId: token.id })

                                    const data = await response.data;

                                    //@ts-ignore
                                    setError(data.msg);

                                    if (response.status === 201) {
                                        window.location.reload();
                                    }

                                }

                                catch (e) {

                                    console.log(e);

                                    setError('error');


                                }

                            }

                            const createdAt = token.createdAt.toString()

                            const dueDate = token.dueDate.toString()

                            return (<div style={{ border: '1px solid white ', padding: '3px', margin: '2px' }}>

                                <div>
                                    TokenId   : {token.id} <br />
                                    StudentID :   {token.borrowerId}     <br />
                                    CreatedAt : {createdAt} <br />
                                    Collected : {token.collected ? 'yes' : 'no'} <br />
                                    ReturnDate :  {dueDate}  <br />
                                    Dues :   {token.dues} <br />
                                    Returned  : {token.returned ? 'yes' : 'no'}
                                </div>

                                {!token.collected ? <button onClick={tokenCollected}> Confirm   collection of book  from library. </button> : <button onClick={tokenReturned} > Confirm   return  of book to library  </button>}

                                <div>

                                </div>
                            </div>)
                        })


                    }



                </div>
            </div>


        </div>)
}

export default LibrarianDashboard