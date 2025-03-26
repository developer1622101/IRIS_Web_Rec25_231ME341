import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { URLSearchParams } from 'url'

import { BookWithEdition } from '@prisma/client';

const Book = () => {



    //@ts-ignore
    const searchParams = new URLSearchParams(this.props.location.search);

    const id = searchParams.get('id');
    const bookId = searchParams.get('bookId');

    const [error, setError] = useState('');




    const [book, setBook] = useState<BookWithEdition | null>(null);

    const [editions, setEdition] = useState<BookWithEdition[]>([]);



    useEffect(() => {

        const fetch = async () => {

            try {
                const editions = await axios.post('/api/getEditions', { bookId });
                //@ts-ignore
                setEdition(editions);
            }

            catch (e) {

                console.log(e);
                setError('Error fetching editions.')
            }


            const currentBook = editions.find(edition => edition.id.toString() === id && id !== null);

            //@ts-ignore
            setBook(currentBook);

        }

        fetch();

    }, [])


    //@ts-ignore
    const covers = book.covers;

    const coverId = covers[0].coverId;


    return (


        <div>

            <div style={{ display: 'flex' }} >


                <div >
                    <img src={`https://covers.openlibrary.org/b/id/${coverId}-M.jpg`} />
                </div>

                <div>

                    <li>Title :  {book?.title} </li>
                    <li> Description:  {book?.description} </li>

                    <li> Authors :  </li>
                    <li> Publishers: </li>

                    <li> Price : {book?.price} </li>

                    <li> Genre : {book?.genre} </li>

                    <li> Pages   : {book?.pages} </li>

                    <li> TotalCount : {book?.totalCount} </li>

                    <li> AvailableCount : {book?.availableCount} </li>



                    <button onClick={() => { window.location.assign(`/app/checkout?id=${book?.id}}`) }} > Borrow this book </button>

                    <button> Add to Cart </button>
                    <li> isbn13 : {book?.isbn13}    </li>
                    <li> isbn10 : {book?.isbn10}   </li>
                    <li> noOfEditions  : {editions.length} </li>
                    <li> publish_date  : {book?.publish_date} </li>
                    <li>translated_from : {book?.translated_from}</li>
                    <li>languages       : {book?.languages}</li>
                    <li>translation_of  : {book?.translation_of}</li>
                    <li>latest_revision : {book?.latest_revision}</li>
                    <li>revision        : {book?.revision}</li>



                </div>

            </div>

            <div>

                {editions.map(edition => {
                    //@ts-ignore
                    const covers = edition.covers;

                    const coverId = covers[0].coverId;

                    return (<div style={{ display: 'flex' }}>

                        <div >
                            <img src={`https://covers.openlibrary.org/b/id/${coverId}-M.jpg`} />
                        </div>

                        <div>

                            <li>Title :  {edition.title} </li>
                            <li> Description:  {edition.description} </li>

                            <button>  Borrow this book </button>

                            <button> Add to cart </button>


                        </div>


                    </div>)
                })}



            </div>

        </div>
    )
}

export default Book