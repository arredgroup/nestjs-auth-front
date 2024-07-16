"use client";
import React, { useState } from 'react';
import { Container, Button } from "@mui/material";
import SimpleSnackbar from "@/components/SimpleSnackbar";
import Register from "@/components/Form";
import { useRouter } from 'next/navigation';
import './page.css';

const Registers = () => {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [openSnack, setOpenSnack] = useState(false);
    const [registers, setRegisters] = useState([{ id: 0, formData: {} }]);

    const addRegister = () => {
        setRegisters([...registers, { id: registers.length, formData: {} }]);
    };

    const updateFormData = (id, data) => {
        setRegisters(registers.map(register => register.id === id ? { ...register, formData: data } : register));
    };

    const removeRegister = (id) => {
        setRegisters(registers.filter(register => register.id !== id));
    };

    const handleRegisterAll = async () => {
        const existingUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        const existingEmails = existingUsers.map(user => user.email);

        for (const register of registers) {
            const { name, email, password, password_second, cellphone } = register.formData;

            if (password !== password_second) {
                setMessage(`Las contraseñas no coinciden para el registro ${register.id + 1}`);
                setOpenSnack(true);
                return;
            }

            if (existingEmails.includes(email)) {
                setMessage(`El correo ${email} ya está registrado.`);
                setOpenSnack(true);
                return;
            }

            existingUsers.push({ name, email, password, cellphone, status: 'false' });
        }

        localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));
        setMessage("Todos los usuarios registrados exitosamente!");
        setOpenSnack(true);

        setRegisters([{ id: 0, formData: {} }]);
        router.push('/login'); 
    };

    const handleLoginRedirect = () => {
        router.push('/login');
    };

    return (
        <Container>
            <SimpleSnackbar
                message={message}
                openSnack={openSnack}
                closeSnack={() => { setOpenSnack(!openSnack); }}
            />
            {registers.map((register, index) => (
                <Register
                    key={index}
                    id={register.id}
                    updateFormData={updateFormData}
                    formData={register.formData}
                    removeRegister={removeRegister}
                />
            ))}
            <Button onClick={addRegister}>Añadir</Button>
            <Button onClick={handleRegisterAll}>Registrar Todos</Button>
            <Button onClick={handleLoginRedirect} variant="outlined" color="primary">Login</Button>
        </Container>
    );
};

export default Registers;
