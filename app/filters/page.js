"use client"
import React, { useEffect, useState } from 'react';
import { Container, Select, MenuItem, FormControl, InputLabel, TextField, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthService from '@/services/AuthService';
import Navbar from '@/components/Navbar';

const Filters = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || '';
  const name = searchParams.get('name') || '';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchFilteredUsers = async () => {
      const filters = {
        status: status !== '' ? status : null,
        name: name !== '' ? name : null,
      };
      const data = await AuthService.findUsers(filters);
      setUsers(data);
    };
    fetchFilteredUsers();
  }, [status, name, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    router.push(`/filters?${params.toString()}`);
  };

  const handleBackToMenu = () => {
    router.push('/');
  };

  return (
    <Container>
      <Navbar />
      <h1>Filtros</h1>
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel id="statusFilterLabel">Filtrar por estado</InputLabel>
        <Select
          labelId="statusFilterLabel"
          id="statusFilter"
          name="status"
          value={status}
          onChange={handleInputChange}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="true">Activos</MenuItem>
          <MenuItem value="false">Inactivos</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Filtrar por nombre"
        variant="outlined"
        name="name"
        value={name}
        onChange={handleInputChange}
        style={{ marginBottom: '20px' }}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.status ? 'Activo' : 'Inactivo'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" color="secondary" onClick={handleBackToMenu} style={{ marginTop: '20px' }}>
        Volver al Menú Principal
      </Button>
    </Container>
  );
};

export default Filters;
