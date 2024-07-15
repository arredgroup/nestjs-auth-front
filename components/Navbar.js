import React, {useEffect, useState} from 'react';
import './Navbar.css';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import AuthService from '@/services/AuthService';
import { useRouter } from 'next/navigation';

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
    const handleNavigatorHome= () => {
        router.push('/users/');
    }

    const handleNavigator= (route) => {
        router.push('/users/' + user.id + '/'+ route);
    }

    return (
        <div className="navbar" style={{marginTop: '20px'}}>
            <div className="navbar-item">
                {user?.name}
            </div>
            <Button variant='outlined' onClick={() => handleNavigatorHome()} >
                Inicio
            </Button>
            <Stack direction='row' spacing={2}>
            
            <Button variant='outlined' onClick={() => handleNavigator('search')} >
                Buscador
            </Button>
            <Button variant='outlined' onClick={() => handleNavigator('bulkCreate')} >
                Creador de usuarios
            </Button>
            <Button variant='outlined' onClick={() => handleNavigator('edit')}>
                Editor de usuario
            </Button>
            </Stack>
                <Button onClick={handleLogout} className='button'>
                    Logout
                </Button>
            
        </div>
    )
}

export default Navbar;