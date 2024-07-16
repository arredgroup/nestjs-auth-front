"use client";
import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

export default function Users() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filterName, setFilterName] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterDateFrom, setFilterDateFrom] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            setUsers(registeredUsers);
            setFilteredUsers(registeredUsers); 
        }
    }, []);

    const handleLogout = () => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (currentUser) {
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            const userIndex = registeredUsers.findIndex(user => user.email === currentUser.email);
            if (userIndex !== -1) {
                registeredUsers[userIndex].status = 'false'; 
                localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            }
        }

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    const handleFilter = () => {
        let filtered = users;
        if (filterName) {
            filtered = filtered.filter(user => user.name.toLowerCase().includes(filterName.toLowerCase()));
        }
        if (filterStatus) {
            filtered = filtered.filter(user => user.status === filterStatus || (!user.status && filterStatus === 'false'));
        }
        if (filterDateFrom) {
            filtered = filtered.filter(user => new Date(user.loginDate) >= new Date(filterDateFrom));
        }
        setFilteredUsers(filtered);
    };

    return (
        <Container>
            <Navbar />
            <h1>Lista de usuarios</h1>
            <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                <TextField
                    label="Filter by Name"
                    variant="outlined"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    style={{ marginRight: 10 }}
                />
                <FormControl variant="outlined" style={{ marginRight: 10, minWidth: 150 }}>
                    <InputLabel>Filter by Status</InputLabel>
                    <Select
                        label="Filter by Status"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="true">true</MenuItem>
                        <MenuItem value="false">false</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Date From"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={filterDateFrom}
                    onChange={(e) => setFilterDateFrom(e.target.value)}
                    style={{ marginRight: 10 }}
                />
                <Button variant="contained" onClick={handleFilter}>Apply Filters</Button>
            </div>
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
                    {filteredUsers.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.status === 'true' ? 'true' : 'false'}</TableCell>
                            <TableCell>{user.loginDate ? new Date(user.loginDate).toLocaleString() : 'N/A'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}
