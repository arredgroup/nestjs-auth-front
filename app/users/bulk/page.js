"use client";
import React, { useState } from "react";
import { Container, Button, Stack, TextField, Alert, Snackbar } from "@mui/material";
import Navbar from '../../../components/Navbar';
import axios from "axios";

const bulkCreateUsers = async (token, users) => {
    try {
        const response = await axios.post(
            "http://localhost:3001/api/v1/users/bulkCreate",
            users,
            {
                headers: {
                    token,
                },
            }
        );
        return response.data;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export default function BulkCreateUsers() {
    const [users, setUsers] = useState([{}]);
    const [message, setMessage] = useState("");
    const [openSnack, setOpenSnack] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleChange = (e, index) => {
        setUsers(
            users.map((user, i) =>
                i === index ? { ...user, [e.target.name]: e.target.value } : user
            )
        );
    };

    const addUserRow = () => {
        setUsers([...users, {}]);
    };

    const removeUserRow = (index) => {
        setUsers(users.filter((_, i) => i !== index));
    };

    const validateUsers = (users) => {
        let errors = [];
        users.forEach((user, index) => {
            if (!user.name || !user.email || !user.password || !user.password_second || !user.cellphone) {
                errors.push({ index, message: "Todos los campos (nombre, email, contraseña, confirmar contraseña, celular) son requeridos" });
            }
            if (user.password !== user.password_second) {
                errors.push({ index, message: "Las contraseñas no coinciden" });
            }
        });
        return errors;
    };

    const createUsers = async () => {
        const validationErrors = validateUsers(users);
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        const token = localStorage.getItem("token");
        try {
            const response = await bulkCreateUsers(token, users);
            setMessage("Usuarios creados exitosamente!");
            setOpenSnack(true);
            setErrors([]);
            setTimeout(() => {
                setOpenSnack(false);
                setMessage("");
            }, 3000);
        } catch (e) {
            setMessage("Error al crear usuarios. Por favor, inténtelo de nuevo.");
            setOpenSnack(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createUsers();
    };

    return (
        <Container style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
            <Navbar />
            <Snackbar
                open={openSnack}
                autoHideDuration={3000}
                onClose={() => setOpenSnack(false)}
                message={message}
            />            
            <h1>Crear usuarios</h1>
            {errors.map((error, index) => (
                <Alert key={index} severity="error">{`Usuario ${error.index + 1}: ${error.message}`}</Alert>
            ))}
            <Button variant="contained" onClick={addUserRow} style={{ marginBottom: '10px' }}>
                Agregar usuario
            </Button>
            {users.map((user, index) => (
                <Stack key={index} direction="row" spacing={2} marginBottom={2}>
                    <TextField
                        label="Nombre"
                        name="name"
                        value={user?.name}
                        placeholder="Nombre"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleChange(e, index)}
                        style={{ width: '100%' }}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={user?.email}
                        placeholder="Correo@gmail.com"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleChange(e, index)}
                        style={{ width: '100%' }}
                    />
                    <TextField
                        type="password"
                        name="password"
                        value={user?.password}
                        label="Contraseña"
                        placeholder="******"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleChange(e, index)}
                        style={{ width: '100%' }}
                    />
                    <TextField
                        type="password"
                        name="password_second"
                        value={user?.password_second}
                        label="Confirmar contraseña"
                        placeholder="******"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleChange(e, index)}
                        style={{ width: '100%' }}
                    />
                    <TextField
                        label="Celular"
                        name="cellphone"
                        value={user?.cellphone}
                        placeholder="123456789"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleChange(e, index)}
                        style={{ width: '100%' }}
                    />
                    <Button variant="outlined" color="secondary" onClick={() => removeUserRow(index)}>
                        Eliminar Fila
                    </Button>
                </Stack>
            ))}
            {users.length > 0 && (
                <Button variant="contained" onClick={handleSubmit} style={{ marginTop: '10px' }}>
                    Crear
                </Button>
            )}
        </Container>
    );
}