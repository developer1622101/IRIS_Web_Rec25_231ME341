import axios from 'axios';
import React, { useState, useEffect } from 'react'

import { BookWithEdition } from '@prisma/client';

import { useSearchParams } from 'react-router';



const Book = () => {



    const [searchParams, setSearchParams] = useSearchParams();

    const id = searchParams.get('id');

    const bookId = searchParams.get('bookId');

    const [error, setError] = useState('');

    const [book, setBook] = useState<BookWithEdition | null>(null);

    const [editions, setEdition] = useState<BookWithEdition[]>([]);



    useEffect(() => {


        console.log('running useEffect  of book')
        const fetch = async () => {

            try {

                const response = await axios.get(`/api/public/editions?bookId=${bookId}`);

                const data = await response.data;

                if (response.status !== 200) {
                    //@ts-ignore
                    setError(data.msg);
                }


                //@ts-ignore
                setEdition(data.editions);
                //@ts-ignore
                console.log(data.editions);

                //@ts-ignore
                const currentBook = data.editions.find(edition => id !== null && edition.id === parseInt(id));

                console.log(currentBook);

                //@ts-ignore
                setBook(currentBook);

            }

            catch (e) {

                console.log(e);
                setError('Error fetching editions.')
            }




        }

        fetch();

    }, [])


    //@ts-ignore
    let coverId: string | null = null;
    //@ts-ignore
    if (book && book.cover && book.cover.length > 0) {
        //@ts-ignore
        coverId = book.cover[0].coverId
    }




    return (


        <div>

            <div style={{ display: 'flex' }} >


                <div >

                    {coverId ?
                        <img className='bookImage' src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`} /> :
                        <img src='https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg' width={200} height={300} />}
                </div>

                <div style={{ padding: '5px' }}  >


                    <table border={1}>
                        <tr><th>Title </th> <td> {book?.title} </td></tr>
                        <tr><th>Description </th> <td> {book?.description} </td></tr>


                        <tr><th>Authors  </th> {
                            //@ts-ignore
                            book?.author.map(e => <td style={{ cursor: 'pointer' }} onClick={() => { window.location.assign(`/app/author?id=${e.id}`) }}>  {e.name}  </td>)}</tr>
                        <tr><th>Publications  </th> {
                            //@ts-ignore
                            book?.publisher.map(e => <td style={{ cursor: 'pointer' }} onClick={() => { window.location.assign(`/app/publication?id=${e.id}`) }}>  {e.name}  </td>)} </tr>
                        <tr><th>Price  </th> <td> {book?.price} </td></tr>
                        <tr><th>Genre   </th> <td> {book?.genre} </td></tr>

                        <tr><th>Pages  </th> <td> {book?.pages} </td></tr>

                        <tr><th>TotalCount  </th> <td> {book?.totalCount}</td></tr>
                        <tr><th>AvailableCount </th> <td>{book?.availableCount}</td></tr>

                        <tr><th>AvailableCount </th> <td>{book?.availableCount}</td></tr>
                        <tr> <th> isbn13         </th>  <td> {book?.isbn13}    </td> </tr>
                        <tr> <th> isbn10         </th>  <td> {book?.isbn10}    </td> </tr>
                        <tr> <th> noOfEditions   </th>  <td>{editions.length} </td> </tr>
                        <tr> <th> publish_date   </th>  <td>{book?.publish_date}  </td> </tr>
                        <tr> <th>translated_from </th>  <td>{book?.translated_from}  </td> </tr>
                        <tr> <th>languages       </th>  <td>{book?.languages}  </td> </tr>
                        <tr> <th>translation_of  </th>  <td>{book?.translation_of}  </td> </tr>
                        <tr> <th>latest_revision </th>  <td>{book?.latest_revision}  </td> </tr>
                        <tr> <th>revision        </th>  <td>{book?.revision}  </td> </tr>
                    </table>

                    <div style={{ marginTop: '5px' }}>
                        <button onClick={() => { window.location.assign(`/app/checkout?id=${book?.id}}`) }} style={{ color: 'black', marginRight: '5px' }} > Borrow this book </button>

                        <button style={{ color: 'black' }} > Add to Cart </button>
                    </div>


                </div>

            </div>

            <span style={{ fontSize: 'large' }}> Editions  </span>

            <div style={{ padding: '5px', display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '10px' }}>



                {editions && editions.length > 0 && editions.map(edition => {
                    //@ts-ignore
                    let coverId: string | null = null;
                    //@ts-ignore
                    if (edition && edition.cover && edition.cover.length > 0) {
                        //@ts-ignore
                        coverId = edition.cover[0].coverId
                    }

                    return (<div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>

                        <div style={{ cursor: 'pointer' }} onClick={() => { window.location.assign(`/app/book?id=${edition.id}&bookId=${edition.bookId}`) }} >
                            {coverId ?
                                <img className='bookImage' src={`https://covers.openlibrary.org/b/id/${coverId}-M.jpg`} /> :
                                <img src='https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg' width={200} height={300} />}
                        </div>

                        <div>

                            <table>
                                <tr><th>Title : </th>   <td>  {edition.title} </td>  </tr>
                                <tr><th> Description:</th> <td> {edition.description} </td> </tr>
                            </table>

                            <button style={{ color: 'black' }} onClick={() => { window.location.assign(`/app/checkout?id=${book?.id}}`) }}>  Borrow this book </button>

                            <button style={{ color: 'black' }} > Add to cart </button>

                        </div>


                    </div>)
                })}



            </div>

        </div>
    )
}

export default Book