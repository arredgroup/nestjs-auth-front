"use client"
import React from "react";
import { Container, Button } from "@mui/material";
import SimpleSnackbar from "@/components/SimpleSnackbar";
import AuthService from "@/services/AuthService";
import RegisterForm from "@/components/registerForm";
import { useRouter } from 'next/navigation';

import './page.css';

const Register = () => {
    const [forms, setForms] = React.useState([{ id: 0, formData: {}, errors: {} }]);
    const [message, setMessage] = React.useState("");
    const [openSnack, setOpenSnack] = React.useState(false);
    const router = useRouter();

    const updateFormData = (id, data) => {
        setForms(forms.map(form => form.id === id ? { ...form, formData: data } : form));
    };

    const handleRegisterAll = async () => {
        const newForms = forms.map((form) => {
            const newErrors = {};
            if (!form.formData.name) newErrors.name = "Este campo es obligatorio.";
            if (!form.formData.email) newErrors.email = "Este campo es obligatorio.";
            if (!form.formData.password) newErrors.password = "Este campo es obligatorio.";
            if (form.formData.password !== form.formData.password_second) newErrors.password_second = "Las contraseñas no coinciden.";
            if (!form.formData.cellphone) newErrors.cellphone = "Este campo es obligatorio.";
            return { ...form, errors: newErrors };
        });

        setForms(newForms);

        const hasErrors = newForms.some(form => Object.keys(form.errors).length > 0);
        if (hasErrors) {
            setMessage("Todos los campos deben ser completados correctamente.");
            setOpenSnack(true);
            return;
        }

        for (const form of forms) {
            const { name, email, password, password_second, cellphone } = form.formData;
            const response = await AuthService.registerUser(name, email, password, password_second, cellphone);
            if (!response) {
                setMessage(`Error al registrar usuario ${form.id + 1}`);
                setOpenSnack(true);
                return;
            }
        }

        setMessage("Todos los usuarios registrados exitosamente!");
        setOpenSnack(true);
    };

    const handleBack = () => {
        router.push('/login');
    };

    return (
        <Container>
            <SimpleSnackbar
                message={message}
                openSnack={openSnack}
                closeSnack={() => { setOpenSnack(!openSnack); }}
            />
            {forms.map((form, index) => (
                <div key={index}>
                    <RegisterForm
                        index={index}
                        formData={form.formData}
                        errors={form.errors}
                        updateFormData={updateFormData}
                    />
                </div>
            ))}
            <Button onClick={handleRegisterAll} variant="contained" color="success">Registrar</Button>
            <Button onClick={handleBack} variant="contained" color="secondary">Anterior</Button>
        </Container>

    );
};

export default Register;
