import React from 'react'
import { useState } from 'react';
import { useUser } from '../app/contexts/UserContext';

const Login = () => {

    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const rollNo_or_email = formData.get('rollNo_or_email');
        const password = formData.get('password');
        const response = await fetch("/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ rollNo_or_email, password }) }).then(res => res.json());

        try {
            if (!response.success) {
                setError(response.msg);
            }
            else {
                console.log('logged In successfully.')
                // window.location.assign('/'); 
            }
        }
        catch (e) {
            console.log(e);
            setError('internal server error');
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
                <div style={{ fontWeight: 'bold', fontSize: 'larger' }} > Login to BookHive   </div>
                <div className='loginFormBox'>
                    <form onSubmit={handleSubmit}    >

                        <div className='formDiv'>
                            <div>
                                <label htmlFor='rollNo_or_email'  > Roll No./Email  </label> <br />
                                <input placeholder='231ME341' type='text' name='rollNo_or_email' required
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
                </div>
                <div className='loginErrorBox'>
                    {error}
                </div>
            </div>
        )
    }


}

export default Login