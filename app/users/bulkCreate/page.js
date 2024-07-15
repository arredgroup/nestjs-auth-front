"use client"
import React, {useEffect, useState} from 'react';
import {Container, Table, TableBody, TableCell, TableHead, TableRow,Switch} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import {Delete} from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AuthService from "@/services/AuthService";
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function BulkCreate(){

    const router = useRouter();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            router.push('/login');
        }
        if(user?.roles?.includes('admin')){
            setUsers([])
        }
        // esta página solo puede ser utilizada por un administrador
        if(user?.roles?.includes('user')){
            router.push('/users'); // lo envia a una pagina pública
        }
    }, []);

    const postBulk = async () => {
        if(users.length<=0){
            return alert("Error: Aun no hay usuarios agregados.")
        }
        const token = localStorage.getItem('token');
        const response = await AuthService.registerBulk(token, users);
        if(!response){
            alert("Error al registrar usuarios");
        } else {
            alert(response.data);
            setUsers([]);
        }
    }

    const handleRemove = (user) => {
        const temp = [...users];
        temp.splice(user, 1);
        setUsers(temp);
    }
    
    const [userParam, setParam] = useState({
        name: '',
        email: '',
        password: '',
        password_second: '',
        cellphone: ''
    });

    const handleChange = (value, field) => {
        setParam({
            ...userParam,
            [field]: value
        });
    }
    const handleAdd = () => {
        setUsers(prevUsers => [...prevUsers, userParam]);
    }

    return (
        <Container>
            <Navbar />
                <h1>Bulk Create </h1>
                <Container>
                    <TextField
                        label="Nombre"
                        name="name"
                        variant="outlined"
                        value={userParam.name}
                        onChange={(e) => handleChange(e.target.value, 'name')}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        variant="outlined"
                        value={userParam.email}
                        onChange={(e) => handleChange(e.target.value, 'email')}
                    />
                    <TextField
                        label="Contraseña"
                        name="password"
                        variant="outlined"
                        value={userParam.password}
                        onChange={(e) => handleChange(e.target.value, 'password')}
                    />
                    <TextField
                        label="Confirmar contraseña"
                        name="password_second"
                        variant="outlined"
                        value={userParam.password_second}
                        onChange={(e) => handleChange(e.target.value, 'password_second')}
                    />
                    <TextField
                        label="Telefono movil"
                        name="cellphone"
                        variant="outlined"
                        value={userParam.cellphone}
                        onChange={(e) => handleChange(e.target.value, 'cellphone')}
                    />
                    <Button variant="contained" onClick={handleAdd}>Agregar</Button>
                    <Button variant="contained" onClick={postBulk}>Enviar</Button>
                </Container>
                <h3>Agregado:</h3>
                <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Contraseña</TableCell>
                        <TableCell>Teléfono movil</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map((user, index) => (
                            <TableRow key={user}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.password}</TableCell>
                                <TableCell>{user.cellphone}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" aria-label={"Remover usuario " + user.name} onClick={() => handleRemove(index)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </Container>
    )
}