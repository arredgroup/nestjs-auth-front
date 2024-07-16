"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, TextField, Button, Box } from '@mui/material';
import AuthService from '@/services/AuthService';
import SimpleSnackbar from '@/components/SimpleSnackbar';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_second: '',
    cellphone: ''
  });
  const [message, setMessage] = useState('');
  const [openSnack, setOpenSnack] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password || !form.password_second || !form.cellphone) {
      setMessage('Por favor, rellena todos los campos.');
      setOpenSnack(true);
      return;
    }

    if (!validateEmail(form.email)) {
      setMessage('El correo electrónico no tiene un formato válido.');
      setOpenSnack(true);
      return;
    }

    if (form.password !== form.password_second) {
      setMessage('Las contraseñas no coinciden.');
      setOpenSnack(true);
      return;
    }

    const response = await AuthService.registerUser(form.name, form.email, form.password, form.password_second, form.cellphone);
    if (response) {
      setMessage('Usuario registrado con éxito.');
    } else {
      setMessage('Error al registrar el usuario.');
    }
    setOpenSnack(true);
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  return (
    <Container>
      <h1>Registro</h1>
      <SimpleSnackbar message={message} openSnack={openSnack} closeSnack={() => setOpenSnack(!openSnack)} />
      <TextField
        fullWidth
        label="Nombre"
        variant="outlined"
        name="name"
        value={form.name}
        onChange={handleInputChange}
        style={{ marginBottom: '20px' }}
      />
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        name="email"
        value={form.email}
        onChange={handleInputChange}
        style={{ marginBottom: '20px' }}
      />
      <TextField
        fullWidth
        label="Contraseña"
        variant="outlined"
        type="password"
        name="password"
        value={form.password}
        onChange={handleInputChange}
        style={{ marginBottom: '20px' }}
      />
      <TextField
        fullWidth
        label="Confirmar Contraseña"
        variant="outlined"
        type="password"
        name="password_second"
        value={form.password_second}
        onChange={handleInputChange}
        style={{ marginBottom: '20px' }}
      />
      <TextField
        fullWidth
        label="Teléfono"
        variant="outlined"
        name="cellphone"
        value={form.cellphone}
        onChange={handleInputChange}
        style={{ marginBottom: '20px' }}
      />
      <Box display="flex" justifyContent="space-between" marginTop="20px">
        <Button variant="contained" color="primary" onClick={handleSubmit}>Registrar</Button>
        <Button variant="contained" color="secondary" onClick={handleBackToLogin}>Volver al Login</Button>
      </Box>
    </Container>
  );
};

export default Register;
