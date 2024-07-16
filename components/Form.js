import React from "react";
import { Card, CardContent, TextField, Button } from "@mui/material";

const Register = ({ id, updateFormData, formData, removeRegister }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(id, { ...formData, [name]: value });
  };

  return (
    <Card className="form">
      <CardContent>
        <h1>Register User</h1>
        <div className="input-form">
          <TextField
            id="outlined-basic"
            label="Nombre"
            variant="outlined"
            required
            name="name"
            value={formData.name || ""}
            placeholder="Oleh Oleig"
            onChange={handleChange}
          />
        </div>
        <div className="input-form">
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            required
            name="email"
            value={formData.email || ""}
            placeholder="alfa@beta.cl"
            onChange={handleChange}
          />
        </div>
        <div className="input-form">
          <TextField
            id="outlined-basic"
            label="Contraseña"
            variant="outlined"
            required
            name="password"
            type="password"
            value={formData.password || ""}
            placeholder="****"
            onChange={handleChange}
          />
        </div>
        <div className="input-form">
          <TextField
            id="outlined-basic"
            label="Confirmar Contraseña"
            variant="outlined"
            type="password"
            required
            name="password_second"
            value={formData.password_second || ""}
            placeholder="****"
            onChange={handleChange}
          />
        </div>
        <div className="input-form">
          <TextField
            id="outlined-basic"
            label="Teléfono"
            variant="outlined"
            required
            name="cellphone"
            value={formData.cellphone || ""}
            placeholder="+56987654321"
            onChange={handleChange}
          />
        </div>
        <Button variant="contained" color="secondary" onClick={() => removeRegister(id)}>
          Eliminar
        </Button>
      </CardContent>
    </Card>
  );
};

export default Register;


