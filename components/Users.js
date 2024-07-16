"use client";
import React, {useEffect, useState} from 'react';
import {Container, Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, FormControlLabel, Checkbox, Card, CardContent} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import {Edit} from "@mui/icons-material";
import { useRouter } from 'next/navigation';
import Navbar from './Navbar';
import './UserList.module.css';

export default function Users() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({
        name: "",
        login_before_date: "",
        login_after_date: "",
        active: false,
    });

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

    const getAllUsers = async () => {
        const data = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(data);
    };

    const getUser = async (id) => {
        const token = localStorage.getItem('token');
        const data = await AuthService.getUserById(id, token);
        setUsers([data]);
    };

    const handleEdit = (user) => {
        router.push('/users/' + user.id + '/edit');
    };

    const handleChange = (field, value) => {
        setFilters({ ...filters, [field]: value });
    };

    const filterUsers = () => {
        let filteredUsers = JSON.parse(localStorage.getItem("users")) || [];
        if (filters.name) {
            filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(filters.name.toLowerCase()));
        }
        if (filters.login_before_date) {
            filteredUsers = filteredUsers.filter(user => new Date(user.lastLogin) < new Date(filters.login_before_date));
        }
        if (filters.login_after_date) {
            filteredUsers = filteredUsers.filter(user => new Date(user.lastLogin) > new Date(filters.login_after_date));
        }
        if (filters.active) {
            filteredUsers = filteredUsers.filter(user => user.active === filters.active);
        }
        setUsers(filteredUsers);
    };

    return (
        <Container>
            <Navbar />
            <h1>Users</h1>
            <Card className="form">
                <CardContent>
                    <h2>Filtros</h2>
                    <div className="input-form">
                        <TextField
                            label="Nombre"
                            variant="outlined"
                            value={filters.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                        />
                        <TextField
                            label="Login Antes de Fecha"
                            variant="outlined"
                            type="date"
                            value={filters.login_before_date}
                            onChange={(e) => handleChange("login_before_date", e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Login Después de Fecha"
                            variant="outlined"
                            type="date"
                            value={filters.login_after_date}
                            onChange={(e) => handleChange("login_after_date", e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.active}
                                    onChange={(e) => handleChange("active", e.target.checked)}
                                />
                            }
                            label="Activo"
                        />
                        <Button variant="contained" onClick={filterUsers}>Aplicar Filtros</Button>
                    </div>
                </CardContent>
            </Card>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Última Sesión</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.active ? 'ACTIVO' : 'CERRADO'}</TableCell>
                                <TableCell>{user.lastLogin}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" aria-label={"Editar usuario " + user.name} onClick={() => handleEdit(user)}>
                                        <Edit />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </Container>
    );
}
