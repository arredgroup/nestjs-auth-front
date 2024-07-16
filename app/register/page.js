'use client'
import React, { useState } from 'react';
import { Card, CardContent, Container, TextField, Button, Stack } from '@mui/material';
import SimpleSnackbar from '@/components/SimpleSnackbar';
import AuthService from '../../services/AuthService';
import Navbar from '@/components/Navbar'; 

const Register = () => {
    const [users, setUsers] = useState([{ name: '', email: '', password: '', password_second: '', cellphone: '' }]);
    const [message, setMessage] = useState('');
    const [openSnack, setOpenSnack] = useState(false);

    const handleAddUser = () => {
        setUsers([...users, { name: '', email: '', password: '', password_second: '', cellphone: '' }]);
    };

    const handleRemoveUser = (index) => {
        const updatedUsers = [...users];
        updatedUsers.splice(index, 1);
        setUsers(updatedUsers);
    };

    const handleRegister = async () => {
        const responses = await Promise.all(users.map(user =>
            AuthService.registerUser(user.name, user.email, user.password, user.password_second, user.cellphone)
        ));

        const success = responses.every(response => response);
        if (success) {
            setMessage('Usuarios registrados exitosamente!');
            localStorage.setItem('registeredUsers', JSON.stringify(users));
        } else {
            setMessage('Error al registrar usuarios');
        }
        setOpenSnack(true);
    };

    return (
        <div>
            <Navbar />
            <Stack>
                <SimpleSnackbar message={message} openSnack={openSnack} closeSnack={() => setOpenSnack(!openSnack)} />
                {users.map((user, index) => (
                    <Card key={index} className="form">
                        <CardContent>
                            <TextField
                                label="Nombre"
                                variant="outlined"
                                required
                                value={user.name}
                                onChange={(e) => {
                                    const updatedUsers = [...users];
                                    updatedUsers[index].name = e.target.value;
                                    setUsers(updatedUsers);
                                }}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                required
                                value={user.email}
                                onChange={(e) => {
                                    const updatedUsers = [...users];
                                    updatedUsers[index].email = e.target.value;
                                    setUsers(updatedUsers);
                                }}
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                required
                                value={user.password}
                                onChange={(e) => {
                                    const updatedUsers = [...users];
                                    updatedUsers[index].password = e.target.value;
                                    setUsers(updatedUsers);
                                }}
                            />
                            <TextField
                                label="Confirm Password"
                                variant="outlined"
                                required
                                value={user.password_second}
                                onChange={(e) => {
                                    const updatedUsers = [...users];
                                    updatedUsers[index].password_second = e.target.value;
                                    setUsers(updatedUsers);
                                }}
                            />
                            <TextField
                                label="Cellphone"
                                variant="outlined"
                                required
                                value={user.cellphone}
                                onChange={(e) => {
                                    const updatedUsers = [...users];
                                    updatedUsers[index].cellphone = e.target.value;
                                    setUsers(updatedUsers);
                                }}
                            />
                            {/* Otros campos como contraseña, confirmar contraseña, teléfono */}
                            <Button variant="contained" color="secondary" onClick={() => handleRemoveUser(index)}>Eliminar Formulario</Button>
                        </CardContent>
                    </Card>
                ))}
                
            </Stack>
            <Button variant="contained" onClick={handleAddUser}>Agregar Formulario</Button>
            <Button variant="contained" onClick={handleRegister}>Registrar Usuarios</Button>
        </div>
        
    );
};

export default Register;
