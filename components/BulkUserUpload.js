import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AuthService from '@/services/AuthService';

const BulkUserUpload = () => {
    const [bulkData, setBulkData] = useState('');
    const [message, setMessage] = useState('');

    const handleUpload = async () => {
        const users = bulkData.split('\n').map(line => {
            const [name, email, password, cellphone] = line.split(',');
            return { name, email, password, cellphone };
        });

        const response = await AuthService.bulkUploadUsers(users);
        setMessage(response ? 'Usuarios cargados exitosamente' : 'Error en la carga de usuarios');
    };

    return (
        <div>
            <TextField
                label="Datos de usuarios"
                multiline
                rows={10}
                variant="outlined"
                value={bulkData}
                onChange={(e) => setBulkData(e.target.value)}
                placeholder="Nombre,Email,Contraseña,Celular\nNombre2,Email2,Contraseña2,Celular2"
            />
            <Button onClick={handleUpload} variant="contained">Cargar Usuarios</Button>
            {message && <div>{message}</div>}
        </div>
    );
};

export default BulkUserUpload;
