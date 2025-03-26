

import React, { useState, useEffect } from 'react'

import { Book } from '@prisma/client';
import axios from 'axios';

import { sample } from '../utils/books';

import { getUser } from './contexts/UserContext';


// IntersectionObserver API 
const Books = () => {
    const [books, setBooks] = useState<Book[]>([]);





    const [error, setError] = useState('');

    const [size, setSize] = useState('M');

    const userDetails = getUser();


    const role = userDetails.role;




    useEffect(() => {

        const fetchBooks = async () => {

            setError('');

            const response = await axios.get('/api/books');
            if (!response) {
                setError('Internal server error.')
                return;
            }
            const data = await response.data;

            if (typeof data === 'object' && data !== null && 'success' in data && data['success'] === true) {
                //@ts-ignore
                setBooks(data.books);
                //@ts-ignore
                console.log(data.books);
                return;
            }

            setError('Internal server Error');
            return;
        }
        fetchBooks();
    }, []);



    return (
        <div>
            <div className='booksContainer' >
                {
                    books.map((book) => {
                        //@ts-ignore
                        const coverId = book.cover[0].coverId
                        return (
                            <div className='book'>
                                <div onClick={() => { window.location.assign(`/app/book?id=${book.id}`) }}>
                                    <img className='bookImage' src={`https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`} width={200} height={300} />
                                    <div>  {book.title}
                                    </div>

                                </div>


                                <button className='borrowButton' onClick={(e) => {

                                    if (!role) {
                                        alert('You must be authorised to borrow a book.')
                                        window.location.assign('/app/profile');
                                    }

                                    else {
                                        window.location.assign(`/app/checkout?id=${book.id}`)
                                    }
                                }}

                                    disabled={book.availableCount > 0 ? false : true}
                                >
                                    {book.availableCount > 0 ? 'Borrow' : 'Not avaialble'}

                                </button>
                                <button className='borrowButton' onClick={() => {
                                }}>
                                    {book.availableCount > 0 ? 'Add to cart.' : 'Not avaialble'}
                                </button>


                            </div>
                        )
                    }
                    )
                }
            </div>
            {error &&
                <div>   {error}  </div>}
        </div>
    )
}

export default Books