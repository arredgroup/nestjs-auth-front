"use client"
import React, { useState, useEffect } from 'react';
import { TextField, Button, Stack, Container, Switch, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Navbar from '@/components/Navbar';
import AuthService from "../../services/AuthService";
import { useRouter } from 'next/navigation';

  const UserFilters = ({ onFilter }) => {
  const router = useRouter();
  
const [query, setQuery] = useState({ name : '', loginBeforeDate: '', loginAfterDate: '', status : true });

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setQuery((prevQuery) => ({
    ...prevQuery,
    [name]: value,
  }));
}

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user){
        router.push('/login');
    }

    getUser();

}, []);

const getUser = async (query) => {
    const token = localStorage.getItem('token');
    const data = await AuthService.getfindUsers(query, token);
    setUsers(data);
    console.log(data);
}

const handleSubmit = (event) => {
    event.preventDefault();
    getUser(query);
    console.log(users);
};
console.log(query);
return (
    <form onSubmit={handleSubmit}>
        <Navbar />
        <Container sx={{ marginTop: 10 }}>
            <Stack spacing={5} sx={{ justifyContent: 'center' }}>
            <Stack direction="row" spacing={5} sx={{ justifyContent: 'center' }}>
                <TextField name="name" label="Name" value={query.name} onChange={handleInputChange} />
                <TextField name="createdBefore" type="date" value={query.createdBefore} onChange={handleInputChange} />
                <TextField name="createdAfter" type="date" value={query.createdAfter} onChange={handleInputChange} />
                <Switch
                    checked={query.status}
                    onChange={(e) => {
                        const updatedQuery = { ...query, status: e.target.checked };
                        setQuery(updatedQuery);
                    }}
                    inputProps={{ 'aria-label': 'Status' }}
                />
                <Button type="submit" onClick={handleSubmit}>Filter</Button>
            </Stack>
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
                    {
                        users.map((user) => (
                            <TableRow key={user}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.status ? 'ACTIVO' : 'CERRADO'}</TableCell>
                                <TableCell>{new Date(user.updatedAt).toLocaleDateString('es-ES')}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>                        
            </Stack>
        </Container>
    </form>
);
};

export default UserFilters;