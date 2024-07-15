"use client";

import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, FormControl,InputLabel,Select,MenuItem } from "@mui/material";
import AuthService from "../../services/AuthService";
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

const FindUsers = () => {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        if (!user || !token) {
            router.push('/login');
        } else if (user?.roles?.includes('admin')) {
            getAllUsers(token);
        } else if (user?.roles?.includes('user')) {
            getUser(user.id, token);
        }
    }, []);

    const getAllUsers = async (token) => {
        try {
            const data = await AuthService.getUsers(token);
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    const getUser = async (id, token) => {
        try {
            const data = await AuthService.getUserById(id, token);
            setUsers([data]);
        } catch (error) {
            console.error("Failed to fetch user:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuery((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSearch = async (e) => {
        e.preventDefault();
    
        // Construir la consulta dinámica
        let searchQuery = {};
        if (query.name) {
            searchQuery.name = query.name;
        }
        if (query.login_before_date) {
            searchQuery.login_before_date = query.login_before_date;
        }
        if (query.login_after_date) {
            searchQuery.login_after_date = query.login_after_date;
        }
        if (query.status) {
            searchQuery.status = query.status;
        }
        
    
    
        const token = localStorage.getItem('token');
        try {
            const data = await AuthService.findUsers(searchQuery, token);
            setUsers(data);
        } catch (error) {
            console.error("Failed to search users:", error);
        }
    
    };



    return (
        <Container>
            <Navbar />
            <h1>Users</h1>
            <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
                <TextField
                    name="name"
                    label="name"
                    value={query.name}
                    onChange={handleInputChange}
                    style={{ marginRight: '10px' }}
                />
                <FormControl style={{ marginRight: '10px', minWidth: 120 }}>
                    <InputLabel>Active</InputLabel>
                    <Select
                        name="status"
                        value={query.status}
                        onChange={handleInputChange}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="true">True</MenuItem>
                        <MenuItem value="false">False</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    name="login_before_date"
                    label="login_before_date"
                    value={query.login_before_date}
                    onChange={handleInputChange}
                    style={{ marginRight: '10px' }}
                />
                <TextField
                    name="login_after_date"
                    label="login_after_date"
                    value={query.login_after_date}
                    onChange={handleInputChange}
                    style={{ marginRight: '10px' }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Search
                </Button>
            </form>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Estado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.status ? 'ACTIVO' : 'CERRADO'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
        </Container>
    );
}

export default FindUsers;