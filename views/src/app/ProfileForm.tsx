import React from 'react'
import { useGetUser } from './contexts/UserContext'

import axios from 'axios';

import { Role } from '@prisma/client';

const IssueCard = () => {

    const userDetails = useGetUser();

    const role = userDetails.role;

    const email = userDetails.email;



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const rollNo = formData.get('rollNo');
        const name = formData.get('name');
        const password = formData.get('password');
        const branch = formData.get('branch');
        try {
            const response = await axios.post('/api/verifyForm', { rollNo, name, password, branch, email, roleRequested: Role.Student });
            if (response.status === 200) {
                alert('Form submitted successfully , you will be notified about the librarian\'s response ');
            }
            else {
                alert('internal server error , try again later.');
            }
        }
        catch (e) {
            alert('internal server error , try again later.');
        }

    }

    if (role) {
        return (
            <div>
                You already have an issue card.
            </div>)
    }
    else {

        return (
            <div>
                <div>   Fill this form. This will be sent for verification to the librarian so fill valid details.
                </div>
                <div>
                    <form onSubmit={handleSubmit}>

                        <div>
                            <label htmlFor='name'   >  Name   </label>  <br />
                            <input name='name' type='text' required />

                        </div>

                        <div>
                            <label htmlFor='rollNo' >    RollNo    </label>  <br />
                            <input name='rollNo' type='text' required />
                        </div>

                        <div>
                            <label htmlFor='branch'> Branch   </label>   <br />
                            <input name='brnach' type='text' required />
                        </div>

                        <div>
                            <label htmlFor='password'> IRIS Password     </label>  <br />
                            <input name='password' type='text' required />
                        </div>

                        <div>
                            <button type="submit" > Submit </button>

                        </div>

                    </form>

                </div>

            </div>
        )

    }

}

export default IssueCard