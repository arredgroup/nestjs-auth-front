"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import { parseISO } from 'date-fns';
import Navbar from '../../components/Navbar';
import AuthService from '../../services/AuthService';
import './Users.css'; 


const Users = () => {
  const [users, setUsers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const name = searchParams.get('name');
  const logAfter = searchParams.get('logAfter');
  const logBefore = searchParams.get('logBefore');

  useEffect(() => {
    const fetchData = async () => {
      const storedUsers = await AuthService.getUsers();
      const storedSessions = JSON.parse(localStorage.getItem('sessions')) || [];
      setUsers(storedUsers);
      setSessions(storedSessions);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = users;

    if (status !== null) {
      const isActive = status === 'true';
      filtered = filtered.filter(user => user.status === isActive);
    }

    if (name !== null) {
      filtered = filtered.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (logAfter !== null) {
      const logAfterDate = parseISO(logAfter);
      filtered = filtered.filter(user => {
        const userSessions = sessions.filter(session => session.id_user === user.id);
        return userSessions.some(session => parseISO(session.createdAt) > logAfterDate);
      });
    }

    if (logBefore !== null) {
      const logBeforeDate = parseISO(logBefore);
      filtered = filtered.filter(user => {
        const userSessions = sessions.filter(session => session.id_user === user.id);
        return userSessions.some(session => parseISO(session.createdAt) < logBeforeDate);
      });
    }

    setFilteredUsers(filtered);
  }, [status, name, logAfter, logBefore, users, sessions]);

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    const params = new URLSearchParams(window.location.search);
    if (selectedStatus) {
      params.set('status', selectedStatus);
    } else {
      params.delete('status');
    }
    router.push(`/users?${params.toString()}`);
  };

  const handleNameChange = (event) => {
    const selectedName = event.target.value;
    const params = new URLSearchParams(window.location.search);
    if (selectedName) {
      params.set('name', selectedName);
    } else {
      params.delete('name');
    }
    router.push(`/users?${params.toString()}`);
  };

  const handleLogAfterChange = (event) => {
    const selectedDate = event.target.value;
    const params = new URLSearchParams(window.location.search);
    if (selectedDate) {
      params.set('logAfter', selectedDate);
    } else {
      params.delete('logAfter');
    }
    router.push(`/users?${params.toString()}`);
  };

  const handleLogBeforeChange = (event) => {
    const selectedDate = event.target.value;
    const params = new URLSearchParams(window.location.search);
    if (selectedDate) {
      params.set('logBefore', selectedDate);
    } else {
      params.delete('logBefore');
    }
    router.push(`/users?${params.toString()}`);
  };

  return (
    <Container maxWidth="sm">
      <Navbar />
      <h1>Lista de Usuarios</h1>
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel id="statusFilterLabel">Filtrar por estado</InputLabel>
        <Select
          labelId="statusFilterLabel"
          id="statusFilter"
          value={status || ''}
          onChange={handleStatusChange}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="true">Activo</MenuItem>
          <MenuItem value="false">Inactivo</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Filtrar por nombre"
        variant="outlined"
        value={name || ''}
        onChange={handleNameChange}
        style={{ marginBottom: '20px' }}
      />
      <TextField
        fullWidth
        label="Filtrar por fecha de inicio de sesión después de"
        variant="outlined"
        type="date"
        value={logAfter || ''}
        onChange={handleLogAfterChange}
        InputLabelProps={{
          shrink: true,
        }}
        style={{ marginBottom: '20px' }}
      />
      <TextField
        fullWidth
        label="Filtrar por fecha de inicio de sesión antes de"
        variant="outlined"
        type="date"
        value={logBefore || ''}
        onChange={handleLogBeforeChange}
        InputLabelProps={{
          shrink: true,
        }}
        style={{ marginBottom: '20px' }}
      />
      <table className="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.cellphone}</td>
              <td>{user.status ? 'Activo' : 'Inactivo'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default Users;
