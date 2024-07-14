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
        const user = JSON.parse(localStorage.getItem('user'));
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
        if(name){
            filter.name = name;
        }
        if(loginBeforeDate){
            filter.before = dayjs(loginBeforeDate).format('YYYY-MM-DD');
        }
        if(loginAfterDate){
            filter.after = dayjs(loginAfterDate).format('YYYY-MM-DD');
        }
        if(status){
            filter.status = status;
        }
        console.log(filter);
        const token = localStorage.getItem('token');
        (async () => {
            const data = await AuthService.getFindUsers(filter, token);
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
                            <TableRow key={user}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.status? 'ACTIVO' : 'CERRADO'}</TableCell>
                                <TableCell>{dayjs(user.updatedAt).format('DD-MM-YYYY HH:mm:ss')}</TableCell>
                                <TableCell> logiado
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </ Container>
    )
}

export default Search;