"use client";
import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { Edit } from "@mui/icons-material";
import AuthService from "../../services/AuthService";
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Link from "next/link";

export default function Users() {
    const router = useRouter();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            router.push("/login");
        } else {
            if (user?.roles?.includes("admin")) {
                getAllUsers();
            }
            if (user?.roles?.includes("user")) {
                getUser(user.id);
            }
        }
    }, []);

    const getAllUsers = async () => {
        const token = localStorage.getItem("token");
        try {
            const data = await AuthService.getUsers(token);
            setUsers(data);
        } catch (error) {
            console.error("Error obteniendo usuarios:", error);
        }
    }

    const getUser = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const data = await AuthService.getUserById(id, token);
            setUsers([data]);
        } catch (error) {
            console.error("Error obteniendo usuario:", error);
        }
    }

    const handleEdit = (user) => {
        router.push("/users/" + user.id + "/edit");
    }

    return (
        <Container>
            <Navbar />
            <h1>Usuarios</h1>
            <Link href="/users/FindUsers" >
                Filtrar usuarios
            </Link>
            <br />
            <Link href="/users/BulkUsers" color="primary">
                Crear usuarios
            </Link>
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
                    {users.length > 0 ? (
                        users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.status ? 'ACTIVO' : 'CERRADO'}</TableCell>
                                <TableCell>TBD</TableCell>
                                <TableCell>
                                    <IconButton color="primary" aria-label={"Editar usuario " + user.name} onClick={() => handleEdit(user)}>
                                        <Edit />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5}>No hay usuarios disponibles</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Container>
    );
}

