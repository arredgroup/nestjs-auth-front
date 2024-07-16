'use client';
import React, { useState, useEffect } from 'react';
import AuthService from "../../services/AuthService";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

export default function BulkCreate() {
  const router = useRouter();
  const [usersData, setUsersData] = useState([
    { name: '', email: '', password: '', password_second: '', cellphone: '' },
  ]);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedUsersData = [...usersData];
    updatedUsersData[index][field] = value;
    setUsersData(updatedUsersData);
  };

  const handleAddUser = () => {
    setUsersData([
      ...usersData,
      { name: '', email: '', password: '', password_second: '', cellphone: '' },
    ]);
  };

  const handleSubmit = async () => {

    console.log(usersData);
    const response = await AuthService.handlebulkCreate(usersData,token);
    console.log(response)
  };

  return (
    <Container>
      <Navbar />
      <h1>Crear Usuarios Masivamente</h1>
      <Typography variant="body1" color="error">
        {message}
      </Typography>
      <Box component={Paper} p={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contraseña</TableCell>
                <TableCell>Confirmar Contraseña</TableCell>
                <TableCell>Teléfono</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersData.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      value={user.name}
                      onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={user.email}
                      onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="password"
                      value={user.password}
                      onChange={(e) => handleInputChange(index, 'password', e.target.value)}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="password"
                      value={user.password_second}
                      onChange={(e) => handleInputChange(index, 'password_second', e.target.value)}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={user.cellphone}
                      onChange={(e) => handleInputChange(index, 'cellphone', e.target.value)}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" onClick={handleAddUser}>
          Agregar Usuario
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Crear Usuarios
        </Button>
      </Box>
    </Container>
  );
}
