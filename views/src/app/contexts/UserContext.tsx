import { createContext, useState } from 'react'



import { useContext } from 'react'

import { UserInterface } from '../../utils/UserInterface'


const initialUserInterface: UserInterface = { loggedIn: false }

const UserContext = createContext<{
  user: UserInterface
  setUser: React.Dispatch<React.SetStateAction<UserInterface>>
} | null>(null)

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInterface>(initialUserInterface)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

const useUser = () => {

  const UserContextState = useContext(UserContext);

  if (UserContextState) {

    const { user, setUser } = UserContextState;

    return { user, setUser };
  }

  else {

    const [user, setUser] = useState<UserInterface>(initialUserInterface);

    return { user, setUser };
  }

}

export { UserProvider, useUser }
