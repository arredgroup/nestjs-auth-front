"use client";

import React, { useState } from 'react';
import { Container, Button, Grid, Typography } from "@mui/material";
import AuthService from "../../services/AuthService";
import Navbar from '../../components/Navbar';
import Form from '../../components/form';

const BulkCreate = () => {
  const [users, setUsers] = useState([{ name: '', email: '', password: '', password_second: '' }]);
  const [formCount, setFormCount] = useState(1);
  const [message, setMessage] = useState(''); 
  const handleInputChange = (id, name, value) => {
    setUsers(prevUsers => {
      const newUsers = [...prevUsers];
      newUsers[id - 1] = {
        ...newUsers[id - 1],
        [name]: value,
      };
      return newUsers;
    });
  };

  const handleBulkCreate = async () => {
    const token = localStorage.getItem("token");
    const success = await AuthService.bulkCreate(token, users);
    if (success) {
      setMessage(success);
    } else {
      setMessage("Error al crear usuarios");
    }
  };

  const addForm = () => {
    setFormCount(formCount + 1);
    setUsers(prevUsers => [...prevUsers, { name: '', email: '', password: '', password_second: '' }]);
  };

  const forms = [];
  for (let i = 1; i <= formCount; i++) {
    forms.push(<Form key={i} id={i} handleInputChange={handleInputChange} />);
  }

  return (
    <Container maxWidth="md">
      <Navbar />
      <h1>Bulk Create</h1>
      <Grid container spacing={2}>
        {forms}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={addForm}>
            Agregar otro Usuario
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleBulkCreate}>
            Procesar Todos los Datos
          </Button>
        </Grid>
        {message && (
          <Grid item xs={12}>
            <Typography variant="body1" color={message.includes("Error") ? "error" : "primary"}>
              {message}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default BulkCreate;
