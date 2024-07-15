"use client";
import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField } from "@mui/material";
import moment from 'moment';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import AuthService from '../../../services/AuthService';


export default function FilteredUsers() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        login_before_date: '',
        login_after_date: '',
        active: true
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            router.push('/login');
        } else {
            fetchFilteredUsers();
        }
    }, []);

    const fetchFilteredUsers = async () => {
        const { name, login_before_date, login_after_date, active } = filters;
        const query = new URLSearchParams({
            name,
            loggedInBefore: login_before_date,
            loggedInAfter: login_after_date,
            deleted: !active,
        }).toString();
        const data = await AuthService.getFilteredUsers(query);
        setUsers(data);
    }

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    }

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchFilteredUsers();
    }

    const handleHomeView = () => {
        router.push('/users');
    }

    return (
        <Container>
            <Navbar />
            <Button variant="contained" color="primary" onClick={handleHomeView}>Volver a Inicio</Button>
            <h1>Usuarios filtrados</h1>
            <form onSubmit={handleFilterSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    value={filters.name}
                    onChange={handleFilterChange}
                    margin="normal"
                />
                <TextField
                    label="Login antes de"
                    name="login_before_date"
                    type="datetime-local"
                    value={filters.login_before_date}
                    onChange={handleFilterChange}
                    margin="normal"
                />
                <TextField
                    label="Login después de"
                    name="login_after_date"
                    type="datetime-local"
                    value={filters.login_after_date}
                    onChange={handleFilterChange}
                    margin="normal"
                />
                <TextField
                    label="Activo"
                    name="active"
                    value={filters.active}
                    onChange={handleFilterChange}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Filtrar
                </Button>
            </form>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Última Sesión</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.status ? 'ACTIVO' : 'CERRADO'}</TableCell>
                            <TableCell>{user.lastLoginAt ? moment(user.lastLoginAt).format('DD-MM-YYYY HH:mm:ss') : null}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    )
}

