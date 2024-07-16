"use client"
import React, {useEffect, useState} from 'react';
import {Table, Container,  TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {TableContainer, paper} from "@mui/material";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from '@mui/material/Checkbox';

import AuthService from "../../services/AuthService";
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

export default function Users(){

    const router = useRouter();
    const [token,setToken]= useState("");
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [active, setActive] = useState(true);
    const [login_before_date, setLogin_before_date] = useState("");
    const [login_after_date, setLogin_after_date] = useState("");
    const [response, setResponse] = useState([]); 



    useEffect(() => {
        
        const user =  JSON.parse(localStorage.getItem('user'));
        
        setToken(localStorage.getItem('token'));

        handleFilterChange();
        
        if(!user){
            router.push('/login');
        }
    }, []);
    const getUser = async (id) => {
        const token = localStorage.getItem('token');
        const data = await AuthService.getUserById(id, token);
        setUsers([data]);
    }
    const handleFilterChange = async () =>{
        const response = await AuthService.findUsers(name,active,login_after_date,login_before_date,token);
        setResponse(response);
    }

    return (
        <Container>
            <Navbar />
            <h1>Users</h1>
            <TableContainer component = {paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Última Sesión</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <p>Filtros</p>
                        </TableCell>    
                        <TableCell>
                            <div className="input-form">
                                <TextField
                                    id="nombre"
                                    label="Nombre"
                                    variant="outlined"
                                    required
                                    placeholder="Oleh Oleig"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </TableCell>
                        <TableCell>
                            <Checkbox  checked={active} onChange={(e)=>{ setActive(e.target.checked)}}/>Activo
                        </TableCell>
                        <TableCell>
                            <form noValidate>
                                <TextField
                                    id="datetime-local1"
                                    label="Despues de:"
                                    type="datetime-local"
                                    defaultValue="2017-05-24T10:30"
                                    onChange={(e) => setLogin_after_date(e.target.value)}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                                </form>    
                        </TableCell>
                        <TableCell>
                            <form noValidate>
                                <TextField
                                    id="datetime-local2"
                                    label="Antes de:"
                                    type="datetime-local"
                                    defaultValue="2017-05-24T10:30"
                                    onChange={(e) => setLogin_before_date(e.target.value)}
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                />
                                </form>    
                        </TableCell>
                        <TableCell>
                            <div className="input-form">
                                <Button variant="contained" onClick={handleFilterChange}>Aplicar filtro</Button>
                            </div>
                        </TableCell>
                        
                    </TableRow>
                    {
                    response.map((user)=>(
                        
                        <TableRow key={user.id}>

                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.status? 'ACTIVO' : 'inactivo'}</TableCell>
                            <TableCell>
                                {user.Sessions.length > 0
                                ? new Date(user.Sessions[user.Sessions.length - 1].createdAt).toLocaleString()
                                : ''} 
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Container>
    )
}
