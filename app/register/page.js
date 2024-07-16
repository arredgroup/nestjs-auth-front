"use client"
import React, { useEffect } from "react";
import { Card, CardContent, Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SimpleSnackbar from "@/components/SimpleSnackbar";
import AuthService from "@/services/AuthService";

import './page.css';

const Register = () => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password_second, setPasswordSecond] = React.useState("");
    const [cellphone, setCellphone] = React.useState("");

    const [message, setMessage] = React.useState("");
    const [openSnack, setOpenSnack] = React.useState(false);

    useEffect(() => {
        // Load data from localStorage on component mount
        const savedName = localStorage.getItem('registerName');
        const savedEmail = localStorage.getItem('registerEmail');
        const savedCellphone = localStorage.getItem('registerCellphone');

        if (savedName) setName(savedName);
        if (savedEmail) setEmail(savedEmail);
        if (savedCellphone) setCellphone(savedCellphone);
    }, []);

    const handleRegister = async () => {
        if (password !== password_second) {
            setMessage("Las contraseñas no coinciden");
            setOpenSnack(true);
            return;
        }

        // Save data to localStorage
        localStorage.setItem('registerName', name);
        localStorage.setItem('registerEmail', email);
        localStorage.setItem('registerCellphone', cellphone);

        const response = await AuthService.registerUser(name, email, password, password_second, cellphone);
        if (!response) {
            setMessage("Error al registrar usuario");
            setOpenSnack(true);
        } else {
            setMessage("Usuario Registrado Exitosamente!");
            setOpenSnack(true);
            // Clear localStorage after successful registration
            localStorage.removeItem('registerName');
            localStorage.removeItem('registerEmail');
            localStorage.removeItem('registerCellphone');
        }
    };

    return (
        <Container>
            <SimpleSnackbar message={message} openSnack={openSnack} closeSnack={() => { setOpenSnack(!openSnack) }} />
            <Card className="form">
                <CardContent>
                    <h1>Register User</h1>
                    <div className="input-form">
                        <TextField
                            id="outlined-basic"
                            label="Nombre"
                            variant="outlined"
                            required
                            placeholder="Oleh Oleig"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="input-form">
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            required
                            placeholder="alfa@beta.cl"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-form">
                        <TextField
                            id="outlined-basic"
                            label="Contraseña"
                            variant="outlined"
                            required
                            type="password"
                            placeholder="****"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-form">
                        <TextField
                            id="outlined-basic"
                            label="Confirmar Contraseña"
                            variant="outlined"
                            type="password"
                            required
                            placeholder="****"
                            onChange={(e) => setPasswordSecond(e.target.value)}
                        />
                    </div>
                    <div className="input-form">
                        <TextField
                            id="outlined-basic"
                            label="Teléfono"
                            variant="outlined"
                            required
                            placeholder="+56987654321"
                            value={cellphone}
                            onChange={(e) => setCellphone(e.target.value)}
                        />
                    </div>
                    <div className="input-form">
                        <Button variant="contained" onClick={handleRegister}>Registrar</Button>
                    </div>
                </CardContent>
            </Card>
        </Container>
    )
}

export default Register;
