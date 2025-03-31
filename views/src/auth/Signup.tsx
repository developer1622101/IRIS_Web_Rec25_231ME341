import React from 'react'
import { useState } from 'react';
import { useUser } from '../app/contexts/UserContext';
import { NavLink } from 'react-router-dom';

import axios from 'axios';

const Signup = () => {

    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        setError('');
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await fetch("/auth/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });


            const data = await response.json();

            //const response = await axios.post("/auth/signup", { email, password });


            //const data = await response.data;

            //@ts-ignore
            setError(data.msg);
            // alert(data.msg); 


        }
        catch (e) {
            console.log(e);
            // alert(JSON.stringify(e));
        }
    }


    const UserContextState = useUser();


    if (UserContextState && UserContextState.user.loggedIn) {

        const { user, setUser } = UserContextState;

        return (
            <div className='loginDiv'>


                <div> You are already logged in as  {user.email}  </div>

                <button onClick={async () => {
                    await axios.put('/auth/logout');
                    setUser({ loggedIn: false });
                }} > Logout    </button >

            </div>)
    }

    else {


        return (
            <div className='loginDiv'>
                <div style={{ fontWeight: 'bold', fontSize: 'larger' }} > Create a BookHive Account </div>
                <div className='loginFormBox'>
                    <form onSubmit={handleSubmit}    >

                        <div className='formDiv'>
                            <div>
                                <label htmlFor='email'  > Email  </label> <br />
                                <input placeholder='johndoe@gmail.com' type='text' name='email' required
                                    style={{ color: 'black' }}
                                />
                            </div>
                            <div>
                                <label htmlFor='password'> Password </label> <br />
                                <input type='password' required name='password' style={{ color: 'black' }} />
                            </div>
                            <button type='submit' style={{ backgroundColor: 'black', fontSize: 'large', fontWeight: 'bold', cursor: 'pointer', border: '1px solid white', padding: '5px' }}   > Submit  </button>
                        </div>
                    </form>
                    <div>
                        <  NavLink to='/auth/login' > Log In   </NavLink>
                    </div>
                </div>
                <div className='loginErrorBox'>
                    {error}
                </div>
            </div>
        )
    }
}

export default Signup