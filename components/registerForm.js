// components/RegisterForm.js
import React from 'react';
import { Card, CardContent, TextField } from "@mui/material";

const RegisterForm = ({ index, formData, errors, updateFormData }) => {
  const handleChange = (field, value) => {
    updateFormData(index, { ...formData, [field]: value });
  };

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
            value={formData.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
          />
        </div>
        <div className="input-form">
          <TextField
            id={`email-${index}`}
            label="Email"
            variant="outlined"
            required
            placeholder="alfa@beta.cl"
            value={formData.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
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
            value={formData.password || ''}
            onChange={(e) => handleChange('password', e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
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
            value={formData.password_second || ''}
            onChange={(e) => handleChange('password_second', e.target.value)}
            error={!!errors.password_second}
            helperText={errors.password_second}
          />
        </div>
        <div className="input-form">
          <TextField
            id={`cellphone-${index}`}
            label="Teléfono"
            variant="outlined"
            required
            placeholder="+56987654321"
            value={formData.cellphone || ''}
            onChange={(e) => handleChange('cellphone', e.target.value)}
            error={!!errors.cellphone}
            helperText={errors.cellphone}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
