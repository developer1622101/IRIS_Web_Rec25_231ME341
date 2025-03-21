import React from 'react'
import { useState } from 'react';

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
                window.location.assign('/');
            }
        }
        catch (e) {
            console.log(e);
            setError('internal server error');
        }
    }
    const [count, setCount] = useState(0);
    return (
        <div>

            <div  >
                <form onSubmit={handleSubmit}  >

                    <label htmlFor='rollNo_or_email'  > Roll No./Email  </label>
                    <input placeholder='231ME341' type='text' name='rollNo_or_email' required />
                    <label htmlFor='password'> Password </label>
                    <input type='password' required name='password' />
                    <button type='submit'> Submit  </button>
                </form>
            </div>


            <div>
                {error}
            </div>

            <div>
                {count}
            </div>
            <div> <button onClick={() => setCount(count => count + 1)} > +   </button>  </div>
        </div>
    )
}

export default Login