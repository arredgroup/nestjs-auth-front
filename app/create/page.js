"use client"
import React from "react";
import {Card, CardContent, Container, Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SimpleSnackbar from "@/components/SimpleSnackbar";
import AuthService from "@/services/AuthService";
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

import './page.css';
import { FormatAlignJustify, Token } from "@mui/icons-material";

const bulkCreate = () => {
    // Register from user -> name, email, password, cellphone
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password_second, setPasswordSecond] = React.useState("");
    const [cellphone, setCellphone] = React.useState("");
    const [users, setUsers] = React.useState([]);
    const [message, setMessage] = React.useState("");
    const [openSnack, setOpenSnack] = React.useState(false);
    const [cont, setCont] = React.useState(0);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");


    const handleRegister = async () => {
        console.log(users);
        const token = localStorage.getItem('token');
        const response = await AuthService.postBulkCreate(users, token);
        setSnackbarMessage(response ? "Usuarios creados correctamente" : "Error al crear usuarios");
        setSnackbarOpen(true);
        setUsers([]);
        setCont(0);
    }

    const handleSave = () => {
        if(password !== password_second){
            setMessage("Las contraseñas no coinciden");
            setOpenSnack(true);
            return;
        }
        if(!name || !email || !password || !password_second || !cellphone){
            setMessage("Todos los campos son obligatorios");
            setOpenSnack(true);
            return;
        }
        const user = {
            name,
            email,
            password,
            password_second,
            cellphone,
        }
        setUsers(prevUsers => {
            const newUsers = [...prevUsers, user];
            console.log("Updated users array:", newUsers);
            return newUsers;
        });
        
        setName("");
        setEmail("");
        setPassword("");
        setPasswordSecond("");
        setCellphone("");
        setCont(cont + 1);
    }
    
    return (
        <Container>
            <Navbar />
            <h1>Create Users</h1>
            <SimpleSnackbar message={message} openSnack={openSnack} closeSnack={() => {setOpenSnack(!openSnack)}}/>
            <Card className="form">
                <CardContent>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            id="outlined-basic"
                            name="name"
                            label="Nombre"
                            value={name}
                            variant="outlined"
                            required
                            placeholder="Oleh Oleig"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            id="outlined-basic"
                            name="email"
                            value={email}
                            label="Email"
                            variant="outlined"
                            required
                            placeholder="correo@ejemplo.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            id="outlined-basic"
                            name="password"
                            value={password}
                            label="Contraseña"
                            variant="outlined"
                            type="password"
                            required
                            placeholder="********"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            id="outlined-basic"
                            name="password_second"
                            value={password_second}
                            type="password"
                            label="Confirmar Contraseña"
                            variant="outlined"
                            required
                            placeholder="********"
                            onChange={(e) => setPasswordSecond(e.target.value)}
                        />
                        <TextField
                            id="outlined-basic"
                            name="cellphone"
                            value={cellphone}
                            label="Teléfono"
                            variant="outlined"
                            required
                            placeholder="+56987654321"
                            onChange={(e) => setCellphone(e.target.value)}
                        />
                    </Stack>
                    <Container style={{marginTop: 20}}>
                        <Stack direction="row" spacing={2} alignItems={'center'} justifyContent={'center'}>
                            <div className="input-form">
                                <text>
                                    {cont} usuarios pendientes de Registrar
                                </text>
                            </div>
                            <div className="input-form">
                                <Button variant="contained" onClick={handleSave}>Guardar</Button>
                            </div>
                            <div className="input-form">
                                <Button variant="contained" onClick={handleRegister}>Registrar Todo</Button>
                            </div>
                        </Stack>
                    </Container>
                    
                </CardContent>
            </Card>
        </Container>
    )
}

export default bulkCreate;