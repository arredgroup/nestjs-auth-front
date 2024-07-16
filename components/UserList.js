"use client";
import React, { useState, useEffect } from "react";
import { Container, TextField, Button, FormControlLabel, Checkbox, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useRouter } from 'next/navigation';
import Navbar from './Navbar';
import styles from './UserList.module.css';

const UserList = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    login_before_date: "",
    login_after_date: "",
    active: false,
  });

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name') || '';
    const login_before_date = urlParams.get('login_before_date') || '';
    const login_after_date = urlParams.get('login_after_date') || '';
    const active = urlParams.get('active') === 'true';
    setFilters({
      name,
      login_before_date,
      login_after_date,
      active,
    });
  }, []);

  const handleChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
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

  const updateURLWithFilters = () => {
    const url = new URL(window.location);
    url.searchParams.set('name', filters.name);
    url.searchParams.set('login_before_date', filters.login_before_date);
    url.searchParams.set('login_after_date', filters.login_after_date);
    url.searchParams.set('active', filters.active);
    router.push(url.toString());
  };

  const toggleActiveStatus = (index) => {
    const newUsers = [...users];
    newUsers[index].active = !newUsers[index].active;
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
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
                      <IconButton className={styles.editButton} aria-label={"Editar usuario " + user.name} onClick={() => toggleActiveStatus(index)}>
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
};

export default UserList;










