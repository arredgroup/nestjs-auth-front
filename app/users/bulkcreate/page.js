"use client";
import React, { useEffect, useState } from "react";
import AuthService from "@/services/AuthService";
import { Button, TextField, IconButton } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";

const BulkCreateUsers = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/login");
    }
  });

  const handleAddUser = () => {
    setUsers([
      ...users,
      {
        name: "",
        email: "",
        password: "",
        password_second: "",
        cellphone: "",
      },
    ]);
  };

  const handleRemoveUser = (index) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };

  const handleChange = (index, field, value) => {
    const newUsers = [...users];
    newUsers[index][field] = value;
    setUsers(newUsers);
  };

  const handleSubmit = async () => {
    const response = await AuthService.bulkCreateUsers(users);
    console.log(response);
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>Bulk create</h1>
        {users.map((user, index) => (
          <div key={index}>
            <TextField
              label="Nombre"
              value={user.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
            <TextField
              label="Email"
              value={user.email}
              onChange={(e) => handleChange(index, "email", e.target.value)}
            />
            <TextField
              label="Contraseña"
              type="password"
              value={user.password}
              onChange={(e) => handleChange(index, "password", e.target.value)}
            />
            <TextField
              label="Confirmar Contraseña"
              type="password"
              value={user.password_second}
              onChange={(e) =>
                handleChange(index, "password_second", e.target.value)
              }
            />
            <TextField
              label="Teléfono"
              value={user.cellphone}
              onChange={(e) => handleChange(index, "cellphone", e.target.value)}
            />
            <IconButton onClick={() => handleRemoveUser(index)}>
              <Delete />
            </IconButton>
          </div>
        ))}
        <Button onClick={handleAddUser}>
          <Add /> Añadir Usuario
        </Button>
        <Button onClick={handleSubmit}>Enviar</Button>
      </div>
    </>
  );
};

export default BulkCreateUsers;
