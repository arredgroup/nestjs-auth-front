"use client"
import UsersTable from "@/components/UsersTable";
import { useEffect, useState } from "react";
import AuthService from "@/services/AuthService";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useRouter } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
export default function Page() {
    const [name, setName] = useState("");
    const [loginBefore, setLoginBefore] = useState("");
    const [loginAfter, setLoginAfter] = useState("");
    const [active, setActive] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputEnabled, setInputEnabled] = useState(true);
    const router = useRouter();
    useEffect(() => {
        console.log("useEffect", inputEnabled);
    }, [inputEnabled]);

    const handleSearch = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        console.log(name, active, loginBefore, loginAfter, token);
        
        const data = await AuthService.findUsers(name, active, loginBefore, loginAfter, token);
        setUsers(data.data); 
        setLoading(false);
        console.log(data.data);
    };
    const handleBack = () => {
        router.push('/users');
    }
    return (
        <div>
            <IconButton color="primary" aria-label='Ver lista de usuarios' onClick={handleBack}>Volver</IconButton> <br />
            <h1>Lista de usuarios</h1>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '15ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField 
                    id="outlined-basic"
                    label="Nombre" 
                    variant="outlined" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <FormControlLabel
                value="top"
                control={
                <Checkbox 
                    id="Range"
                    checked={inputEnabled} 
                    size="small" 
                    onChange={(e) => setInputEnabled(e.target.checked)} 
                />}
                label="¿Inició sesión?"
                labelPlacement="top"
                />
                
                <FormControlLabel
                value="top"
                control={
                <input 
                    id="loginAfter"
                    type="date" 
                    value={loginAfter} 
                    onChange={(e) => setLoginAfter(e.target.value)} 
                    placeholder="Fecha de inicio" 
                    disabled={!inputEnabled}
                />}
                label="Inicio"
                labelPlacement="top"
                />
                
                <FormControlLabel
                value="top"
                control={
                <input 
                    id="loginBefore"
                    type="date" 
                    value={loginBefore} 
                    onChange={(e) => setLoginBefore(e.target.value)} 
                    placeholder="Fecha de fin" 
                    disabled={!inputEnabled}
                />}
                label="Fin"
                labelPlacement="top"
                />
                
                <FormControl fullWidth required>
                    <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={active}
                        defaultValue={"false"}
                        label="Estado"
                        onChange={(e) => setActive(e.target.value)}
                    >
                        <MenuItem value={"false"}>Activos</MenuItem>
                        <MenuItem value={"true"}>Inactivos</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    onClick={handleSearch}
                    disabled={name === "" || active === "" || (inputEnabled && (loginBefore === "" || loginAfter === ""))}
                >Filtrar</Button>
            </Box>
            
            <UsersTable data={users} />
        </div>
    );
}
