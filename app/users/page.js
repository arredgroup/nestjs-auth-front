"use client";
import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { Edit } from "@mui/icons-material";
import moment from 'moment';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import AuthService from "../../services/AuthService";

export default function Users() {
    const router = useRouter();
    const [users, setUsers] = useState([]);

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
        console.log(data);
    }

    const handleEdit = (user) => {
        router.push('/users/' + user.id + '/edit');
    }

    const handleFilterView = () => {
        router.push('/users/getUsers');
    }
    
    const handleBulkCreate = () => {
        router.push('/users/bulkCreate');
    }

    return (
        <Container>
            <Navbar />
            <h1>Users</h1>
            <Button variant="contained" color="primary" onClick={handleFilterView}>Filtrar usuarios</Button>
            <Button variant="contained" color="secondary" onClick={handleBulkCreate} style={{ marginLeft: 16 }}>Crear Usuarios Masivamente</Button>
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
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.status ? 'ACTIVO' : 'CERRADO'}</TableCell>
                            <TableCell>{user.lastLoginAt ? moment(user.lastLoginAt).format('DD-MM-YYYY HH:mm:ss') : null}</TableCell>
                            <TableCell>
                                <IconButton color="primary" aria-label={"Editar usuario " + user.name} onClick={() => handleEdit(user)}>
                                    <Edit />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    )
}
