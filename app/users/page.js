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
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            router.push('/login');
        }
        if(user?.roles?.includes('admin')){
            getAllUsers();
        }
        if(user?.roles?.includes('user')){
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
        <Container>
            <Navbar />
            <h1>Inicio</h1>
        </Container>
    )
}
