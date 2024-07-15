import React from 'react';
import { TextField, Grid } from '@mui/material';

const Form = ({ id, handleInputChange }) => {
  const handleChange = (e) => {
    handleInputChange(id, e.target.name, e.target.value);
  };

  return (
    <Grid container spacing={2} style={{ marginBottom: '20px' }}>
      <Grid item xs={12}>
        <h3>Usuario {id}</h3>
      </Grid>
      <Grid item xs={12}>
        <TextField label="Nombre" variant="outlined" fullWidth name="name" onChange={handleChange} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Email" variant="outlined" fullWidth name="email" onChange={handleChange} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Contraseña" type="password" variant="outlined" fullWidth name="password" onChange={handleChange} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Confirme Contraseña" type="password" variant="outlined" fullWidth name="password_second" onChange={handleChange} />
      </Grid>
    </Grid>
  );
};

export default Form;
