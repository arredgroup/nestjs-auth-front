"use client"
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AuthService from "@/services/AuthService";
import { useRouter } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
export default function AddUsers() {
    const [users, setUsers] = useState([{ name: "", email: "", password: "", cellphone: "" }]);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const router = useRouter();
    const handleInputChange = (index, event) => {
        const values = [...users];
        values[index][event.target.name] = event.target.value;
        setUsers(values);
    };

    const handleAddUser = () => {
        setUsers([...users, { name: "", email: "", password: "", cellphone: "" }]);
    };

    const handleDeleteUser = (index) => {
        const values = [...users];
        values.splice(index, 1);
        setUsers(values);
    };

    const handleBack = () => {
        router.push('/users');
    }

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        try {
            console.log("usuarios nuevos:", users);
            const data = await AuthService.bulkCreate(users, token);
            console.log("respuesta", data);
            setAlertMessage(`Usuarios Creados: ${data.data.Creados} - Usuarios No Creados: ${data.data.Fallos}`); // Formatear el JSON para una mejor legibilidad
            setAlertOpen(true);
        } catch (e) {
            console.error(e);
            setAlertMessage("Error al crear usuarios.");
            setAlertOpen(true);
        }
    };

    return (
        <div>
             <IconButton color="primary" aria-label='Ver lista de usuarios' onClick={handleBack}>Volver</IconButton> <br />
            <h1>Agregar Usuarios</h1>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '80ch' },
                }}
                noValidate
                autoComplete="off"
            >
                {users.map((user, index) => (
                    <Grid container spacing={2} key={index} alignItems="center">
                        <Grid item xs={12} sm={6} md={2}>
                            <TextField
                                label="Nombre"
                                variant="outlined"
                                name="name"
                                value={user.name}
                                onChange={event => handleInputChange(index, event)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                name="email"
                                value={user.email}
                                onChange={event => handleInputChange(index, event)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <TextField
                                label="Contraseña"
                                variant="outlined"
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={event => handleInputChange(index, event)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <TextField
                                label="Cellphone"
                                variant="outlined"
                                name="cellphone"
                                value={user.cellphone}
                                onChange={event => handleInputChange(index, event)}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <Button variant="contained" color="error" onClick={() => handleDeleteUser(index)}>
                                Eliminar
                            </Button>
                        </Grid>
                    </Grid>
                ))}
                <Button variant="contained" onClick={handleAddUser} sx={{ mt: 2 }}>+1</Button> <br/>
                <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2, ml: 1 }}>Crear Usuarios</Button>
            </Box>
            {alertOpen && (
                <Alert severity="info" onClose={() => setAlertOpen(false)} sx={{ mt: 2 }}>
                    <AlertTitle>Estado nuevos usuarios</AlertTitle>
                    <pre>{alertMessage}</pre>
                </Alert>
            )}
        </div>
    );
}
