"use client";
import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { Edit } from "@mui/icons-material";

import AuthService from "../../services/AuthService";
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import SearchFilters from '@/components/SearchFilters';

export default function Users() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            router.push('/login');
        } else if (user.roles.includes('admin')) {
            getAllUsers();
        } else if (user.roles.includes('user')) {
            //getUser(user.id);
            getAllUsers();
        }
    }, [filters]); // <-- Run when filters change

    const getAllUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await AuthService.findUsers(filters, token);
            if (response && response.message) { 
                setUsers(response.message); 
            } else {
                setUsers([]); 
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]); 
        }
    }

    const getUser = async (id) => {
        const token = localStorage.getItem('token');
        const data = await AuthService.getUserById(id, token);
        setUsers([data]);
    }

    const handleEdit = (user) => {
        router.push('/users/' + user.id + '/edit');
    }

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
        //console.log('New filters:', newFilters);
    }

    return (
        <Container>
            <Navbar />
            <h1>Users</h1>
            <SearchFilters onApplyFilters={handleApplyFilters} />
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
                                <TableCell>{user.updatedAt}</TableCell> {/* Assuming this field exists in your backend response */}
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
    )
}
