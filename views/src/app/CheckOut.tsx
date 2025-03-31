import React, { useState, useEffect } from 'react'

import { BookWithEdition } from '@prisma/client';
import { useGetUser } from './contexts/UserContext';

import { useSearchParams } from 'react-router';

import axios from 'axios';

const CheckOut = () => {


    const [params, setParams] = useSearchParams();

    const id = params.get('id');



    const [book, setBook] = useState<BookWithEdition | null>(null);

    const [error, setError] = useState('');

    const [showDetails, setShowDetails] = useState(false);

    const [duration, setDuration] = useState(7);

    const userDetails = useGetUser();



    useEffect(() => {
        const fetchBook = async () => {

            try {
                const data = await axios.get(`/api/public/bookWithEdition?id=${id}`).then(res => res.data);
                //@ts-ignore
                setBook(data.book);
            }
            catch (e) {
                console.log(e);
                setError('Error fetching the book.');
            }
        }
        fetchBook()
    }, [])




    if (!userDetails.role) {
        useEffect(() => window.location.assign('/app/profile'), [])

        return (
            <div>Unauthorised access </div>
        )
    }

    else {

        const generateToken = async () => {


            try {
                const response = await axios.post('/api/student/createToken', { id, duration })


                const data = await response.data;



                if (response.status === 201) {
                    setError('token  created successfully.')
                    window.location.assign('/app')
                }

            }
            catch (e) {
                console.log(e);
                setError('Error generating the token.');
            }
        }

        return (
            <div>

                <div>

                    Order Summary

                    <div>
                        title =  {book?.title}
                    </div>

                    <div onClick={() => { setShowDetails((prev) => !prev) }}>
                        {showDetails ? 'Hide' : 'Show'} all the details
                    </div>

                    {showDetails &&
                        <div>
                            <li> Description:  {book?.description} </li>
                            <li> Authors    : { //@ts-ignore
                                book?.author.map(e => <li style={{ cursor: 'pointer' }} onClick={() => { window.location.assign(`/app/author?id=${e.id}`) }}>  {e.name}   </li>)}
                            </li>
                            <li> Publishers :{ //@ts-ignore
                                book?.publisher.map(e => <li style={{ cursor: 'pointer' }} onClick={() => { window.location.assign(`/app/author?id=${e.id}`) }}>  {e.name}   </li>)}
                            </li>
                            <li> Price : {book?.price} </li>
                            <li> Genre : {book?.genre} </li>
                            <li> Pages : {book?.pages} </li>
                            <li> isbn13 : {book?.isbn13}    </li>
                            <li> isbn10 : {book?.isbn10}   </li>
                            <li> publish_date  : {book?.publish_date} </li>
                            <li>translated_from : {book?.translated_from}</li>
                            <li>languages       : {book?.languages}</li>
                            <li>translation_of  : {book?.translation_of}</li>
                            <li>latest_revision : {book?.latest_revision}</li>
                            <li>revision        : {book?.revision}</li>
                        </div>}


                    <div>
                        <label>  Duration for which u will want to bowrow the books. The time is in days.  </label>

                        <input type='number' max={30} min={7} value={duration} onChange={(e) => { setDuration(parseInt(e.target.value)) }} />
                    </div>
                    <div>
                        <button onClick={generateToken}  > Generate  token   </button>
                    </div>
                </div>
            </div >
        )
    }
}

export default CheckOut