
import React, { useState } from 'react'

import { User } from '@prisma/client';

import axios from 'axios';

const AdminDashboard = () => {


    const [search, setSearch] = useState(0);


    const [user, setUser] = useState<User | null>();


    const [error, setError] = useState('');

    const getUser = async () => {

        //@ts-ignore
        setUser(null);

        try {

            const response = await axios.get(`/api/admin/getUser?userId=${search}`);

            if (response.status === 200) {
                setError('data fetched successfully.')


                const data = await response.data;
                //@ts-ignore
                if (data.user) {
                    //@ts-ignore 
                    setUser(data.user);
                }

                //@ts-ignore
                setError(data.msg);


                //window.location.reload();
                return;
            }
        }

        catch (e) {
            console.log(e);
            setError('Error fetching user ');
        }


    }

    const banUser = async () => {

        try {

            const ban = !user?.banned

            const response = await axios.put('/api/admin/banUser', { userId: user?.id, ban });

            const data = await response.data;
            if (response.status === 200) {
                //@ts-ignore
                setError(data.msg)
            }

            else if (response.status === 201) {

                ban ? setError('user banned') :
                    setError('ban removed')

                //@ts-ignore
                setUser(data.user);

            }
        }

        catch (e) {
            console.log(e);
            setError('Error  banning user .');
        }


    }


    const revokeRole = async () => {

        try {

            const response = await axios.put(`/api/admin/revokeRole`, { userId: user?.id });

            const data = await response.data;
            if (response.status === 200) {
                //@ts-ignore
                setError(data.msg)
            }
            else if (response.status === 201) {
                setError('Role revoked succefully')


                //@ts-ignore
                setUser(data.user);

                return;
            }
        }

        catch (e) {
            console.log(e);
            setError('Error fetching user ');
        }


    }



    return (
        <div>
            {error} <br />
            <input type='number' value={search} onChange={(e) => { if (e.currentTarget.value) { setSearch(parseInt(e.currentTarget.value)) } }} />

            <button onClick={getUser}> Get user </button>

            {user &&

                (<div>
                    <div>

                        userId : {  //@ts-ignore 
                            user.id} <br />
                        Email :   {//@ts-ignore 
                            user.email}  <br />
                        Role : {//@ts-ignore 
                            user.role}  <br />
                        Profile :  <br />

                        Name : {//@ts-ignore 
                            user.Profile.name} <br />
                        Roll.No : {//@ts-ignore 
                            user.Profile.rollNo} <br />
                        Branch : {//@ts-ignore 
                            user.Profile.branch} <br />
                        Year of Graduation  : {//@ts-ignore 
                            user.Profile.yearOfGraduation} <br />

                    </div>

                    <button onClick={banUser}> { //@ts-ignore 
                        user.banned ? 'Unban User' : 'Ban User'}  </button>
                    <button onClick={revokeRole}> Revoke Role </button>
                </div>)

            }
        </div>
    )
}

export default AdminDashboard