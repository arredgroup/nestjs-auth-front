"use client"
import React, {useEffect, useState} from 'react';

import AuthService from "@/services/AuthService";
import {Container, Switch} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Edit = (props) => {
    const {id} = props.params;

    const [user, setUser] = useState(null);

    const [editedUser, setEditedUser] = useState({
        name: '',
        email: '',
        cellphone: '',
        status: true
    });

    const handleChange = (value, field) => {
        setEditedUser({
            ...editedUser,
            [field]: value
        });
    }

    const handleUpdate = () => {
        const token = localStorage.getItem('token');
        (async () => {
            const data = await AuthService.updateUser(id, editedUser, token);
            console.log(data);
        })();
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        (async () => {
            const data = await AuthService.getUserById(id, token);
            setUser(data);
            setEditedUser(data);
        })();
    }, []);

    return (
        <div>
            <h1>Edit user {id}</h1>
            { !user ? "No hay datos" : <Container>
                <TextField
                    label="Nombre"
                    name="name"
                    variant="outlined"
                    value={editedUser.name}
                    onChange={(e) => handleChange(e.target.value, 'name')}
                />
                <TextField
                    label="Email"
                    name="email"
                    variant="outlined"
                    value={editedUser.email} onChange={(e) => handleChange(e.target.value, 'email')}
                />
                <TextField
                    label="Celular"
                    name="cellphone"
                    variant="outlined"
                    value={editedUser.cellphone}
                    onChange={(e) => handleChange(e.target.value, 'cellphone')}
                />
                <Switch
                    name="status"
                    checked={editedUser.status}
                    value={editedUser.status}
                    onChange={(e) => handleChange(e.target.checked, 'status')}
                />
                <Button type="outline" onClick={handleUpdate}>Actualizar</Button>
            </Container>}
        </div>
    )
}

export default Edit;