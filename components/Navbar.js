import React, { useEffect, useState } from 'react';
import './Navbar.css';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AuthService from '@/services/AuthService';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState({ name: "" });

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    const result = await AuthService.logOut(token);
    if (result) {
      router.push('/login');
    }
  }

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Avatar className="navbar-avatar">{user?.name.charAt(0)}</Avatar>
        <span className="navbar-username">{user?.name}</span>
        <Button className="navbar-button" onClick={() => router.push('/filters')}>Filtros</Button>
        <Button className="navbar-button" onClick={() => router.push('/bulkCreate')}>Registrar Usuarios</Button>
      </div>
      <div className="navbar-right">
        <Button className="navbar-button" onClick={handleLogout}>Cerrar Sesión</Button>
      </div>
    </div>
  )
}

export default Navbar;

