"use client";
import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import AuthService from '@/services/AuthService';
import Navbar from '@/components/Navbar';
import { useRouter } from "next/navigation";

export default function BulkCreateUsers() {
    const router = useRouter();
    const [users, setUsers] = useState([{ name: '', email: '', password: '', password_second: '', cellphone: '' }]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            router.push("/login");
        } else if (!user?.roles?.includes("admin")) {
            alert("No tienes permiso para acceder a esta página.");
            router.push("/");
        }
    }, [router]);

    const handleInputChange = (index, event) => {
        const values = [...users];
        values[index][event.target.name] = event.target.value;
        setUsers(values);
    };

    const handleAddUser = () => {
        setUsers([...users, { name: '', email: '', password: '', password_second: '', cellphone: '' }]);
    };

    const handleRemoveUser = (index) => {
        const values = [...users];
        values.splice(index, 1);
        setUsers(values);
    };

    const validateUsers = () => {
        const errorsArray = [];
        users.forEach((user, index) => {
            const userErrors = {};
            if (!user.name) userErrors.name = 'El nombre es requerido';
            if (!user.email) userErrors.email = 'El email es requerido';
            if (!user.password) userErrors.password = 'La contraseña es requerida';
            if (!user.password_second) userErrors.password_second = 'La confirmación es requerida';
            if (user.password !== user.password_second) userErrors.password_mismatch = 'Las contraseñas no coinciden';
            errorsArray[index] = userErrors;
        });
        return errorsArray;
    };

    const handleSubmit = async () => {
        const validationErrors = validateUsers();
        setErrors(validationErrors);

        const hasErrors = validationErrors.some((error) => Object.keys(error).length > 0);
        if (hasErrors) {
            alert('Por favor, corrige los errores antes de enviar.');
            return;
        }

        const token = localStorage.getItem('token');
        const result = await AuthService.bulkCreateUsers(users, token);
        if (result) {
            alert(`Usuarios creados exitosamente. Exitosos: ${result.successfulCount}, Fallidos: ${result.failedCount}`);
            if (result.failedCount > 0) {
                console.error('Usuarios fallidos:', result.failedUsers);
            }
        } else {
            alert('Error al crear usuarios');
        }
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="md">
                <Typography variant="h4">Crear Usuarios</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Password</TableCell>
                            <TableCell>Confirmar Password</TableCell>
                            <TableCell>Celular</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <TextField
                                        name="name"
                                        value={user.name}
                                        onChange={(event) => handleInputChange(index, event)}
                                        margin="normal"
                                        error={!!errors[index]?.name}
                                        helperText={errors[index]?.name}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        name="email"
                                        value={user.email}
                                        onChange={(event) => handleInputChange(index, event)}
                                        margin="normal"
                                        error={!!errors[index]?.email}
                                        helperText={errors[index]?.email}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        name="password"
                                        type="password"
                                        value={user.password}
                                        onChange={(event) => handleInputChange(index, event)}
                                        margin="normal"
                                        error={!!errors[index]?.password}
                                        helperText={errors[index]?.password}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        name="password_second"
                                        type="password"
                                        value={user.password_second}
                                        onChange={(event) => handleInputChange(index, event)}
                                        margin="normal"
                                        error={!!errors[index]?.password_second || !!errors[index]?.password_mismatch}
                                        helperText={errors[index]?.password_second || errors[index]?.password_mismatch}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        name="cellphone"
                                        value={user.cellphone}
                                        onChange={(event) => handleInputChange(index, event)}
                                        margin="normal"
                                        error={!!errors[index]?.cellphone}
                                        helperText={errors[index]?.cellphone}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleRemoveUser(index)}
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button 
                    variant="contained"
                    color="primary"
                    onClick={handleAddUser}
                    style={{ marginRight: '10px' }}
                >
                    Añadir Usuario
                </Button >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Crear Usuarios
                </Button>
            </Container>
        </>
    );
}


