"use client"
import React, {useEffect, useState} from 'react';
import {Container} from "@mui/material";

import AuthService from "../../services/AuthService";
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

export default function Users(){

    const router = useRouter();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        //Comprobación de token expiración
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            console.log('No hay usuario');
            router.push('/login');
        }else{
        
        const expirationTime = new Date(user.expiration);
        const currentTime = new Date();
        
        if (currentTime >= expirationTime) {
                console.log('El token ha expirado');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                router.push('/login');
                return;
        }
        getUser(user.id);
    }
    }, []);

    const getAllUsers = async () => {
        const data = await AuthService.getUsers();
        setUsers(data);
    }

    const getUser = async (id) => {
        const token = localStorage.getItem('token');
        const data = await AuthService.getUserById(id, token);
        setUsers([data]);
    }

    return (
        <Container style={{justifyContent: 'center', alignItems: 'center'}}>
            <Navbar />
            <h1>Inicio</h1>
        </Container>
    )
}
