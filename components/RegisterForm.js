// components/RegisterForm.js
import React from 'react';
import { Card, CardContent, TextField } from "@mui/material";

const RegisterForm = ({ index }) => {
  return (
    <Card className="form">
      <CardContent>
        <h1>Register User {index + 1}</h1>
        <div className="input-form">
          <TextField
            id={`name-${index}`}
            label="Nombre"
            variant="outlined"
            required
            placeholder="Oleh Oleig"
          />
        </div>
        <div className="input-form">
          <TextField
            id={`email-${index}`}
            label="Email"
            variant="outlined"
            required
            placeholder="alfa@beta.cl"
          />
        </div>
        <div className="input-form">
          <TextField
            id={`password-${index}`}
            label="Contraseña"
            variant="outlined"
            required
            type="password"
            placeholder="****"
          />
        </div>
        <div className="input-form">
          <TextField
            id={`passwordSecond-${index}`}
            label="Confirmar Contraseña"
            variant="outlined"
            type="password"
            required
            placeholder="****"
          />
        </div>
        <div className="input-form">
          <TextField
            id={`cellphone-${index}`}
            label="Teléfono"
            variant="outlined"
            required
            placeholder="+56987654321"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
