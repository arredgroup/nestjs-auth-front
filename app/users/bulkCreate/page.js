"use client";
import React, { useState } from 'react';
import { Container, TextField, Button, IconButton, Grid, Box } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import Navbar from '../../../components/Navbar';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const BulkCreateUsers = () => {
    const router = useRouter();
    const [users, setUsers] = useState([{ name: '', email: '', password: '', password_second: '', cellphone: '' }]);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newUsers = [...users];
        newUsers[index][name] = value;
        setUsers(newUsers);
    };

    const handleAddUser = () => {
        setUsers([...users, { name: '', email: '', password: '', password_second: '', cellphone: '' }]);
    };

    const handleRemoveUser = (index) => {
        const newUsers = users.filter((_, i) => i !== index);
        setUsers(newUsers);
    };
    
    const handleHomeView = () => {
        router.push('/users');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/v1/users/bulkCreate', { users }); 
            if (response.status === 200) {
                alert('Usuarios creados exitosamente');
                setUsers([{ name: '', email: '', password: '', password_second: '', cellphone: '' }]); // Reset form
            } else {
                alert('Error al crear usuarios');
            }
        } catch (error) {
            console.error('Error al crear usuarios:', error);
            alert('Error al crear usuarios');
        }
    };

    return (
        
        <Container>
            <Navbar />
            <Button variant="contained" color="primary" onClick={handleHomeView}>Volver a Inicio</Button>
            <h1>Crear Usuarios Masivamente</h1>
            <form onSubmit={handleSubmit}>
                {users.map((user, index) => (
                    <Box key={index} mb={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <TextField
                                    name="name"
                                    label="Nombre"
                                    value={user.name}
                                    onChange={(event) => handleInputChange(index, event)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    name="email"
                                    label="Email"
                                    type="email"
                                    value={user.email}
                                    onChange={(event) => handleInputChange(index, event)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    value={user.password}
                                    onChange={(event) => handleInputChange(index, event)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    name="password_second"
                                    label="Repetir Contraseña"
                                    type="password"
                                    value={user.password_second}
                                    onChange={(event) => handleInputChange(index, event)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    name="cellphone"
                                    label="Teléfono"
                                    value={user.cellphone}
                                    onChange={(event) => handleInputChange(index, event)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={2} container alignItems="center" justifyContent="flex-end">
                                <IconButton onClick={() => handleRemoveUser(index)}>
                                    <Remove />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                ))}
                <Button variant="contained" color="primary" onClick={handleAddUser} startIcon={<Add />}>
                    Añadir Usuario
                </Button>
                <Button type="submit" variant="contained" color="secondary" style={{ marginLeft: 16 }}>
                    Crear Usuarios
                </Button>
            </form>
        </Container>
    );
};

export default BulkCreateUsers;

