"use client"
import React, {useEffect, useState} from 'react';
import {Container, Table, TableBody, TableCell, TableHead, TableRow, TextField, Select, MenuItem,Button} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import {Edit} from "@mui/icons-material";
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import UserForm from "./UserForm.jsx";

export default function Users(){

    const router = useRouter();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

         if(!user){
            router.push('/login');
         }
	getAllUsers();

    }, []);

    const getAllUsers = async () => {
	const response  = await UserService.getAllUsers();
	console.log(response);
        setUsers(response.data);
    }

    const getUser = async (id) => {
        const token = localStorage.getItem('token');
        const data = await AuthService.getUserById(id, token);
        setUsers([data]);
    }

    const handleEdit = (user) => {
        router.push('/users/' + user.id + '/edit');
    }

    const [name,setName] = useState("");
    const [active,setStatus] = useState("");
    const [login_after_date, setAfter] = useState("");
    const [login_before_date, setBefore] = useState("");

    const [open,setOpen] = useState(false);
    const show = () => {
	setOpen(true);
    }
    
    const notShow = () => {
	setOpen(false);
    }

   const applyFilters = async () => {
       const response = await UserService.getUserByFilters({name,active,login_after_date,login_before_date});      
       setUsers(response.message)
      
    }


    
    return (
        <Container>
            <Navbar />
            <h1>Users</h1>

		<TextField  onChange={(e) => setName(e.target.value)} name="name" label="Nombre "type="text"/>
		<Select onChange={(e) => setStatus(e.target.value)}>  
		    <MenuItem value={true}>Activo</MenuItem>
		    <MenuItem value={false}>Cerrado</MenuItem>
		</Select>
	         <h5>Desde/Hasta</h5>
	        <TextField onChange={(e) => setAfter(e.target.value)} name="login_after_date" type="date" />
		<TextField onChange={(e) => setBefore(e.target.value)} name="login_before_date" type="date"/>
	        <br/>
		<Button  onClick={applyFilters} variant="contained">Aplicar filtros</Button>

        <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Última Sesión</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map((user) => (
                            <TableRow key={user}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.status? 'ACTIVO' : 'CERRADO'}</TableCell>
                                <TableCell>TBD</TableCell>
                                <TableCell>
                                    <IconButton color="primary" aria-label={"Editar usuario " + user.name} onClick={() => handleEdit(user)}>
                                        <Edit />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
	    <Button variant="contained" onClick={show} >Add Users</Button>

	    {open && (<UserForm notShow={notShow} />)}
	
	
        </Container>
    )
}
