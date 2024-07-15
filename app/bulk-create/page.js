"use client";
import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Box, Paper, Typography } from "@mui/material";
import Navbar from '../../components/Navbar';

import AuthService from "../../services/AuthService";
import { useRouter } from 'next/navigation';

export default function BulkCreateUsers() {
    const router = useRouter();
    const [users, setUsers] = useState([{}]);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            router.push('/login');
        }
        if (user?.roles?.includes('admin')) {
            getAllUsers();
        }
        if (user?.roles?.includes('user')) {
            getUser(user.id);
        }
    }, []);

    const getUser = async (id) => {
        const token = localStorage.getItem('token');
        const data = await AuthService.getUserById(id, token);
        setCurrentUser(data);
    }

    const handleAddUser = () => {
        setUsers([...users, {}]);
    }

    const handleInputChange = (index, event) => {
        const values = [...users];
        values[index][event.target.name] = event.target.value;
        setUsers(values);
    }

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await AuthService.bulkCreateUsers({ users }, token);
            console.log('Bulk create response:', response);
        } catch (error) {
            console.error('Error bulk creating users:', error);
        }
    }

    return (
        <Container>
            <Navbar userName={currentUser.name} />
            <h1>Creación Masiva de Usuarios</h1>
            {users.map((user, index) => (
                <Paper key={index} style={{ padding: '16px', marginBottom: '16px' }} elevation={3}>
                    <Typography variant="h6" gutterBottom>
                        Usuario {index + 1}
                    </Typography>
                    <Box display="flex" flexDirection="column" marginBottom={2}>
                        <TextField
                            label="Nombre"
                            name="name"
                            value={user.name || ''}
                            onChange={(e) => handleInputChange(index, e)}
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={user.email || ''}
                            onChange={(e) => handleInputChange(index, e)}
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            label="Teléfono"
                            name="cellphone"
                            value={user.cellphone || ''}
                            onChange={(e) => handleInputChange(index, e)}
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            label="Contraseña"
                            name="password"
                            type="password"
                            value={user.password || ''}
                            onChange={(e) => handleInputChange(index, e)}
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            label="Repetir Contraseña"
                            name="password_second"
                            type="password"
                            value={user.password_second || ''}
                            onChange={(e) => handleInputChange(index, e)}
                            variant="outlined"
                            margin="normal"
                        />
                    </Box>
                </Paper>
            ))}
            <Button onClick={handleAddUser} variant="contained" color="secondary">
                Añadir Usuario
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginTop: '10px' }}>
                Crear Usuarios
            </Button>
        </Container>
    )
}
