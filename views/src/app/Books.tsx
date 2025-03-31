
import { useGetUser } from './contexts/UserContext';
import LibrarianBooks from './LibrarianBooks';
import UserBooks from './UserBooks';

const Books = () => {

    const userDetails = useGetUser();
    const role = userDetails.role;

    if (role !== 'Librarian') {
        return (<UserBooks />)
    }

    else {
        return (<LibrarianBooks />)
    }
}


export default Books 