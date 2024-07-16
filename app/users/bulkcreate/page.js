"use client";
import React, { useEffect, useState } from "react";
import { Container, Button, Stack, TextField, IconButton } from "@mui/material";
import SimpleSnackbar from "../../../components/SimpleSnackbar";
import AuthService from "../../../services/AuthService";
import Navbar from "../../../components/Navbar";
import { Delete } from '@mui/icons-material';

const initialUserState = {
    name: '',
    email: '',
    password: '',
    password_second: '',
    cellphone: '',
};

export default function BulkCreateUsers() {
    const [users, setUsers] = useState([initialUserState]);
    const [message, setMessage] = useState('');
    const [openSnack, setOpenSnack] = useState(false);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        setUsers(prevUsers =>
            prevUsers.map((user, i) =>
                i === index ? { ...user, [name]: value } : user
            )
        );
    };

    const isEmptyUsers = (users) => {
        return users.some((user) => {
            return Object.values(user).some(
                (value) => value === '' || value === null || value === undefined
            );
        });
    };

    const createUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            await AuthService.bulkCreateUsers(token, users);
            setMessage('Usuarios creados exitosamente');
            setOpenSnack(true);
        } catch (error) {
            setMessage('Error al crear usuarios');
            setOpenSnack(true);
            console.error('Error al crear usuarios:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEmptyUsers(users)) {
            setMessage('Debes completar todos los campos');
            setOpenSnack(true);
            return;
        }
        createUsers();
    };

    const handleAddRow = () => {
        setUsers(prevUsers => [...prevUsers, { ...initialUserState }]);
    };

    const handleDeleteRow = (index) => {
        setUsers(prevUsers => prevUsers.filter((user, i) => i !== index));
    };

    return (
        <Container>
            <SimpleSnackbar
                message={message}
                openSnack={openSnack}
                closeSnack={() => setOpenSnack(!openSnack)}
            />
            <Navbar />
            <h1 style={{ marginBottom: '20px' }}>Crear usuarios</h1>
            {users.map((user, index) => (
                <Stack key={index} direction="row" spacing={2} marginBottom={2}>
                    <TextField
                        className="form-input"
                        label="Nombre"
                        name="name"
                        value={user.name}
                        placeholder="Ingresar nombre"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleChange(e, index)}
                        required
                    />
                    <TextField
                        className="form-input"
                        label="Email"
                        name="email"
                        value={user.email}
                        placeholder="Ingresar correo"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleChange(e, index)}
                        required
                    />
                    <TextField
                        className="form-input"
                        type="password"
                        name="password"
                        value={user.password}
                        label="Contraseña"
                        placeholder="********"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleChange(e, index)}
                        required
                    />
                    <TextField
                        className="form-input"
                        type="password"
                        name="password_second"
                        value={user.password_second}
                        label="Confirmar contraseña"
                        placeholder="********"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleChange(e, index)}
                        required
                    />
                    <TextField
                        className="form-input"
                        label="Celular"
                        name="cellphone"
                        value={user.cellphone}
                        placeholder="912345678"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleChange(e, index)}
                        required
                    />
                    <IconButton aria-label="Eliminar usuario" onClick={() => handleDeleteRow(index)}>
                        <Delete />
                    </IconButton>
                </Stack>
            ))}
            <Button onClick={handleAddRow} style={{ marginTop: '10px', marginBottom: '20px' }}>
                Añadir
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
                Crear
            </Button>
        </Container>
    );
}