import React, { useState, useEffect } from 'react'

import { Book } from '@prisma/client';
import { useGetUser } from './contexts/UserContext';

import { BookStatus } from '@prisma/client';
import axios from 'axios';

const LibrarianBooks = () => {

    const [books, setBooks] = useState<Book[]>([]);

    const [error, setError] = useState('');

    const [size, setSize] = useState('M');

    const userDetails = useGetUser();

    const role = userDetails.role;

    const [mode, setMode] = useState('Public');

    const [currentBooks, setCurrentBooks] = useState<Book[]>([]);


    useEffect(() => {

        setError('');

        const fetchBooks = async () => {
            setError('');

            console.log(books.length)

            if (books.length === 0) {

                console.log('fetching books for the first time ');

                try {
                    const response = await axios.get('/api/librarian/books');

                    console.log(response);

                    const data = await response.data;

                    console.log(data);

                    if (response.status === 200) {
                        //@ts-ignore
                        setBooks(data.books); setCurrentBooks(data.books);
                        //@ts-ignore
                        console.log(data.books);

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
            else {

                if (mode.trim() === 'Public') {
                    //@ts-ignore
                    const currentBooks1 = books.filter(book => book.bookStatus === 'Public');
                    console.log(currentBooks1.length)
                    //@ts-ignore
                    setCurrentBooks(currentBooks1);
                }

                else if (mode.trim() === 'Hidden') {
                    //@ts-ignore
                    const currentBooks1 = books.filter(book => book.bookStatus === 'Hidden');
                    console.log(currentBooks1.length);
                    //@ts-ignore
                    setCurrentBooks(currentBooks1);
                }
            }
        }
        fetchBooks();
    }, [mode]);


    return (
        <div>

            {error &&
                <div>   {error}  </div>}
            <div>
                Mode :   {mode} </div>
            <br />


            <button onClick={//@ts-ignore  
                (e) => { setMode(e.currentTarget.textContent) }}  > Public </button>
            <button onClick={//@ts-ignore  
                (e) => { setMode(e.currentTarget.textContent) }} > Hidden </button>

            <br />
            <div className='booksContainer' >
                {currentBooks && currentBooks.length > 0 &&
                    currentBooks.map((book) => {

                        const toggleBookStatus = async () => {
                            try {
                                const newBookStatus = book.bookStatus === 'Public' ? 0 : 1
                                const response = await axios.put('/api/librarian/changeBookStatus', { id: book.id, newBookStatus });

                                const data = await response.data;
                                //@ts-ignore
                                setError(data.msg);

                                if (response.status === 200) {

                                    window.location.reload();
                                }

                            }
                            catch (e) {
                                console.log(e);
                                setError('Error while sending the api request.')
                            }
                        }
                        //@ts-ignore
                        let coverId: string | null = null;
                        //@ts-ignore
                        if (book && book.cover && book.cover.length > 0) {
                            //@ts-ignore
                            coverId = book.cover[0].coverId
                        }



                        return (
                            <div className='book'>
                                <div onClick={() => { window.location.assign(`/app/book?id=${book.id}&bookId=${book.bookId}`) }}>
                                    {coverId ?
                                        <img className='bookImage' src={`https://covers.openlibrary.org/b/id/${coverId}-M.jpg`} /> :
                                        <img src='https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg' width={200} height={300} />}

                                </div>
                                <div>  {book.title} </div>
                                <button onClick={toggleBookStatus}>
                                    {book.bookStatus === BookStatus.Public ? 'Hide this book' : 'Make this book public'}
                                </button>
                            </div>
                        )
                    }
                    )
                }
            </div>

        </div>
    )
}


export default LibrarianBooks