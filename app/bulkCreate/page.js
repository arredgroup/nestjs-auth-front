"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Button } from "@mui/material";
import Navbar from '@/components/Navbar';
import RegisterForm from '@/components/registerForm';
import AuthService from '@/services/AuthService';
import SimpleSnackbar from '@/components/SimpleSnackbar';

const BulkCreate = () => {
  const [forms, setForms] = useState([{ id: 0, formData: {}, errors: {} }]);
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
    setForms([...forms, { id: forms.length, formData: {}, errors: {} }]);
  };

  const removeForm = (id) => {
    setForms(forms.filter(form => form.id !== id));
  };

  const updateFormData = (id, data) => {
    setForms(forms.map(form => form.id === id ? { ...form, formData: data } : form));
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

    const newForms = forms.map((form) => {
      const newErrors = {};
      if (!form.formData.name) newErrors.name = "Este campo es obligatorio.";
      if (!form.formData.email) newErrors.email = "Este campo es obligatorio.";
      if (!form.formData.password) newErrors.password = "Este campo es obligatorio.";
      if (form.formData.password !== form.formData.password_second) newErrors.password_second = "Las contraseñas no coinciden.";
      if (!form.formData.cellphone) newErrors.cellphone = "Este campo es obligatorio.";
      if (form.formData.email && !validateEmail(form.formData.email)) newErrors.email = "El formato del email no es válido.";
      return { ...form, errors: newErrors };
    });

    setForms(newForms);

    const hasErrors = newForms.some(form => Object.keys(form.errors).length > 0);
    if (hasErrors) {
      setMessage("Por favor, corrige los errores en los formularios.");
      setOpenSnack(true);
      return;
    }

    let users = newForms.map(form => ({
      name: form.formData.name,
      email: form.formData.email,
      password: form.formData.password,
      password_second: form.formData.password_second,
      cellphone: form.formData.cellphone
    }));

    let objetos = { users };

    console.log('Users to be sent:', objetos); // Asegúrate de que los datos son correctos

    try {
      const response = await AuthService.bulkCreateUsers(objetos); // Enviar como objeto con clave 'users'
      if (response && response.message) {
        setMessage(`Usuarios creados: ${response.message.successful}, fallidos: ${response.message.failed}`);
      } else {
        setMessage('Error inesperado al crear usuarios');
      }
    } catch (error) {
      setMessage('Error al conectar con el servidor');
    }
    setOpenSnack(true);
  };

  return (
    <Container>
      <Navbar />
      <h1>Registrar Múltiples Usuarios</h1>
      <SimpleSnackbar message={message} openSnack={openSnack} closeSnack={() => setOpenSnack(!openSnack)} />
      {forms.map((form, index) => (
        <div key={index}>
          <RegisterForm
            index={index}
            formData={form.formData}
            errors={form.errors}
            updateFormData={updateFormData}
          />
          <Button onClick={() => removeForm(form.id)}>Quitar</Button>
        </div>
      ))}
      <Button onClick={addForm}>Agregar Usuario</Button>
      <Button variant="contained" color="primary" onClick={handleSubmit}>Registrar Todos</Button>
    </Container>
  );
};

export default BulkCreate;
