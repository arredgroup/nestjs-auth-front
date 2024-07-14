"use client"
import Navbar from '@/components/Navbar';
import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';

import AuthService from "@/services/AuthService";
import {Container, Table, TableBody, TableCell, TableHead, TableRow, Stack, Switch} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const Search = (props) => {
    const {id} = props.params;
    const [user, setUser] = useState(null);
    const [loginBeforeDate, setLoginBeforeDate] = useState(null);
    const [loginAfterDate, setLoginAfterDate] = useState(null);
    const [name, setName] = useState('');
    const [status, setStatus] = useState(true);

    const [users, setUsers] = useState([]);


    useEffect(() => {
        //Comprobación de token expiración
        const user = JSON.parse(localStorage.getItem('user'));
        const expirationTime = new Date(user.expiration);
        const currentTime = new Date();
        
        if (currentTime >= expirationTime) {
                console.log('El token ha expirado');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                router.push('/login');
                return;
        }
        if(!user){
            router.push('/login');
        }
        const token = localStorage.getItem('token');
        (async () => {
            const data = await AuthService.getFindUsers([], token);
            setUsers(data);
            
        })();
    }, []);

    const handleSumbit = () => {
        const filter = {};
        console.log(status);
        if(status !== null){
            console.log(status);
            filter.status = status;
        }
        if(name){
            filter.name = name;
        }
        if(loginBeforeDate){
            filter.before = dayjs(loginBeforeDate).format('YYYY-MM-DD');
        }
        if(loginAfterDate){
            filter.after = dayjs(loginAfterDate).format('YYYY-MM-DD');
        }
        const token = localStorage.getItem('token');
        (async () => {
            const data = await AuthService.getFindUsers(filter, token);
            console.log(data);
            setUsers(data);
        })()    ;
        
    }

    const handleClearFilters = async () => {
        setName('');
        setLoginBeforeDate(null);
        setLoginAfterDate(null);
        setStatus(true);
        const token = localStorage.getItem('token');
        const data = await AuthService.getFindUsers([], token);
        setUsers(data);
    };
    return (
        <Container>
        <Navbar />
            {!users ? "No hay datos" : 
            <Container style={{ marginTop: 30 }}>
                 <Stack justifyContent={'center'} alignItems={'center'}>
                    <Stack direction={'row'} spacing={3}>
                        <TextField                     
                            label="Nombre"
                            name="name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}  
                        >Nombre</TextField>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                            label="Logeado despues"
                            value={loginBeforeDate}
                            format="DD-MM-YYYY"
                            onChange={(newValue) => setLoginBeforeDate(newValue)}
                         />
                           <DatePicker 
                            label="Logeado antes"
                            value={loginAfterDate}
                            format="DD-MM-YYYY"
                            onChange={(newValue) => setLoginAfterDate(newValue)}
                         />
                         </LocalizationProvider>
                         <Switch
                            name="status"
                            checked={status}
                            value={status}
                            onChange={(e) => setStatus(e.target.checked)}
                            />
                         <Button variant="contained" onClick={handleSumbit}>Filtrar</Button>
                         <Button variant="contained" onClick={handleClearFilters}>Limpiar Filtros</Button>
                         </Stack>

                    </Stack>
            </Container>}    
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
                            user.Sessions && user.Sessions.length > 0 ? (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.status ? 'ACTIVO' : 'CERRADO'}</TableCell>
                                    <TableCell>{dayjs(user.Sessions[0].expiration).format('DD-MM-YYYY HH:mm:ss')}</TableCell>
                                    <TableCell>Logiado</TableCell>
                                </TableRow>
                            ) : null // No renderiza nada si no hay sesiones
                        ))
                    }
                </TableBody>
            </Table>
        </ Container>
    )
}

export default Search;