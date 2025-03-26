import React, { useState, useEffect } from 'react'
import { URLSearchParams } from 'url'

import { BookWithEdition } from '@prisma/client';
import { getUser } from './contexts/UserContext';



const CheckOut = () => {

    const id = new URLSearchParams().get('id');


    const [book, setBook] = useState<BookWithEdition | null>(null);

    const [error, setError] = useState('');

    const [showDetails, setShowDetails] = useState(false);

    const [duration, setDuration] = useState(7);

    const userDetails = getUser();



    useEffect(() => {

        const fetchBook = async () => {

            try {
                const fetchedBook = await axios.get(`/api/bookWithEdition?id=${id}`).then(res => res.data);
                //@ts-ignore
                setBook(fetchBook);
            }
            catch (e) {
                console.log(e);
                setError('Error fetching the book.');
            }

        }

    })




    if (!userDetails.role) {

        useEffect(() => { window.location.assign('/app/profile') }, [])

        return (
            <div> You are not authorised to visit this page  </div>
        )

    }

    else {


        const generateToken = async () => {

            await axios.post('/api/createToken', { id, duration })
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
                            <li> Authors :  </li>
                            <li> Publishers: </li>
                            <li> Price : {book?.price} </li>
                            <li> Genre : {book?.genre} </li>
                            <li> Pages   : {book?.pages} </li>
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