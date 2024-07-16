"use client"
import React, { useState } from 'react';
import { Card, CardContent, Container } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SimpleSnackbar from '../../components/SimpleSnackbar';
import { useRouter } from 'next/navigation';
import FormHelperText from '@mui/material/FormHelperText';

import AuthService from '../../services/AuthService';

import './page.css';

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, setState] = useState(true);
    const [emailError, setEmailError] = useState("");
    const [generalError, setGeneralError] = useState("");

    const handleLogin = async () => {
        const response = await AuthService.handleLogin(email, password);
        if (response.success) {
            setState(true);
            router.push('/users');
        } else {
            if (response.message === "Correo electrónico no encontrado en la base de datos") {
                setEmailError("El email no existe, regístrate.");
                setGeneralError("");
            } else {
                setEmailError("");
                setGeneralError(response.message || "Usuario o contraseña incorrectos");
            }
            setState(false);
        }
    }

    const handleRegister = () => {
        router.push('/register');
    }

    return (
        <Container className={"flex-container"}>
            <Card className={"login-box"}>
                <CardContent>
                    <div className={"login-box-child"}>
                        <h1>Inicia Sesión</h1>
                    </div>
                    <SimpleSnackbar message={generalError} openSnack={!state && generalError !== ""}
                        closeSnack={() => setState(true)} />
                    <div className={"login-box-child"}>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            placeholder="alfa@beta.cl"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError("");
                            }}
                            error={emailError !== ""}
                            helperText={emailError}
                        />
                    </div>
                    <div className={"login-box-child"}>
                        <FormHelperText error={true} style={{ color: 'red' }}>
                            {emailError}
                        </FormHelperText>
                    </div>
                    <div className={"login-box-child"}>
                        <TextField
                            id="password"
                            label="Password"
                            variant="outlined"
                            placeholder="*********"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={"login-box-child"}>
                        <Button onClick={handleLogin} variant="contained">Iniciar Sesión</Button>
                    </div>
                    <div className={"login-box-child"}>
                        <Button onClick={handleRegister}>Registrar</Button>
                    </div>
                </CardContent>
            </Card>
        </Container>
    );
}
