// En un nuevo archivo, por ejemplo, UserFilters.js
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const UserFilters = ({ onFilter }) => {
  const [name, setName] = useState('');
  const [loginBeforeDate, setLoginBeforeDate] = useState('');
  const [loginAfterDate, setLoginAfterDate] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ name, loginBeforeDate, loginAfterDate, status });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Login Before Date" type="date" value={loginBeforeDate} onChange={(e) => setLoginBeforeDate(e.target.value)} />
      <TextField label="Login After Date" type="date" value={loginAfterDate} onChange={(e) => setLoginAfterDate(e.target.value)} />
      <TextField label="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
      <Button type="submit">Filter</Button>
    </form>
  );
};