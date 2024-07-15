"use client"

import React, {useState} from "react";
import {Box,Button,TextField,MenuItem} from "@mui/material";


const SearchFilters = ({ onApplyFilters }) =>{
    const [name, setName] = useState('');
    const [loginBefore, setLoginBefore] = useState('');
    const [loginAfter, setLoginAfter] = useState('');
    const [active, setActive] = useState('');

    const handleApplyFilters = () => {
        onApplyFilters({
            name,
            loginBefore,
            loginAfter,
            active,
        });
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
            <TextField
                label="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                margin="normal"
            />
            <TextField
                label="Fecha de inicio de sesión antes de"
                type="date"
                value={loginBefore}
                onChange={(e) => setLoginBefore(e.target.value)}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                margin="normal"
            />
            <TextField
                label="Fecha de inicio de sesión después de"
                type="date"
                value={loginAfter}
                onChange={(e) => setLoginAfter(e.target.value)}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                margin="normal"
            />
            <TextField
                label="Activo"
                select
                value={active}
                onChange={(e) => setActive(e.target.value)}
                variant="outlined"
                margin="normal"
            >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="true">Activo</MenuItem>
                <MenuItem value="false">Inactivo</MenuItem>
            </TextField>
            <Button onClick={handleApplyFilters} variant="contained" color="primary">
                Aplicar Filtros
            </Button>
        </Box>

    );
}

export default SearchFilters;