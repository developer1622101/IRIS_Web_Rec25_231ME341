import React from 'react'
import { useGetUser } from './contexts/UserContext'

import axios from 'axios';

import { Role } from '@prisma/client';

import { NavLink } from 'react-router-dom';

const Profile = () => {

    const userDetails = useGetUser();

    const role = userDetails.role;

    const email = userDetails.email;

    const profile = userDetails.profile;





    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const rollNo = formData.get('rollNo');
        const name = formData.get('name');
        const yearOfGraduation = formData.get('yearOfGraduation');
        const branch = formData.get('branch');
        try {
            const response = await axios.post('/api/public/createProfile', { rollNo, name, yearOfGraduation, branch, email, roleRequested: Role.Student });

            console.log(response);

            const data = await response.data;

            if (response.status === 201) {
                alert('Profile created successfully. ');
                window.location.reload();
            }
            else {
                //@ts-ignore
                alert(data.msg);
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
                    <input name='password' type='' required placeholder={profile.yearOfGraduation} disabled />
                </div>

                <div> You must have a library card to borrow books. </div>

                {!role && <div> Apply to issue a library card.  <button onClick={async () => {
                    try {
                        const response = await axios.post('/api/public/applyForRole', { roleRequested: Role.Student });
                        const data = await response.data;
                        //@ts-ignore
                        alert(data.msg);
                    }
                    catch (e) {
                        console.log(e);
                        alert("an error occured " + JSON.stringify(e))
                    }

                }} > Click here  </button>
                </div>}

                {role === Role.Student &&
                    <button
                        onClick={async () => {
                            try {
                                const response = await axios.post('/api/public/applyForRole', { roleRequested: Role.Librarian });
                                const data = await response.data;
                                //@ts-ignore
                                alert(data.msg);
                            }
                            catch (e) {
                                console.log(e);
                                alert("an error occured " + JSON.stringify(e))
                            }
                        }}>
                        Apply to become a librarian
                    </button>}

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
                            <label htmlFor='yearOfGraduation'> Year Of Graduation     </label>  <br />
                            <input name='yearOfGraduation' type='number' required placeholder='2027' />
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