"use client";
import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, FormControlLabel, Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import AuthService from '@/services/AuthService';
import Navbar from '@/components/Navbar';
import { useRouter } from "next/navigation";

export default function FindUsers() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [nameFilter, setNameFilter] = useState("");
    const [loginBeforeDate, setLoginBeforeDate] = useState("");
    const [loginAfterDate, setLoginAfterDate] = useState("");
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            router.push("/login");
        } else if (user?.roles?.includes("admin")) {
            handleSearch();
        }
    }, []);

    const handleSearch = async () => {
        const token = localStorage.getItem("token");
        const filters = {
            name: nameFilter,
            Before: loginBeforeDate,
            After: loginAfterDate,
            status: isActive.toString() 
        };
        console.log("Searching with filters:", filters); 
        try {
            const result = await AuthService.findUsers(filters, token);
            console.log("Result from API:", result); 
            if (Array.isArray(result)) {
                setUsers(result);
            } else {
                console.error("Error: Result is not an array", result);
                setUsers([]);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            setUsers([]);
        }
    };

    return (
        <>
            <Navbar />
            <h1>Filtro de Usuarios</h1>
            <Container maxWidth="md">
                <Typography variant="h4">Filtros</Typography>
                <TextField
                    label="Nombre"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Desde"
                    type="date"
                    value={loginAfterDate}
                    onChange={(e) => setLoginAfterDate(e.target.value)}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Hasta"
                    type="date"
                    value={loginBeforeDate}
                    onChange={(e) => setLoginBeforeDate(e.target.value)}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />
                <FormControlLabel
                    control={<Checkbox checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />}
                    label="Active"
                />
                <Button variant="contained" color="primary" onClick={handleSearch}>
                    Buscar
                </Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Última Sesión</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.status ? 'Activo' : 'Inactivo'}</TableCell>
                                    <TableCell>{user.updatedAt}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">Usuarios no encontrados</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Container>
        </>
    );
}



