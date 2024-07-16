import React, {useEffect, useState} from 'react';
import './Navbar.css';
import Button from '@mui/material/Button';
import AuthService from '@/services/AuthService';
import { useRouter } from 'next/navigation';
import { Stack } from '@mui/material';

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
            <div className="navbar-item">
                {user?.name}
            </div>
            <div className="navbar-item">
                <Button variant='contained' onClick={()=>router.push('/bulkCreate')}> Crear Usuario </Button>
            </div>
            <div className='navbar-item'>
                <Button variant='contained' onClick={()=>router.push('/find')}> Buscar Usuarios </Button>
            </div>
            <div className='navbar-item'>
                <Button variant='contained' onClick={()=>router.push('/users')}> Usuarios </Button>
            </div>
            <div className='navbar-item'>
                <Button variant='contained' onClick={handleLogout} style={{backgroundColor: 'red'}}>Cerrar sesión</Button>
            </div>
        </div>
    )
}

export default Navbar;