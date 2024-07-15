"use client";
import React, { useEffect, useState } from "react";
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Stack,
    TextField,
    Switch,
    Button,
} from "@mui/material";

import AuthService from "../../../services/AuthService";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";

export default function FindUsers() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
        if (!user) {
            router.push("/login");
        }
        if (user?.roles?.includes("admin")) {
            getFilteredUsers();
        }
    }, [query]);

    const getFilteredUsers = async () => {
        const token = localStorage.getItem("token");
        const data = await AuthService.findUsers(token, query);
        console.log(data);
        setUsers(data);
    };

    return (
        <Container>
            <Navbar />
            <h1>Users filters</h1>
            <>
                <Stack direction="row" spacing={2} alignItems="center">
                    <TextField
                        id="search"
                        label="Buscar por nombre"
                        variant="standard"
                        value={query?.name || ""}
                        onChange={(e) =>
                            setQuery({ ...query, name: e.target.value })
                        }
                    />
                    <Switch
                        id="active"
                        label="Estado"
                        checked={query?.active || false}
                        onChange={(e) =>
                            setQuery({ ...query, active: e.target.checked })
                        }
                    />
                    <TextField
                        id="login_after_date"
                        label="Fecha de inicio de sesión"
                        variant="standard"
                        type="date"
                        value={query?.login_after_date || ""}
                        onChange={(e) =>
                            setQuery({
                                ...query,
                                login_after_date: e.target.value,
                            })
                        }
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="login_before_date"
                        label="Fecha de fin de sesión"
                        variant="standard"
                        type="date"
                        value={query?.login_before_date || ""}
                        onChange={(e) =>
                            setQuery({
                                ...query,
                                login_before_date: e.target.value,
                            })
                        }
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button
                        onClick={() => {
                            setQuery({});
                        }}
                    >
                        Limpiar filtros
                    </Button>
                </Stack>
            </>
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
                            <TableCell>
                                {user.status ? "ACTIVO" : "CERRADO"}
                            </TableCell>
                            <TableCell>
                                {user.Sessions?.length > 0
                                    ? user.Sessions[0]?.createdAt
                                    : "SIN SESIÓN"}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}
