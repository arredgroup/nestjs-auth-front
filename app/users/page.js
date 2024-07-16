// Hola profesor, yo solo estaba en electivo Front End :c

"use client"
import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, ButtonGroup } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { Edit } from "@mui/icons-material";
import { useRouter } from 'next/navigation';
import MockAuthService from '../../services/MockAuthService';
import Navbar from '../../components/Navbar';
import { format } from 'date-fns';


const parseCustomDateFormat = (dateString) => {
    if (!dateString) {
        return null; 
    }

    const parts = dateString.split(/[\s,]+/); 

    if (parts.length < 4) {
        return null; 
    }

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; 
    const year = parseInt(parts[2], 10);
    const timeParts = parts[3].split(':');

    if (timeParts.length < 3) {
        return null; 
    }

    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year) || isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        return "Fecha inválida";
    }

    const parsedDate = new Date(year, month, day, hours, minutes, seconds);

    if (isNaN(parsedDate.getTime())) {
        return "Fecha inválida";
    }

    return parsedDate;
};


export default function Users() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            router.push('/login');
            return;
        }
        if (user.roles.includes('admin')) {
            getAllUsers();
        } else if (user.roles.includes('user')) {
            getUser(user.id);
        }
    }, []);

    useEffect(() => {
        filterUsers();
    }, [users, searchTerm, activeFilter]);

    const getAllUsers = async () => {
        const data = await MockAuthService.getUsers();
        setUsers(data);
    }

    const getUser = async (id) => {
        const data = await MockAuthService.getUserById(id);
        setUsers([data]);
    }

    const handleEdit = (user) => {
        router.push('/users/' + user.id + '/edit');
    }

    const filterUsers = () => {
        let filtered = users.filter(user => {
            if (searchTerm && !user.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }
            
            if (activeFilter === 'active' && !user.status) {
                return false;
            }
            if (activeFilter === 'inactive' && user.status) {
                return false;
            }

            return true;
        });

        setFilteredUsers(filtered);
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleFilterChange = (value) => {
        setActiveFilter(value);
    }

    return (
        <Container>
            Hola profesor, yo solo estaba en electivo Front End :c
            <Navbar />
            <h1>Usuarios</h1>
            <TextField
                label="Buscar por nombre"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginBottom: '16px' }}
            />
        
            <Button
                variant={activeFilter === 'all' ? 'contained' : 'outlined'}
                onClick={() => handleFilterChange('all')}
                style={{ marginRight: '8px' }}
            >
                Todos
            </Button>
            <Button
                variant={activeFilter === 'active' ? 'contained' : 'outlined'}
                onClick={() => handleFilterChange('active')}
                style={{ marginRight: '8px' }}
            >
                Activos
            </Button>
            <Button
                variant={activeFilter === 'inactive' ? 'contained' : 'outlined'}
                onClick={() => handleFilterChange('inactive')}
            >
                Inactivos
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => router.push('/users/bulkCreate')}
                style={{ margin: '16px 0' }}
            >
                Crear usuarios masivamente
            </Button>
            
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
                        filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.status ? 'Activo' : 'Inactivo'}</TableCell>
                                <TableCell>{typeof user.date === 'string' ? user.date : user.date ? format(parseCustomDateFormat(user.date), "dd/MM/yyyy, HH:mm:ss") : '-'}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(user)}>
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
