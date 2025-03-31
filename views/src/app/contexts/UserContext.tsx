import { createContext, useState } from 'react'
import { useContext } from 'react'
import { UserInterface } from '../../utils/UserInterface'


const UserContext = createContext<{
  user: UserInterface
  setUser: React.Dispatch<React.SetStateAction<UserInterface>>
} | null>(null)

const useUser = () => {
  const UserContextState = useContext(UserContext);
  if (UserContextState) {
    const { user, setUser } = UserContextState;
    return { user, setUser };
  }
  else {
    return false;
  }
}

const useGetUser = () => {

  const UserContextState = useContext(UserContext);
  if (UserContextState) {
    const { user } = UserContextState;
    return user;
  }
  else {
    return { loggedIn: false };
  }
}

export { useUser, UserContext, useGetUser }
