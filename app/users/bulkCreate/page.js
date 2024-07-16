"use client";
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, IconButton } from "@mui/material";
import MockAuthService from '@/services/MockAuthService';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Delete } from '@mui/icons-material';

export default function BulkCreateUsers() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordSecond, setPasswordSecond] = useState('');
    const [cellphone, setCellphone] = useState('');

    const handleAddUser = () => {
        if (name && email && password && password === passwordSecond) {
            setUsers([...users, { name, email, password, cellphone }]);
            setName('');
            setEmail('');
            setPassword('');
            setPasswordSecond('');
            setCellphone('');
        } else {
            alert("Por favor asegúrate de llenar todos los campos correctamente y que las contraseñas coincidan.");
        }
    };

    const handleDeleteUser = (index) => {
        const updatedUsers = [...users];
        updatedUsers.splice(index, 1);
        setUsers(updatedUsers);
    };

    const handleSubmit = async () => {
        const result = await MockAuthService.bulkCreateUsers(users);
        if (result) {
            alert("¡Usuarios creados exitosamente!");
            router.push('/users');
        } else {
            alert("Error al crear usuarios.");
        }
    };

    return (
        <Container>
            <Navbar />
            <Box mt={4}>
                <Typography variant="h4">Crear usuarios masivamente</Typography>
                <Box mt={2}>
                    <TextField
                        label="Nombre"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        style={{ marginBottom: '16px' }}
                    />
                    <TextField
                        label="Correo electrónico"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        style={{ marginBottom: '16px' }}
                    />
                    <TextField
                        label="Contraseña"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        style={{ marginBottom: '16px' }}
                    />
                    <TextField
                        label="Confirmar Contraseña"
                        variant="outlined"
                        type="password"
                        value={passwordSecond}
                        onChange={(e) => setPasswordSecond(e.target.value)}
                        fullWidth
                        style={{ marginBottom: '16px' }}
                    />
                    <TextField
                        label="Teléfono"
                        variant="outlined"
                        value={cellphone}
                        onChange={(e) => setCellphone(e.target.value)}
                        fullWidth
                        style={{ marginBottom: '16px' }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddUser}
                        style={{ marginRight: '16px' }}
                    >
                        Agregar usuario
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSubmit}
                    >
                        Enviar Todos los Usuarios
                    </Button>
                </Box>
                <Box mt={4}>
                    <Typography variant="h5">Usuarios a crear:</Typography>
                    <ul>
                        {users.map((user, index) => (
                            <li key={index}>
                                {user.name} ({user.email})
                                <IconButton aria-label="delete" onClick={() => handleDeleteUser(index)}>
                                    <Delete />
                                </IconButton>
                            </li>
                        ))}
                    </ul>
                </Box>
            </Box>
        </Container>
    );
}
