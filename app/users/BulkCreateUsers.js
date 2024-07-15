import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import Layout from '@/components/layout';
import SimpleSnackbar from '@/components/SimpleSnackbar';
import AuthService from '@/services/AuthService';

const BulkCreateUsers = () => {
    const [userData, setUserData] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleUserChange = (e) => {
        setUserData(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3001/api/v1/users/bulkCreate', {
                users: JSON.parse(userData)
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setSnackbarMessage('Users created successfully');
                setOpenSnackbar(true);
                setUserData('');
            } else {
                setSnackbarMessage('Failed to create users');
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error('Error creating users:', error);
            setSnackbarMessage('Error creating users');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Layout>
            <Container maxWidth="md">
                <Typography variant="h4" gutterBottom>
                    Bulk Create Users
                </Typography>
                <TextField
                    label="Enter user data JSON"
                    variant="outlined"
                    multiline
                    rows={6}
                    fullWidth
                    value={userData}
                    onChange={handleUserChange}
                />
                <Button variant="contained" onClick={handleSubmit}>
                    Submit
                </Button>
            </Container>
            <SimpleSnackbar
                openSnack={openSnackbar}
                closeSnack={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </Layout>
    );
};

export default BulkCreateUsers;
