"use client"
import React, {useEffect, useState} from 'react';
import {Container, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import {Edit} from "@mui/icons-material";

import AuthService from "../../services/AuthService";
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';

export default function Users(){

    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            router.push('/login');
        }
        if(user?.roles?.includes('user')){
            getAllUsers();
        }
    }, []);

    const getAllUsers = async () => {
        const token = localStorage.getItem('token');
        const data = await AuthService.getFindUser('', token);
        setUsers(data);
    }


    return (
        <Container>
            <Navbar />
            <h1>Inicio</h1>
        </Container>
    )
}