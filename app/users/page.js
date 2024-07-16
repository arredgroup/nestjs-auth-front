"use client";
import React, { useEffect, useState } from "react";
import {Container, Table, TableBody, TableCell, TableHead, TableRow, Button, Stack, TextField, Grid, MenuItem, Switch, FormControlLabel, Box} from "@mui/material";
import AuthService from "../../services/AuthService";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function FindUsers() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState({
        name: '',
        login_after_date: '',
        login_before_date: '',
        status: '', 
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            router.push("/login");
        }
        if (user?.roles?.includes("admin")) {
            getFilteredUsers();
        }
    }, [query]);

    const getFilteredUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const data = await AuthService.findUsers(token, query);
            setUsers(data);
        } catch (error) {
            console.error("Error al obtener usuarios filtrados:", error);
        }
    };

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
        filterUsers(event.target.value, query.login_after_date, query.login_before_date, query.status);
    };

    const handleClearFilters = () => {
        setQuery({
            name: '',
            login_after_date: '',
            login_before_date: '',
            status: '', 
        });
        setDateFilter('');
        setSelectedDate('');
        filterUsers('', '', '', '');
    };

    const handleDateFilterChange = (event) => {
        setDateFilter(event.target.value);
        setSelectedDate('');
        filterUsers(searchTerm, query.login_after_date, query.login_before_date, query.status);
    };

    const handleSelectedDateChange = (event) => {
        setSelectedDate(event.target.value);
        filterUsers(searchTerm, query.login_after_date, query.login_before_date, query.status);
    };

    const handleDateChange = (event, id) => {
        setQuery({
            ...query,
            [id]: event.target.value
        });
        filterUsers(searchTerm, id === 'login_after_date' ? event.target.value : query.login_after_date, id === 'login_before_date' ? event.target.value : query.login_before_date, query.status);
    };

    const handleStatusChange = (event) => {
        setQuery({
            ...query,
            status: event.target.value
        });
        filterUsers(searchTerm, query.login_after_date, query.login_before_date, event.target.value);
    };

    const filterUsers = (searchTerm, login_after_date, login_before_date, status) => {
        let filteredUsers = users;

        if (searchTerm) {
            const lowerCaseSearch = searchTerm.toLowerCase();
            filteredUsers = filteredUsers.filter(user =>
                user.name.toLowerCase().includes(lowerCaseSearch)
            );
        }

        if (login_after_date) {
            filteredUsers = filteredUsers.filter(user =>
                new Date(user.createdAt) >= new Date(login_after_date)
            );
        }

        if (login_before_date) {
            filteredUsers = filteredUsers.filter(user =>
                new Date(user.createdAt) <= new Date(login_before_date)
            );
        }

        if (status) {
            filteredUsers = filteredUsers.filter(user =>
                user.status === (status === 'active' ? true : false)
            );
        }

        setUsers(filteredUsers);
    };

    return (
        <Container>
            <Navbar />
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                    <h1>Lista de usuarios</h1>
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        onClick={() => {
                            router.push('/users/bulkcreate');
                        }}
                    >
                        Crear usuarios
                    </Button>
                </Box>
            </Box>
            <h3> Filtros de usuarios </h3>
            <Stack direction="row" spacing={4} alignItems="center">
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3.5} style={{ marginLeft: '-1px' }}>
                        <TextField
                        label="Buscar por nombre de usuario"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        fullWidth
                        margin="none"  
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            select
                            label="Filtrar por fecha"
                            value={dateFilter}
                            onChange={handleDateFilterChange}
                            variant="outlined"
                            fullWidth
                            margin="none"
                        >
                            <MenuItem value="">Todos</MenuItem>
                            <MenuItem value="before">Antes de</MenuItem>
                            <MenuItem value="after">Después de</MenuItem>
                        </TextField>
                    </Grid>
                    {dateFilter && (
                        <Grid item xs={3}>
                            <TextField
                                type="date"
                                value={selectedDate}
                                onChange={handleSelectedDateChange}
                                variant="outlined"
                                fullWidth
                                margin="none"
                            />
                        </Grid>
                    )}
                     <Grid item xs={2}>
                        <FormControlLabel
                            control={
                                <Switch
                                    id="active"
                                    checked={query.active}
                                    onChange={(e) =>
                                        setQuery({ ...query, active: e.target.checked })
                                    }
                                />
                            }
                            label="Estado"
                            labelPlacement="top"
                        />
                    </Grid>
                </Grid>
                <Stack direction="row" spacing={5} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button onClick={handleClearFilters} sx={{ whiteSpace: 'nowrap' }}>
                         Borrar filtros
                    </Button>
                </Stack>
            </Stack>
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
                    {users.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.status ? "ACTIVO" : "CERRADO"}</TableCell>
                            <TableCell>{user.createdAt}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}