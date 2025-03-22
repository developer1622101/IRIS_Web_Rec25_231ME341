

import React, { useState, useEffect } from 'react'

//import { Book } from '@prisma/client';
import axios from 'axios';

import { sample } from '../utils/books';





// IntersectionObserver API 
const Books = () => {
    //const [books, setBooks] = useState<Book[]>([]);

    //@ts-ignore
    const [books, setBooks] = useState(sample);

    console.log(sample)

    const [error, setError] = useState('');

    const [size, setSize] = useState('M');



    /*
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
    
        */


    return (
        <div>
            <div className='booksContainer' >
                {
                    books.map((book) => {
                        //@ts-ignore
                        const coverId = book.cover[0].coverId
                        return (
                            <div className='book'>
                                <img className='bookImage' src={`https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`} width={200} height={300} />
                                <div>  {book.title}
                                </div>
                                <button className='borrowButton'>
                                    {book.availableCount > 0 ? 'Borrow' : 'Not avaialble'}
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