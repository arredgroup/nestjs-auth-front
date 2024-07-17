import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UserFilters = ({ onFilter }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleFilter = () => {
        onFilter({ name, email });
    };

    return (
        <div>
            <TextField
                label="Nombre"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleFilter} variant="contained">Filtrar</Button>
        </div>
    );
};

export default UserFilters;
