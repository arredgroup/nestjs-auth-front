"use client"
import React, {useState} from 'react';
import {Card, CardContent, Container} from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import SimpleSnackbar from '../../components/SimpleSnackbar';
import { useRouter } from 'next/navigation';


import AuthService from '../../services/AuthService';

import './page.css';

export default function Login(){
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, setState] = useState(true);
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        const user = AuthService.handleLogin(email, password);
        if (user) {
            setMessage('Inicio de sesión exitoso!');
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            router.push('/users'); // Redirige al usuario a la página /users
        } else {
            setMessage('Usuario o contraseña incorrectos');
        }
    };

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
                    <SimpleSnackbar message={"Usuario o contraseña incorrectos"} openSnack={!state}
                                    closeSnack={() => setState(true)}/>
                    <div className={"login-box-child"}>
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            placeholder="alfa@beta.cl"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={"login-box-child"}>
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            placeholder="*********"
                            type="password"
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