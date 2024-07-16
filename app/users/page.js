'use client'
import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Card, CardContent, TextField, Checkbox, FormControlLabel, Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { Edit } from "@mui/icons-material";
import AuthService from "../../services/AuthService";
import Navbar from '../../components/Navbar';
import styles from './UserList.module.css';
import { useRouter } from 'next/navigation';

export default function Users() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        login_before_date: '',
        login_after_date: '',
        active: false
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            router.push('/login');
        }
        if (user?.roles?.includes('admin')) {
            getAllUsers();
        }
        if (user?.roles?.includes('user')) {
            getUser(user.id);
        }
    }, []);

    const handleChange = (field, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [field]: value
        }));
    };

    const updateURLWithFilters = () => {
        const url = new URL(window.location);
        url.searchParams.set('name', filters.name);
        url.searchParams.set('login_before_date', filters.login_before_date);
        url.searchParams.set('login_after_date', filters.login_after_date);
        url.searchParams.set('active', filters.active);
        router.push(url.toString());
      };

      const filterUsers = () => {
        let filteredUsers = JSON.parse(localStorage.getItem("users")) || [];
        if (filters.name) {
          filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(filters.name.toLowerCase()));
        }
        if (filters.login_before_date) {
          filteredUsers = filteredUsers.filter(user => new Date(user.lastLogin) < new Date(filters.login_before_date));
        }
        if (filters.login_after_date) {
          filteredUsers = filteredUsers.filter(user => new Date(user.lastLogin) > new Date(filters.login_after_date));
        }
        if (filters.active) {
          filteredUsers = filteredUsers.filter(user => user.active === filters.active);
        }
        setUsers(filteredUsers);
        updateURLWithFilters();
      };

    const getAllUsers = async () => {
        const data = await AuthService.getUsers();
        setUsers(data);
    };

    const getUser = async (id) => {
        const data = await AuthService.getUserById(id, token);
        setUsers([data]);
    };

    const handleEdit = (user) => {
        router.push('/users/' + user.id + '/edit');
    };

    return (
        <Container>
            <Navbar />
            <Card className={styles.form}>
                <CardContent>
                    <h1>Lista de Usuarios</h1>
                    <div className={styles.filters}>
                        <TextField
                            label="Nombre"
                            variant="outlined"
                            value={filters.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                        />
                        <TextField
                            label="Login Antes de Fecha"
                            variant="outlined"
                            type="date"
                            value={filters.login_before_date}
                            onChange={(e) => handleChange("login_before_date", e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Login Después de Fecha"
                            variant="outlined"
                            type="date"
                            value={filters.login_after_date}
                            onChange={(e) => handleChange("login_after_date", e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.active}
                                    onChange={(e) => handleChange("active", e.target.checked)}
                                    style={{ color: '#4caf50' }} /* Cambiar color de casilla a verde */
                                />
                            }
                            label="Activo"
                        />
                        <Button variant="contained" className={styles.button} onClick={filterUsers}>Aplicar Filtros</Button>
                    </div>
                    <Table className={styles.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Teléfono</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Última Sesión</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.cellphone}</TableCell>
                                        <TableCell>{user.active ? "Sí" : "No"}</TableCell>
                                        <TableCell>{user.lastLogin}</TableCell>
                                        <TableCell>
                                            <IconButton className={styles.editButton} aria-label={"Editar usuario " + user.name} onClick={() => handleEdit(user)}>
                                                <Edit />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} style={{ textAlign: "center" }}>No hay usuarios que coincidan con los filtros.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Container>
    );
}
