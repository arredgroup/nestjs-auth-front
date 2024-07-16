"use client";

import React from "react";
import { Container, Button } from "@mui/material";
import SimpleSnackbar from "@/components/SimpleSnackbar";
import AuthService from "@/services/AuthService";
import Register from "@/components/registerform";
import Navbar from "@/components/RegisterNavbar"; 

import './page.css';
import RegisterNavbar from "@/components/RegisterNavbar";

const Registers = () => {
  const [message, setMessage] = React.useState("");
  const [openSnack, setOpenSnack] = React.useState(false);
  const [registers, setRegisters] = React.useState([{ id: 0, formData: {} }]);

  const addRegister = () => {
    setRegisters([...registers, { id: registers.length, formData: {} }]);
  };

  const deleteRegister = (id) => {
    setRegisters(registers.filter(register => register.id !== id));
  };

  const updateFormData = (id, data) => {
    setRegisters(registers.map(register => register.id === id ? { ...register, formData: data } : register));
  };

  const handleRegisterAll = async () => {
    const emails = registers.map(register => register.formData.email);
    const uniqueEmails = new Set(emails);
    const existingUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // Verificar si hay emails duplicados en los formularios actuales
    if (emails.length !== uniqueEmails.size) {
      setMessage("Hay emails duplicados en los formularios.");
      setOpenSnack(true);
      return;
    }

    // Verificar si alguno de los emails ya está registrado
    for (const email of emails) {
      if (existingUsers.some(user => user.email === email)) {
        setMessage(`El email ${email} ya está registrado.`);
        setOpenSnack(true);
        return;
      }
    }

    for (const register of registers) {
      const { name, email, password, password_second, cellphone } = register.formData;
      if (password !== password_second) {
        setMessage(`Las contraseñas no coinciden para el registro ${register.id + 1}`);
        setOpenSnack(true);
        return;
      }
      const response = await AuthService.registerUser(name, email, password, password_second, cellphone);
      if (!response) {
        setMessage(`Error al registrar usuario ${register.id + 1}`);
        setOpenSnack(true);
        return;
      }
    }

    // Guardar los datos en localStorage
    const updatedUsers = [...existingUsers, ...registers.map(r => r.formData)];
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
    
    setMessage("Todos los usuarios registrados exitosamente!");
    setOpenSnack(true);
  };

  return (
    <Container className="flex-container">
      <RegisterNavbar />
      <SimpleSnackbar
        message={message}
        openSnack={openSnack}
        closeSnack={() => { setOpenSnack(!openSnack); }}
      />
      {registers.map((register, index) => (
        <div key={index} className="form">
          <Register
            id={register.id}
            updateFormData={updateFormData}
            formData={register.formData}
          />
          <Button onClick={() => deleteRegister(register.id)} variant="outlined" color="secondary">
            Eliminar
          </Button>
        </div>
      ))}
      <Button onClick={addRegister} variant="contained" color="primary">Añadir</Button>
      <Button onClick={handleRegisterAll} variant="contained" color="success">Registrar Todos</Button>
    </Container>
  );
};

export default Registers;
