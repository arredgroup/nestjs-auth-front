"use client"
import React, {useState} from 'react';
import {Card, CardContent, Container} from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

import AuthService from '../../services/AuthService';

export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        AuthService.handleLogin(email, password);
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
                    <Button onClick={handleLogin}>Iniciar Sesión</Button>
                </div>
                </CardContent>
            </Card>
        </Container>
    );
}