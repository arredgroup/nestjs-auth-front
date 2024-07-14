"use client"
import React, {useEffect, useState} from 'react';
import {Container, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import {Edit} from "@mui/icons-material";

import AuthService from "../../services/AuthService";
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import dayjs from 'dayjs';
import Filters from '@/components/Filters';
import Link from 'next/link';

export default function Users(){

    const router = useRouter();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            router.push('/login');
        }
    }, []);

    const handleEdit = (user) => {
        router.push('/users/' + user.id + '/edit');
    }
    const [name, setName] = useState();
    const [active, setActive] = useState();
    const [login_after_date, setLogin_after_date] = useState();
    const [login_before_date, setLogin_before_date] = useState();
    const [tokenExpired, setTokenExpired] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        (async () => {
            const data = await AuthService.getUsers(
                {
                    name: name === '' ? undefined : name,
                    active: active,
                    login_after_date: login_after_date && dayjs(login_after_date).format('YYYY-MM-DD'),
                    login_before_date: login_before_date &&dayjs(login_before_date).format('YYYY-MM-DD')
                }, token);
            console.log(data)
            if(!data || data?.message == 'Expired Token') setTokenExpired(true);
            setUsers(data);
        })();
    }, [name,active,login_after_date,login_before_date]);
    if(tokenExpired) return <div>
        <h2>Token expirado</h2>
        <Link href="/login">Inicie sesión otra vez</Link>
    </div>
    return (
        <Container>
            {users == null ?(
                <h1>Cargando...</h1>
            ):(
                <>
                <Navbar />
                    <h1>Users</h1>
                    <Filters active={active} onChange={setActive} name={name} onNameChange={setName} loginAfterDate={login_after_date} loginBeforeDate={login_before_date} onLoginAfterDateChange={setLogin_after_date} onLoginBeforeDateChange={setLogin_before_date}/>
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
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.status? 'ACTIVO' : 'CERRADO'}</TableCell>
                                        <TableCell>{user.Sessions[0]?.createdAt ? dayjs(user.Sessions[0]?.createdAt).format('YYYY-MM-DD HH:mm:ss'): 'Nunca'}</TableCell>
                                        <TableCell>
                                            <IconButton color="primary" aria-label={"Editar usuario " + user.name} onClick={() => handleEdit(user)}>
                                                <Edit />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table></>
            )}
        </Container>
    )
}
