"use client"
import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { Edit } from "@mui/icons-material";
import { styled } from '@mui/material/styles';

import AuthService from "../../services/AuthService";
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

const StyledTable = styled(Table)({
    backgroundColor: 'white',
});

const StyledTableCell = styled(TableCell)({
    backgroundColor: 'white',
});

export default function Users() {
    const router = useRouter();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            router.push('/login');
        }
        if (user?.roles?.includes('user')) {
            getAllUsers();
        }
    }, []);

    const getAllUsers = async () => {
        const token = localStorage.getItem('token');
        const data = await AuthService.getFindUser('', token);
        setUsers(data);
    }

    const getUser = async (id) => {
        const token = localStorage.getItem('token');
        const data = await AuthService.getUserById(id, token);
        setUsers([data]);
    }

    const handleEdit = (user) => {
        router.push('/users/' + user.id + '/edit');
    }

    return (
        <Container>
            <Navbar />
            <h1>Users</h1>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Nombre</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Estado</StyledTableCell>
                        <StyledTableCell>Última Sesión</StyledTableCell>
                        <StyledTableCell>Acciones</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map((user) => (
                            <TableRow key={user.id}>
                                <StyledTableCell>{user.name}</StyledTableCell>
                                <StyledTableCell>{user.email}</StyledTableCell>
                                <StyledTableCell>{user.status ? 'ACTIVO' : 'CERRADO'}</StyledTableCell>
                                <StyledTableCell>TBD</StyledTableCell>
                                <StyledTableCell>
                                    <IconButton color="primary" aria-label={"Editar usuario " + user.name} onClick={() => handleEdit(user)}>
                                        <Edit />
                                    </IconButton>
                                </StyledTableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </StyledTable>
        </Container>
    )
}