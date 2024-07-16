"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Button } from "@mui/material";
import Navbar from '@/components/Navbar';
import RegisterForm from '@/components/RegisterForm';
import AuthService from '@/services/AuthService';
import './BulkCreate.css'; // Asegúrate de importar tu archivo CSS

const BulkCreate = () => {
  const [forms, setForms] = useState([{}]);
  const [message, setMessage] = useState("");
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
      setMessage('Debes iniciar sesión primero');
      alert('Debes iniciar sesión primero');
      return;
    }

    const users = forms.map((_, index) => ({
      name: document.getElementById(`name-${index}`).value,
      email: document.getElementById(`email-${index}`).value,
      password: document.getElementById(`password-${index}`).value,
      cellphone: document.getElementById(`cellphone-${index}`).value,
    }));
    console.log(users)

    // validar campos vacíos
    const incompleteForms = users.filter(user =>
      !user.name || !user.email || !user.password || !user.cellphone
    );
    if (incompleteForms.length > 0) {
      setMessage("Debes rellenar todos los campos en cada uno de los formularios");
      alert("Debes rellenar todos los campos en cada uno de los formularios");
      return;
    }

    // validar el formato del email
    const invalidEmails = users.filter(user => !validateEmail(user.email));
    if (invalidEmails.length > 0) {
      setMessage("Algunos correos no tienen el formato correcto");
      alert("Algunos correos no tienen el formato correcto");
      return;
    }

    const response = await AuthService.bulkCreateUsers(users);
    setMessage(`Usuario creado correctamente = ${response.successCount} Error al crear usuario = ${response.failureCount}`);
    console.log(response)
    alert(`Usuario creado correctamente = >>${response.successCount} Error al crear usuario = >>${response.failureCount}`);
  };

  return (
    <Container className="bulk-create-container">
      <Navbar />
      <h1 className="bulk-create-title">Registrar Usuarios Masivamente</h1>
      {forms.map((_, index) => (
        <div key={index} className="form-container">
          <RegisterForm index={index} />
          <Button variant="contained" color="secondary" onClick={() => removeForm(index)}>Quitar Usuario</Button>
        </div>
      ))}
      <div className="bulk-create-actions">
        <Button variant="outlined" color="primary" onClick={addForm}>Agregar Usuario</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>Registrar Todos Los Usuarios</Button>
      </div>
    </Container>
  );
};

export default BulkCreate;

