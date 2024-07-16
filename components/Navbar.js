import React, {useEffect, useState} from 'react';
import './Navbar.css';
import Button from '@mui/material/Button';
import AuthService from '@/services/AuthService';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';

const Navbar = () => {
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

    return (
        <div className="navbar">
            <Stack direction="row" spacing={5} className="navbar-item">
                {user?.name}
                <Button onClick={() => router.push('/users')}>Home</Button>
                <Button onClick={() => router.push('/findUsers')}>Buscar</Button>
                <Button onClick={() => router.push('/bulkCreate')}>Ingresar usuarios</Button>
                
            </Stack>
            <div className="navbar-item">
                <Button onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default Navbar;