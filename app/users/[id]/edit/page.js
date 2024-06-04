"use client"
import React, {useEffect, useState} from 'react';

import AuthService from "@/services/AuthService";
import {Container, Switch} from "@mui/material";
import TextField from "@mui/material/TextField";

const Edit = (props) => {
    const {id} = props.params;

    const [user, setUser] = useState(null);

    const [editedUser, setEditedUser] = useState({
        name: '',
        email: '',
        status: true
    });

    const handleChange = (value, field) => {
        setEditedUser({
            ...editedUser,
            [field]: value
        });
    }

    useEffect(() => {
        (async () => {
            const data = await AuthService.getUserById(id);
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
                <Switch
                    name="status"
                    checked={editedUser.status}
                    value={editedUser.status}
                    onChange={(e) => handleChange(e.target.checked, 'status')}
                />
            </Container>}
            {JSON.stringify(editedUser)}
        </div>
    )
}

export default Edit;