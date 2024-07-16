"use client";
import React, { useEffect, useState } from "react";
import { Container, Card, CardContent, TextField, Button } from "@mui/material";
import SimpleSnackbar from "@/components/SimpleSnackbar";
import Navbar from "@/components/Navbar";
import styles from "./BulkCreate.module.css";

const BulkCreate = () => {
  const [users, setUsers] = useState([{ name: "", email: "", password: "", confirmPassword: "", cellphone: "" }]);
  const [message, setMessage] = useState("");
  const [openSnack, setOpenSnack] = useState(false);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("usersToCreate")) || [];
    if (savedUsers.length > 0) setUsers(savedUsers);
  }, []);

  const handleChange = (index, field, value) => {
    const newUsers = [...users];
    newUsers[index][field] = value;
    setUsers(newUsers);
    localStorage.setItem("usersToCreate", JSON.stringify(newUsers));
  };

  const addUser = () => {
    setUsers([...users, { name: "", email: "", password: "", confirmPassword: "", cellphone: "" }]);
  };

  const removeUser = (index) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
    localStorage.setItem("usersToCreate", JSON.stringify(newUsers));
  };

  const submitUsers = () => {
    // Validar que todos los campos estén completos
    for (const user of users) {
      if (!user.name || !user.email || !user.password || !user.confirmPassword || !user.cellphone) {
        setMessage("Todos los campos son obligatorios.");
        setOpenSnack(true);
        return;
      }
      if (user.password !== user.confirmPassword) {
        setMessage("Las contraseñas no coinciden.");
        setOpenSnack(true);
        return;
      }
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const newEmails = users.map(user => user.email);
    const existingEmails = existingUsers.map(user => user.email);

    // Verificar correos duplicados en los usuarios existentes
    const duplicatesInExistingUsers = newEmails.filter(email => existingEmails.includes(email));
    if (duplicatesInExistingUsers.length > 0) {
      setMessage(`Los siguientes correos ya existen: ${duplicatesInExistingUsers.join(", ")}`);
      setOpenSnack(true);
      return;
    }

    // Verificar correos duplicados en los nuevos usuarios
    const duplicatesInNewUsers = newEmails.filter((email, index) => newEmails.indexOf(email) !== index);
    if (duplicatesInNewUsers.length > 0) {
      setMessage(`Los siguientes correos están duplicados en los usuarios nuevos: ${duplicatesInNewUsers.join(", ")}`);
      setOpenSnack(true);
      return;
    }

    const updatedUsers = [...existingUsers, ...users];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.removeItem("usersToCreate");
    setMessage("Usuarios creados exitosamente.");
    setOpenSnack(true);
  };

  return (
    <Container>
      <Navbar />
      <SimpleSnackbar message={message} openSnack={openSnack} closeSnack={() => setOpenSnack(!openSnack)} />
      <Card className={styles.form}>
        <CardContent>
          <h1>Crear Usuarios Masivamente</h1>
          {users.map((user, index) => (
            <div key={index} className={styles.userInput}>
              <TextField
                label="Nombre"
                variant="outlined"
                value={user.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
                required
              />
              <TextField
                label="Email"
                variant="outlined"
                value={user.email}
                onChange={(e) => handleChange(index, "email", e.target.value)}
                required
              />
              <TextField
                label="Contraseña"
                variant="outlined"
                type="password"
                value={user.password}
                onChange={(e) => handleChange(index, "password", e.target.value)}
                required
              />
              <TextField
                label="Confirmar Contraseña"
                variant="outlined"
                type="password"
                value={user.confirmPassword}
                onChange={(e) => handleChange(index, "confirmPassword", e.target.value)}
                required
              />
              <TextField
                label="Teléfono"
                variant="outlined"
                value={user.cellphone}
                onChange={(e) => handleChange(index, "cellphone", e.target.value)}
                required
              />
              <Button className={styles.deleteButton} variant="contained" onClick={() => removeUser(index)}>Eliminar</Button>
            </div>
          ))}
          <div className={styles.buttonGroup}>
            <Button className={styles.addButton} variant="contained" onClick={addUser}>Añadir Usuario</Button>
            <Button className={styles.submitButton} variant="contained" onClick={submitUsers}>Enviar Usuarios</Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BulkCreate;











