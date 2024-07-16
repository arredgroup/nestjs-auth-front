"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Button,Box } from "@mui/material";
import Navbar from '@/components/Navbar';
import RegisterForm from '@/components/RegisterForm';
import AuthService from '@/services/AuthService';
import SimpleSnackbar from '@/components/SimpleSnackbar';

const BulkCreate = () => {
  const [forms, setForms] = useState([{}]);
  const [message, setMessage] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const addForm = () => {
    setForms([...forms, {}]);
  };

  const removeForm = (index) => {
    setForms(forms.filter((_, i) => i !== index));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Por favor, inicia sesión primero');
      setOpenSnack(true);
      return;
    }

    const users = forms.map((_, index) => ({
      name: document.getElementById(`name-${index}`).value,
      email: document.getElementById(`email-${index}`).value,
      password: document.getElementById(`password-${index}`).value,
      password_second: document.getElementById(`passwordSecond-${index}`).value,
      cellphone: document.getElementById(`cellphone-${index}`).value,
    }));

    // Validación de campos vacíos
    const incompleteForms = users.filter(user =>
      !user.name || !user.email || !user.password || !user.password_second || !user.cellphone
    );
    if (incompleteForms.length > 0) {
      setMessage("Por favor, rellena todos los campos de los formularios.");
      setOpenSnack(true);
      return;
    }

    // Validación de formato de email
    const invalidEmails = users.filter(user => !validateEmail(user.email));
    if (invalidEmails.length > 0) {
      setMessage("Algunos correos electrónicos no tienen un formato válido.");
      setOpenSnack(true);
      return;
    }

    // Validación de contraseñas
    const invalidPasswords = users.filter(user => user.password !== user.password_second);
    if (invalidPasswords.length > 0) {
      setMessage("Algunas contraseñas no coinciden.");
      setOpenSnack(true);
      return;
    }

    const response = await AuthService.bulkCreateUsers(users);
    setMessage(response.message);
    setOpenSnack(true);
  };

  const handleBackToMenu = () => {
    router.push('/');
  };

  return (
    <Container>
      <Navbar />
      <h1>Registro de Usuarios</h1>
      <SimpleSnackbar message={message} openSnack={openSnack} closeSnack={() => setOpenSnack(!openSnack)} />
      {forms.map((_, index) => (
        <div key={index}>
          <RegisterForm index={index} />
          <Box display="flex" justifyContent="flex-end" marginBottom="10px">
            <Button onClick={() => removeForm(index)} color="secondary">Quitar</Button>
          </Box>
        </div>
      ))}
      <Box display="flex" justifyContent="space-between" marginTop="20px">
        <Button onClick={addForm} color="primary">Agregar Usuario</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>Registrar Todos</Button>
      </Box>
      <Box display="flex" justifyContent="center" marginTop="20px">
        <Button variant="contained" color="secondary" onClick={handleBackToMenu}>
          Volver al Menú Principal
        </Button>
      </Box>
    </Container>
  );
};

export default BulkCreate;