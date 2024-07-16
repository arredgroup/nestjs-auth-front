'use client';
import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Checkbox } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { Edit } from "@mui/icons-material";
import AuthService from "../../../services/AuthService";
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';

export default function Users() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        login_before_date: '',
        login_after_date: '',
        status: false,
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
        const data = await AuthService.getUsers();
        setUsers(data);
    }

    const getUser = async (id) => {
        const token = localStorage.getItem('token');
        const data = await AuthService.getUserById(id, token);
        setUsers([data]);
    }

    const applyFilters = async () => {
        const token = localStorage.getItem('token');
        const data = await AuthService.findUsers(token, filters);
        setUsers(data);
    }

    const handleEdit = (user) => {
        router.push('/users/' + user.id + '/edit');
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters({
            ...filters,
            [name]: type === 'checkbox' ? checked : value,
        });
    }

    return (
        <Container>
            <Navbar />
            <h1>Users</h1>
            <TextField name="name" label="Name" value={filters.name} onChange={handleChange} />
            <TextField name="login_before_date" label="Login Before Date" type="date" value={filters.login_before_date} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            <TextField name="login_after_date" label="Login After Date" type="date" value={filters.login_after_date} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            <Checkbox name="status" checked={filters.status} onChange={handleChange} /> active
            <Button onClick={applyFilters}>Apply Filters</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Última sesión</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.status ? 'active' : 'Inactive'}</TableCell>
                                <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" aria-label={"Edit user " + user.name} onClick={() => handleEdit(user)}>
                                        <Edit />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </Container>
    )
}