"use client"
import Navbar from '@/components/Navbar';
import React, {useEffect, useState} from 'react';
import SimpleSnackbar from '@/components/SimpleSnackbar';
import { useRouter } from 'next/navigation';

import AuthService from "@/services/AuthService";
import {Container, Stack, TextField, Button, IconButton, Typography} from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import { Delete } from "@mui/icons-material";

const bulkCreate = (props) => {
    const router = useRouter();
    const {id} = props.params;
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([{ name: '', email: '' , password: '', cellphone: ''}]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        //Comprobación de token expiración
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            console.log('No hay usuario');
            router.push('/login');
        }else{

        const expirationTime = new Date(user.expiration);
        const currentTime = new Date();

        if (currentTime >= expirationTime) {

                console.log('El token ha expirado');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                router.push('/login');
                return;
        }
    }
        const token = localStorage.getItem('token');
        (async () => {
            const data = await AuthService.getUserById(id, token);
            setUser(data);
        })();
    }, []);

    const handleUserChange = (e, index) => {
        const updatedUsers = [...users];
        updatedUsers[index][e.target.name] = e.target.value;
        setUsers(updatedUsers);
      };

      const handleAddUser = () => {
        setUsers([...users, {  name: '', email: '' , password: '', cellphone: ''}]);
      };

      const handleRemoveUser = (indexRemove) => {
        setUsers((currentUsers) => currentUsers.filter((_, index) => index !== indexRemove));
      };

    const handleRegister = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await AuthService.bulkCreate(users, token);
            setSnackbarMessage(response.message);
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage('Ocurrió un error al crear los usuarios');
            setSnackbarOpen(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackbarOpen(false);
      };

    return (
        <Container>
        <Navbar />
            {!users ? "No hay datos" : 
            <Container style={{ marginTop: 30 }}>
                 <Stack justifyContent={'center'} alignItems={'center'} spacing={4}>
                 <Typography variant="h3" sx={{ marginBottom: 5 }}>Creador de usuarios</Typography>
                 {users.map((user, index) => (
                    <Stack key={index} direction="row" spacing={2}>
                        <TextField
                            label="Nombre"
                            name="name"
                            variant="outlined"
                            value={user.name}
                            onChange={(e) => handleUserChange(e, index)}
                            placeholder="Nombre"
                        />
                        <TextField
                            type="email"
                            label="Email"
                            name="email"
                            variant="outlined"
                            value={user.email}
                            onChange={(e) => handleUserChange(e, index)}
                            placeholder="Email"
                        />
                        <TextField
                            type="password"
                            label="Contraseña"
                            name="password"
                            variant="outlined"
                            value={user.password}
                            onChange={(e) => handleUserChange(e, index)}
                            placeholder="Contraseña"
                        />
                        <TextField
                            type="email"
                            label="Cellphone"
                            name="cellphone"
                            variant="outlined"
                            value={user.cellphone}
                            onChange={(e) => handleUserChange(e, index)}
                            placeholder="Cellphone"
                        />
                        {users.length > 1 && (
                            <IconButton color="primary"  aria-label={"Eliminar campo "} onClick={() => handleRemoveUser(index)}>
                            <Delete />
                            </IconButton>
                        )}  
                    </Stack>   
        ))}
                    <Stack direction={'row'} spacing={3}>
                        <Button variant="contained"  disabled={users.some(user => !user.name.trim() || !user.email.trim() || !user.password.trim() || !user.cellphone.trim())} onClick={handleRegister}>Crear</Button>
                        <Button variant="contained" onClick={handleAddUser}>+</Button>
                        <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbarMessage}
      />
                         </Stack>

                    </Stack>
            </Container>}    
        </ Container>
    )
}

export default bulkCreate;