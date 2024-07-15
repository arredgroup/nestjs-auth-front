import React, {useEffect, useState} from 'react';
import './Navbar.css';
import Button from '@mui/material/Button';
import AuthService from '@/services/AuthService';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

const Navbar = ({section}) => {
    const router = useRouter();
    const [user, setUser] = useState({name:""});

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }, []);

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        const result = await AuthService.logOut(token);
        if(result){
            router.push('/login');
        }
    }

    const handleUserList = () =>  {
        router.push('/user-list');
    }

    const handleCreateUsers = () =>  {
        router.push('/create-users');
    }

    return (
        <div className="navbar">
            <div className="navbar-item">
                {user?.name}
            </div>
            <div>
                <div className="nav-views">
                    <ul>
                        <li onClick={handleUserList} className={section === "1" ? "nav-active-section": ""}>Lista de usuarios</li>
                        <li onClick={handleCreateUsers} className={section === "2" ? "nav-active-section": ""}>Crear usuarios</li>
                    </ul>
                </div>
            </div>
            <div className="navbar-item">
                <Button onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default Navbar;