"use client"
import React, {useState, useEffect} from 'react';
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

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            router.push('/users');
        }
    }, []);
    const handleLogin = async () => {
        const login = await AuthService.handleLogin(email, password);
        setState(login);
        if(login){
            router.push('/users');
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
                    <div className={"login-box-child"}>
                        <TextField
                            id="outlined"
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