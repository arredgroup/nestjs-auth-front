import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button } from '@mui/material';
import Layout from '@/components/layout';
import AuthService from '@/services/AuthService';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
    const [loginBeforeDateFilter, setLoginBeforeDateFilter] = useState('');
    const [loginAfterDateFilter, setLoginAfterDateFilter] = useState('');
    const [activeFilter, setActiveFilter] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3001/api/v1/users/findUsers', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    name: nameFilter,
                    login_before_date: loginBeforeDateFilter,
                    login_after_date: loginAfterDateFilter,
                    active: activeFilter
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            // Handle error, show message to user
        }
    };

    const handleFilterSubmit = () => {
        fetchUsers();
    };

    return (
        <Layout>
            <Container maxWidth="lg">
                <Typography variant="h4" gutterBottom>
                    Users
                </Typography>
                <TextField
                    label="Name"
                    variant="outlined"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                />
                {/* Other filter inputs go here */}
                <Button variant="contained" onClick={handleFilterSubmit}>
                    Apply Filters
                </Button>
                <div>
                    {/* Render users here */}
                    {users.map((user) => (
                        <div key={user.id}>
                            <Typography variant="h6">{user.name}</Typography>
                            <Typography>Email: {user.email}</Typography>
                            <Typography>Status: {user.status ? 'Active' : 'Inactive'}</Typography>
                            {/* Add more details as needed */}
                        </div>
                    ))}
                </div>
            </Container>
        </Layout>
    );
};

export default Users;
