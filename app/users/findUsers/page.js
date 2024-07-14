"use client"
import React, {useEffect, useState} from 'react';
import {Container, Table, TableBody, TableCell, TableHead, TableRow,Switch} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import {Edit} from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AuthService from "@/services/AuthService";
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import Checkbox from '@mui/material/Checkbox';

export default function Users(){

    const router = useRouter();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            router.push('/login');
        }
        if(user?.roles?.includes('admin')){
            getUsersByFilter();
        }
        // esta página solo puede ser utilizada por un administrador
        if(user?.roles?.includes('user')){
            router.push('/users'); // lo envia a una pagina pública
        }
    }, []);

    const getUsersByFilter = async () => {
        const token = localStorage.getItem('token');
        const data = await AuthService.getFilteredUsers(token, filterActivo, userFilter);
        if(data.length == 0) alert('No se han encontrado coincidencias.')
        setUsers(data);
    }

    const handleEdit = (user) => {
        router.push('/users/' + user.id + '/edit');
    }

    
    const [restriction, setRestiction] = useState({
        minDate1:dayjs('2000-01-01'),
        maxDate1:dayjs('2099-12-31'),
        minDate2:dayjs('2000-01-01'),
        maxDate2:dayjs('2099-12-31'),
    });
    
    const [userFilter, setFilter] = useState({
        name: '',
        login_before_date: null,
        login_after_date: null,
        status: true
    });
    const [filterActivo, setActivo] = useState({
        date1: false,
        date2: false,
        status: false
    });

    const handleChange = (value, field) => {
        if(field=='login_before_date'){
            setRestiction({
                ...restriction,
                maxDate1: value.subtract(1,'day')
            });
        }
        else if(field=='login_after_date'){
            setRestiction({
                ...restriction,
                minDate2: value.add(1,'day')
            });
        }
        setFilter({
            ...userFilter,
            [field]: value
        });
    }
    const handleFilter = (value, field) => {
        setActivo({
            ...filterActivo,
            [field]: value
        });    
    }
    const handleUpdate = () => {
        const token = localStorage.getItem('token');
        
    }

    return (
        <Container>
            <Navbar />
            <div>
            <h1>Find by filters </h1>
            {<Container>
                <p className="text-small text-default-500"> Nombre usuario: </p>
                <TextField
                    label="Nombre"
                    name="name"
                    variant="outlined"
                    value={userFilter.name}
                    onChange={(e) => handleChange(e.target.value, 'name')}
                />
                <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <p className="text-small text-default-500"> Login después de la fecha: {filterActivo.date2 ? "" : "(deshabilitado)"}</p>
                    <DatePicker
                        maxDate={restriction.maxDate1}
                        minDate={restriction.minDate1}
                        value={userFilter.login_after_date}
                        onChange={(e) => handleChange(e, 'login_after_date')}
                    />
                    <Checkbox
                        checked={filterActivo.date2}
                        onChange={(e) => handleFilter(e.target.checked, 'date2')}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <p className="text-small text-default-500"> Login antes de la fecha: { filterActivo.date1 ? "" : "(deshabilitado)"}</p>
                    <DatePicker
                        minDate={restriction.minDate2}
                        value={userFilter.login_before_date}
                        onChange={(e) => handleChange(e, 'login_before_date')}
                    />
                    <Checkbox
                        checked={filterActivo.date1}
                        onChange={(e) => handleFilter(e.target.checked, 'date1')}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </LocalizationProvider>
                </div>
                <div className="flex flex-col gap-2">
                    <Switch
                        name="status"
                        checked={userFilter.status}
                        value={userFilter.status}
                        onChange={(e) => handleChange(e.target.checked, 'status')}
                    />
                    <Checkbox
                        checked={filterActivo.status}
                        onChange={(e) => handleFilter(e.target.checked, 'status')}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <p className="text-small text-default-500">Status: {userFilter.status ? "true" : "false"} {filterActivo.status ? "" : "(deshabilitado)"}</p>
                </div>
                <Button variant="contained" onClick={getUsersByFilter}>Buscar</Button>
            </Container>}
        </div>
            <h1>Users</h1>
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
