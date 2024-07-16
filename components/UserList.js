'use client';

import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Edit } from "@mui/icons-material";
import Navbar from './Navbar';
import styles from './UserList.module.css'; // Importa el archivo CSS
import './UserList.module.css';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Obtener usuarios registrados desde Local Storage al cargar la página
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        setUsers(registeredUsers);
    }, []);

    return (
        
            <Navbar>
            <Container>
            <Card className={styles.form}>
                <h1>Lista de Usuarios Registrados</h1>
                <Table className={styles.table}> {/* Aplica la clase para estilos de tabla */}
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                            {/* Otros campos según necesidad */}
                            <TableCell>Acciones</TableCell> {/* Columna para acciones */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                {/* Otros campos según necesidad */}
                                <TableCell>
                                    <Edit className={styles.editButton} /> {/* Icono de edición con estilo */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </Card>
            </Container>
            </Navbar>
    );
};

export default UsersList;
