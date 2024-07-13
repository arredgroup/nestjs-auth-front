"use client"
import Navbar from '@/components/Navbar';
import React, {useEffect, useState} from 'react';

import AuthService from "@/services/AuthService";
import {Container, Stack, Switch} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const Search = (props) => {
    const {id} = props.params;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        (async () => {
            const data = await AuthService.getUserById(id, token);
            setUser(data);
        })();
    }, []);

    return (
        <Container>
        <Navbar />
       
            {!user ? "No hay datos" : 
            <Container>
                 <Stack justifyContent={'center'} alignItems={'center'}>
                <h1>bulkCreate {id}</h1> 
                <Button></Button>
                </Stack>
            </Container>}    
        </ Container>
    )
}

export default Search;