'use client';
import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { Edit } from "@mui/icons-material";
import AuthService from "../../services/AuthService";
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import axios from 'axios';

export default function Users() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        login_before_date: '',
        login_after_date: '',
        active: ''
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            router.push('/login');
        }
        if (user?.roles?.includes('admin')) {
            fetchUsers();
        }
        if (user?.roles?.includes('user')) {
            getUser(user.id);
        }
    }, [filters]);

    const fetchUsers = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/v1/users/findUsers', filters, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users', error);
        }
    };

    const getUser = async (id) => {
        const token = localStorage.getItem('token');
        const data = await AuthService.getUserById(id, token);
        setUsers([data]);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const handleEdit = (user) => {
        router.push('/users/' + user.id + '/edit');
    };

    return (
        <Container>
            <Navbar />
            <h1>Users</h1>
            <div>
                <label>
                    Name:
                    <input type="text" name="name" value={filters.name} onChange={handleFilterChange} />
                </label>
                <label>
                    Login Before Date:
                    <input type="date" name="login_before_date" value={filters.login_before_date} onChange={handleFilterChange} />
                </label>
                <label>
                    Login After Date:
                    <input type="date" name="login_after_date" value={filters.login_after_date} onChange={handleFilterChange} />
                </label>
                <label>
                    Active:
                    <select name="active" value={filters.active} onChange={handleFilterChange}>
                        <option value="">All</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </label>
                <button onClick={fetchUsers}>Apply Filters</button>
            </div>
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
                                <TableCell>{user.status ? 'ACTIVO' : 'CERRADO'}</TableCell>
                                <TableCell>TBD</TableCell>
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
