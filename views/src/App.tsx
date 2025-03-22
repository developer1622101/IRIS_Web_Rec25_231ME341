import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import { UserInterface, } from './utils/UserInterface';
import { authHeaderCheck } from './utils/authHeaderCheck';
import { Outlet } from 'react-router';
import { UserContext } from './app/contexts/UserContext';

function App() {

  const initialUserInterface: UserInterface = { loggedIn: false };
  const [user, setUser] = useState(initialUserInterface);

  useEffect(() => {

    const a = async () => {

      console.log('running useEffect ')

      try {
        const response = await axios.get('/api/checkLoggedIn');
        if (response.status === 200) {
          const data = await response.data;

          if (JSON.stringify(user) !== JSON.stringify(data)) {
            //@ts-ignore // obviously I am sending it.
            setUser(data);
          }
          console.log(data);
        }
      }
      catch (e) {
        console.log(e);
      }

    }
    a();


  }, [user])


  return (
    <div>
      <UserContext.Provider value={{ user, setUser }} >
        <Outlet />
      </UserContext.Provider>
    </div>
  );
}

export default App;
