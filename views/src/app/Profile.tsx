import React from 'react'
import { getUser } from './contexts/UserContext'

import axios from 'axios';

import { Role } from '@prisma/client';

import { NavLink } from 'react-router-dom';

const Profile = () => {

    const userDetails = getUser();

    const role = userDetails.role;

    const email = userDetails.email;

    const profile = userDetails.profile;





    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const rollNo = formData.get('rollNo');
        const name = formData.get('name');
        const password = formData.get('password');
        const branch = formData.get('branch');
        try {
            const response = await axios.post('/api/createProfile', { rollNo, name, password, branch, email, roleRequested: Role.Student });
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

    if (profile) {
        return (
            <div>
                <div>
                    <label htmlFor='name'   >  Name   </label>  <br />
                    <input name='name' type='text' required disabled placeholder={profile.name} />

                </div>

                <div>
                    <label htmlFor='rollNo' >    RollNo    </label>  <br />
                    <input name='rollNo' type='text' required placeholder={profile.rollNo} disabled />
                </div>

                <div>
                    <label htmlFor='branch'> Branch   </label>   <br />
                    <input name='branch' type='text' required disabled placeholder={profile.branch} />
                </div>

                <div>
                    <label htmlFor='password'> Year Of Graduation     </label>  <br />
                    <input name='password' type='text' required placeholder={profile.yearOfGraduation} disabled />
                </div>

                <div> You must have a library card to borrow books. </div>

                {!role && <div> Apply to issue a library card.  <button onClick={async () => { await axios.post('/api/applyForRole', { roleRequested: Role.Student }) }}  > Click here  </button>
                </div>}

                {role === Role.Student && <button onClick={async () => { await axios.post('/api/applyForRole'), { roleRequested: Role.Librarian } }} > Apply to become a librarian </button>}

            </div>
        )
    }
    else {

        return (
            <div>
                <div>   Fill this form to create a profile. You cannot change this later so fill carefully.
                </div>
                <div>
                    <form onSubmit={handleSubmit}>

                        <div>
                            <label htmlFor='name'   >  Name   </label>  <br />
                            <input name='name' type='text' required />

                        </div>

                        <div>
                            <label htmlFor='rollNo' >    RollNo    </label>  <br />
                            <input name='rollNo' type='text' required placeholder='231ME341' />
                        </div>

                        <div>
                            <label htmlFor='branch'> Branch   </label>   <br />
                            <input name='branch' type='text' required />
                        </div>

                        <div>
                            <label htmlFor='password'> Year Of Graduation     </label>  <br />
                            <input name='password' type='text' required placeholder='2027' />
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

export default Profile 