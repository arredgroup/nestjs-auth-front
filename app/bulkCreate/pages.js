"use client";
import React, { useState } from 'react';
import { Container, TextField, IconButton, Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import AuthService from "../../../services/AuthService";
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';

const bulkCreate = () => {
    const router = useRouter();
    const [users, setUsers] = useState([{ name: '', email: '', password: '', password_second: '', cellphone: '' }]);

    const handleChange = (index, event) => {
        const values = [...users];
        values[index][event.target.name] = event.target.value;
        setUsers(values);
    };

    const handleAddFields = () => {
        setUsers([...users, { name: '', email: '', password: '', password_second: '', cellphone: '' }]);
    };

    const handleRemoveFields = (index) => {
        const values = [...users];
        values.splice(index, 1);
        setUsers(values);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const result = await AuthService.bulkCreateUsers(token, users);
        if (result) {
            alert('Users created successfully!');
            router.push('/users');
        } else {
            alert('Failed to create users');
        }
    };

    return (
        <Container>
            <Navbar />
            <h1>Crear usuarios</h1>
            <form onSubmit={handleSubmit}>
                {users.map((user, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <TextField
                            name="name"
                            label="Name"
                            value={user.name}
                            onChange={(event) => handleChange(index, event)}
                            style={{ marginRight: '10px' }}
                        />
                        <TextField
                            name="email"
                            label="Email"
                            value={user.email}
                            onChange={(event) => handleChange(index, event)}
                            style={{ marginRight: '10px' }}
                        />
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            value={user.password}
                            onChange={(event) => handleChange(index, event)}
                            style={{ marginRight: '10px' }}
                        />
                        <TextField
                            name="password_second"
                            label="Confirm Password"
                            type="password"
                            value={user.password_second}
                            onChange={(event) => handleChange(index, event)}
                            style={{ marginRight: '10px' }}
                        />
                        <TextField
                            name="cellphone"
                            label="Cellphone"
                            value={user.cellphone}
                            onChange={(event) => handleChange(index, event)}
                            style={{ marginRight: '10px' }}
                        />
                        <IconButton onClick={() => handleRemoveFields(index)} disabled={users.length === 1}>
                            <Remove />
                        </IconButton>
                        <IconButton onClick={handleAddFields}>
                            <Add />
                        </IconButton>
                    </div>
                ))}
                <Button variant="contained" color="primary" type="submit">Crear</Button>
            </form>
        </Container>
    );
};

export default bulkCreate;