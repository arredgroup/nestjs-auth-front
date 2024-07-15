"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { 
    Card, 
    Container, 
    FormControl, 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableRow,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Typography,
    TextField,
    Button } from "@mui/material";

import Navbar from '@/components/Navbar';
import AuthService from '../../services/AuthService';

import './page.css';

export default function UserList() {
    const router = useRouter()
    const [name, setName] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const [loginAfterDate, setLoginAfterDate] = useState(null);
    const [loginBeforeDate, setLoginBeforeDate] = useState(null);


    const [users, setUsers] = useState([]);

    const getAllUsers = async () => {
        const token = localStorage.getItem('token');
        const data = await AuthService.getAllUsers(token);
        setUsers(data);
    }

    const getSearchedUsers = async () => {
        const token = localStorage.getItem('token');
        const afterDate = loginAfterDate && new Date(loginAfterDate);
        const beforeDate = loginBeforeDate && new Date(loginBeforeDate);

        console.log("date page:", afterDate);

        const data = await AuthService.getFilterUsers(
            token, 
            name, 
            userStatus, 
            afterDate, 
            beforeDate
        );

        setUsers(data);
    }

    const handleSearch = () => {
        if (
            !name &&
            !(typeof userStatus === 'boolean') &&
            !loginAfterDate &&
            !loginBeforeDate
        ) getAllUsers();

        getSearchedUsers();
    }

    const handleClearForm = () => {
        setName('');
        setUserStatus('');
        setLoginAfterDate(null);
        setLoginBeforeDate(null);
    }

    const getLastSession = (user) => {
        if (user.Sessions.length === 0) {
            return "---";
        }
        
        const lastSession = new Date(user.Sessions.pop().createdAt);
        const day = String(lastSession.getDate()).padStart(2, '0');
        const month = String(lastSession.getMonth() + 1).padStart(2, '0');
        const year = lastSession.getFullYear();

        return `${day}-${month}-${year}`;
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            router.push('/login');
        } else {
            getAllUsers();
        }
    }, []);


    return (

        <Container style={{ "display": "flex", "flexDirection": "column", "gap": "2rem" }}>
            <Navbar section="1"></Navbar>
            <h1>Lista de usuarios</h1>
            <Card className='form-container'>
                <div className='filter-form'>
                    <div className="input-form">
                        <TextField
                            id="outlined-basic"
                            label="Nombre"
                            variant="outlined"
                            placeholder="Nombre del usuario"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                        />
                    </div>
                    <FormControl>
                        <InputLabel id="user-status-label">Estado</InputLabel>
                        <Select
                            labelId="user-status-label"
                            id="user-status"
                            value={userStatus}
                            label="Estado"
                            onChange={(e) => setUserStatus(e.target.value)}
                        >
                            <MenuItem value={null}>Todos</MenuItem>
                            <MenuItem value={true}>Activo</MenuItem>
                            <MenuItem value={false}>Cerrado</MenuItem>
                        </Select>
                    </FormControl>
                    <Stack direction="column" spacing={1} alignItems="left">
                        <Typography variant="subtitle1" gutterBottom>
                            Inicios de sesión:
                        </Typography>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker value={loginAfterDate} onChange={(v) => setLoginAfterDate(v)} label="Despues de:" />
                        <DatePicker value={loginBeforeDate} onChange={(v) => setLoginBeforeDate(v)} label="Antes de:" />
                        </LocalizationProvider>
                    </Stack>
                    <div className='btn-area-form'>
                        <Button variant="contained" onClick={handleSearch}>Buscar</Button>
                        <Button variant="outlined" color="error" onClick={handleClearForm}>
                        Limpiar
                        </Button>
                    </div>
                </div>
            </Card>
            <Card style={{marginBottom: '3rem'}}>
                {users ? <Table>
                    <TableHead>
                        <TableRow className='table-head'>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Última Sesión</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map((user) => (
                                <TableRow key={user}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.status ? "Activo" : "Cerrado"}</TableCell>
                                    <TableCell>{getLastSession(user)}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table> :
                <div className='search-result-null'>No hay resultados</div>
                } 
            </Card>
        </Container>
    );
}