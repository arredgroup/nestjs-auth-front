"use client"
import React, { useEffect, useState } from 'react';
import { Container, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, Switch } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/navigation';
import { Edit } from "@mui/icons-material";
import Navbar from '../../../components/Navbar';
import AuthService from "../../../services/AuthService";

export default function findUsers() {

    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [status, setStatus] = useState(true);
    const [login_before_date, setLogin_before] = useState(null);
    const [login_after_date, setLogin_after] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            router.push('/login');
        }
        if (user?.roles?.includes('user')) {
            getAllUsers('');
        }
    }, []);

    const getAllUsers = async () => {
        const filter = {};
        if (name) {
            filter.name = name;
        }
        if (status !== null) {
            filter.status = status;
        }
        if (login_before_date) {
            filter.login_before_date = login_before_date;
        }
        if (login_after_date) {
            filter.login_after_date = login_after_date;
        }
        const token = localStorage.getItem('token');
        (async () => {
            const data = await AuthService.getFindUser(filter, token);
            setUsers(data);
        })();
    }

    const handleEdit = (user) => {
        router.push('/users/' + user.id + '/edit');
    }

    return (
        <Container>
            <Navbar />
            <h1>Filtrar Usuarios</h1>
            <Stack direction="row" spacing={2}>
                <TextField
                    label="Name"
                    name="name"
                    variant="outlined"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="Login before"
                    name="login_before"
                    type='date'
                    variant="outlined"
                    onChange={(e) => setLogin_before(e.target.value)}
                    placeholder="Date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="Login after"
                    name="login_after"
                    type='date'
                    variant="outlined"
                    onChange={(e) => setLogin_after(e.target.value)}
                    placeholder="Date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Stack direction="column" spacing={1}>
                    <text>Estado</text>
                    <Switch
                        name="status"
                        label="Status"
                        checked={status}
                        value={status}
                        onChange={(e) => setStatus(e.target.checked)}
                    />
                </Stack>
                <div className="navbar-item">
                    <Button variant='contained' onClick={getAllUsers}>
                        Filtrar
                    </Button>
                </div>
            </Stack>
            <Table style={{ backgroundColor: 'white' }}>
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
    )
}