"use client"
import Navbar from '@/components/Navbar';
import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';

import AuthService from "@/services/AuthService";
import {Container, Stack, Switch} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const Search = (props) => {
    const {id} = props.params;
    const [user, setUser] = useState(null);
    const [loginBeforeDate, setloginBeforeDate] = useState(dayjs('2022-04-17'));
    const [loginAfterDate, setloginAfterDate] = useState(dayjs('2022-04-18'));
    const [name, setName] = useState('');
    const [status, setStatus] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        (async () => {
            const data = await AuthService.getUserById(id, token);
            setUser(data);
        })();
    }, []);

    const handleSumbit = () => {}

    return (
        

        <Container>
        <Navbar />
            {!user ? "No hay datos" : 
            <Container style={{ marginTop: 30 }}>
                 <Stack justifyContent={'center'} alignItems={'center'}>
                    <Stack direction={'row'} spacing={3}>
                        <TextField                     
                            label="Nombre"
                            name="name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}  
                        >Nombre</TextField>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                            label="Logeado despues"
                            value={loginBeforeDate}
                            onChange={(newValue) => setloginBeforeDate(newValue)}
                         />
                           <DatePicker 
                            label="Logeado antes"
                            value={loginAfterDate}
                            onChange={(newValue) => setloginAfterDate(newValue)}
                         />
                         </LocalizationProvider>
                         <Switch
                            name="status"
                            checked={status}
                            value={status}
                            onChange={(e) => setStatus(e.target.checked)}
                            />
                         <Button variant="contained" onClick={handleSumbit}>Filtrar</Button>
                         </Stack>
                    </Stack>
            </Container>}    
        </ Container>
    )
}

export default Search;