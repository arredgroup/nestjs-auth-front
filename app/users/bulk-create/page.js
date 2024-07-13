"use client";
import React, { useEffect, useState } from "react";
import { Container, Button, Stack, TextField } from "@mui/material";
import SimpleSnackbar from "../../../components/SimpleSnackbar";
import AuthService from "../../../services/AuthService";
import Navbar from "../../../components/Navbar";

import "./page.css";

export default function BulkCreateUsers() {
    const [users, setUsers] = useState([]);
    const [number, setNumber] = useState(1);

    const [message, setMessage] = useState("");
    const [openSnack, setOpenSnack] = useState(false);

    useEffect(() => {
        setUsers(Array.from({ length: number }, () => ({})));
    }, [number]);

    const handleChange = (e, index) => {
        setUsers(
            users.map((user, i) =>
                i === index
                    ? { ...user, [e.target.name]: e.target.value }
                    : user
            )
        );
    };

    const createUsers = async () => {
        const token = localStorage.getItem("token");
        const response = await AuthService.bulkCreateUsers(token, users);
        setMessage(response);
        setOpenSnack(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createUsers();
    };

    return (
        <Container>
            <SimpleSnackbar
                message={message}
                openSnack={openSnack}
                closeSnack={() => {
                    setOpenSnack(!openSnack);
                }}
            />
            <Navbar />
            <h1>Crear usuarios</h1>
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
            />
            {users.map((user, index) => (
                <Stack key={index} direction="row" spacing={2} marginBottom={2}>
                    <TextField
                        className="form-input"
                        label="Nombre"
                        name="name"
                        value={user?.name}
                        placeholder="juan"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleChange(e, index)}
                    />
                    <TextField
                        className="form-input"
                        label="Email"
                        name="email"
                        value={user?.email}
                        placeholder="juan@gmail.com"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleChange(e, index)}
                    />
                    <TextField
                        className="form-input"
                        type="password"
                        name="password"
                        value={user?.password}
                        label="Contraseña"
                        placeholder="******"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleChange(e, index)}
                    />
                    <TextField
                        className="form-input"
                        type="password"
                        name="password_second"
                        value={user?.password_second}
                        label="Confirmar contraseña"
                        placeholder="******"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleChange(e, index)}
                    />
                    <TextField
                        className="form-input"
                        label="Celular"
                        name="cellphone"
                        value={user?.cellphone}
                        placeholder="123456789"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleChange(e, index)}
                    />
                </Stack>
            ))}
            {number > 0 && <Button onClick={handleSubmit}>Crear</Button>}
        </Container>
    );
}
