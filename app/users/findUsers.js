"use client"
import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar'
import AuthService from '../../services/AuthService';;

export default function FindUsers() {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
    const [loginBeforeDate, setLoginBeforeDate] = useState('');
    const [loginAfterDate, setLoginAfterDate] = useState('');
    const [isActive, setIsActive] = useState(null);

    useEffect(() => {
        const queryParams = {
          name: nameFilter,
          loginDateBefore: loginBeforeDate,
          loginDateAfter: loginAfterDate,
          status: isActive,
        };
    
        fetchUsers(queryParams);
      }, [nameFilter, loginBeforeDate, loginAfterDate, isActive]);
    

    const fetchUsers = async (queryParams) => {
        try {
            const token = localStorage.getItem("token");
            const data = await AuthService.findUsers(token, queryParams);
            setUsers(data); 
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <Container>
            <h1>Regresar a Index</h1>
            <button onClick={() => router.push('/users')}>Index</button>
            <Navbar />
            <h1>Find Users</h1>
            <div>
                <label htmlFor="nameFilter">Name:</label>
                <input type="text" id="nameFilter" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
                <label htmlFor="loginBeforeDate">Login Before:</label>
                <input type="date" id="loginBeforeDate" value={loginBeforeDate} onChange={(e) => setLoginBeforeDate(e.target.value)} />
                <label htmlFor="loginAfterDate">Login After:</label>
                <input type="date" id="loginAfterDate" value={loginAfterDate} onChange={(e) => setLoginAfterDate(e.target.value)} />
                <label htmlFor="isActive">Active:</label>
                <select id="isActive" value={isActive} onChange={(e) => setIsActive(e.target.value === 'true' ? true : e.target.value === 'false' ? false : null)}>
                    <option value={null}>All</option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Estado</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.status ? 'ACTIVO' : 'CERRADO'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}