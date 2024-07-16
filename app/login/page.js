"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Container } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import SimpleSnackbar from '../../components/SimpleSnackbar';
import { useRouter } from 'next/navigation';
import './page.css';


const generateToken = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, setState] = useState(true);

    useEffect(() => {
        localStorage.removeItem('registerToken'); 
    }, []);

    const handleLogin = () => {
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        const userIndex = registeredUsers.findIndex(user => user.email === email && user.password === password);

        if (userIndex !== -1) {
            const user = registeredUsers[userIndex];
            user.status = 'true'; 
            const loginDate = new Date().toISOString(); 
            user.loginDate = loginDate;
            registeredUsers[userIndex] = user;
            localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
            
            const token = generateToken();
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            setState(true);
            router.push('/users');
        } else {
            setState(false);
        }
    };

    const handleRegister = () => {
        router.push('/register');
    };

    return (
        <Container className={"flex-container"}>
            <Card className={"login-box"}>
                <CardContent>
                    <div className={"login-box-child"}>
                        <h1>Inicia Sesión</h1>
                    </div>
                    <SimpleSnackbar message={"Usuario o contraseña incorrectos"} openSnack={!state}
                                    closeSnack={() => setState(true)} />
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
