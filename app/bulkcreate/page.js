"use client"
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Navbar from '@/components/Navbar';
import AuthService from '@/services/AuthService';
import { Snackbar, Alert } from '@mui/material';

const BulkAddUsers = () => {
  const [users, setUsers] = useState([
    { name: '', email: '', cellphone: '', password: '' },
  ]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleUserChange = (index, event) => {
    const newUsers = [...users];
    newUsers[index][event.target.name] = event.target.value;
    setUsers(newUsers);
  };

  const addUser = () => {
    setUsers([...users, { name: '', email: '', cellphone: '', password: '' }]);
  };

  const removeUser = (index) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const payload = {
      usersList: users
    };
    const token = localStorage.getItem('token');
    const response = await AuthService.bulkCreate(payload, token);
    
    if(response){
      console.log(response.data);
      setMessage(response.data);
      setSnackbarOpen(true)
    }

  }      
  catch(e){
    console.error(e);
    setMessage("hubo un error");
    setSnackbarOpen(true)
    };  
  };      

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Navbar />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <Snackbar message={message} open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}/>
        {users.map((user, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
            <TextField
              name="name"
              label="Name"
              value={user.name}
              onChange={(e) => handleUserChange(index, e)}
            />
            <TextField
              name="email"
              label="Email"
              value={user.email}
              onChange={(e) => handleUserChange(index, e)}
            />
            <TextField
              name="cellphone"
              label="cellphone"
              value={user.cellphone}
              onChange={(e) => handleUserChange(index, e)}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              value={user.password}
              onChange={(e) => handleUserChange(index, e)}
            />
            {index === users.length - 1 && (
              <Button onClick={addUser} variant="contained" color="primary">
                Add User
              </Button>
            )}
            {users.length > 1 && (
              <Button onClick={() => removeUser(index)} variant="contained" color="secondary">
                Remove
              </Button>
            )}
          </Box>
        ))}
        <Button type="submit" variant="contained">Submit</Button>
      </Box>
    </form>
  );
};

export default BulkAddUsers;