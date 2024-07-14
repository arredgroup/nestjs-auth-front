"use client"
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Alert, AlertTitle } from '@mui/material';
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar'
import AuthService from '../../../services/AuthService';

export default function BulkCreate() {
    const router = useRouter();
    const [users, setUsersData] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleInputChange = (index, field, value) => {
        const updatedUsersData = [...users];
        updatedUsersData[index][field] = value;
        setUsersData(updatedUsersData);
    };

    const addRow = () => {
        setUsersData([...users, { name: '', email: '', password: '', password_second: '', cellphone: '' }]);
    };

    const handleSubmit = async () => {
        try {
            console.log('Sending users:', users);
            const token = localStorage.getItem("token");
            const response = await AuthService.bulkCreate(token, users);
            setSuccessMessage(response.message);
            setErrorMessage(null);
            setUsersData([]);
        } catch (error) {
            setErrorMessage(error.message || 'An error occurred while creating users.');
            setSuccessMessage(null);
        }
    };

    return (
        <Container>
            <h1>Regresar a Index</h1>
            <button onClick={() => router.push('/users')}>Index</button>
            <Navbar />
            <Typography variant="h4" gutterBottom>
                Bulk Create
            </Typography>
            {successMessage && (
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {successMessage}
                </Alert>
            )}
            {errorMessage && (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                </Alert>
            )}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Contraseña</TableCell>
                        <TableCell>Confirmar Contraseña</TableCell>
                        <TableCell>Celular</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <TextField
                                    fullWidth
                                    required
                                    placeholder="Oleh Oleig"
                                    value={user.name}
                                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    fullWidth
                                    required
                                    placeholder="alfa@beta.cl"
                                    value={user.email}
                                    onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    fullWidth
                                    required
                                    type="password"
                                    placeholder="****"
                                    value={user.password}
                                    onChange={(e) => handleInputChange(index, 'password', e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    fullWidth
                                    required
                                    type="password"
                                    placeholder="****"
                                    value={user.password_second}
                                    onChange={(e) => handleInputChange(index, 'password_second', e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    fullWidth
                                    required
                                    placeholder="+56987654321"
                                    value={user.cellphone}
                                    onChange={(e) => handleInputChange(index, 'cellphone', e.target.value)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button variant="contained" color="primary" onClick={addRow}>
                Agregar Usuario
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Crear Usuarios en DB
            </Button>
        </Container>
    );
}