import { Book } from '@prisma/client';
import React, { useState, useEffect } from 'react'
import { useGetUser } from './contexts/UserContext';
import axios from 'axios';

const UserBooks = () => {


    const [error, setError] = useState('');

    const [books, setBooks] = useState<Book[]>([]);

    const [size, setSize] = useState('M');


    const userDetails = useGetUser();

    const role = userDetails.role;

    useEffect(() => {

        const fetchBooks = async () => {

            setError('');

            try {

                const response = await axios.get('/api/public/books');
                if (!response) {
                    setError('Internal server error.')
                    return;
                }
                const data = await response.data;

                if (typeof data === 'object' && data !== null && 'success' in data && data['success'] === true) {
                    //@ts-ignore
                    setBooks(data.books);
                    return;
                }
                setError('Internal server Error');
                return;
            }
            catch (e) {
                setError(JSON.stringify(e))
            }
        }
        fetchBooks();
    }, []);




    return (
        <div>


            <div className='booksContainer'>


                {
                    books.map((book) => {
                        let coverId: string | null = null;
                        //@ts-ignore
                        if (book.cover.length > 0) {
                            //@ts-ignore
                            coverId = book.cover[0].coverId
                        }




                        return (
                            <div className='book'>
                                <div onClick={() => { window.location.assign(`/app/book?id=${book.id}&bookId=${book.bookId}`) }}> {

                                    coverId ?
                                        <img className='bookImage' src={`https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`} width={200} height={300} /> :
                                        <img src='https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg' width={200} height={300} />
                                }
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

export default UserBooks