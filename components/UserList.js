import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Definición del componente UserList
const UserList = () => {
    // Estado para almacenar la lista de usuarios
    const [users, setUsers] = useState([]);

    // Estado para almacenar los filtros de búsqueda
    const [filters, setFilters] = useState({
        name: '', // Filtro para el nombre del usuario
        login_before_date: '', // Filtro para buscar usuarios que hayan iniciado sesión antes de una fecha específica
        login_after_date: '', // Filtro para buscar usuarios que hayan iniciado sesión después de una fecha específica
        active: '' // Filtro para buscar usuarios activos o inactivos
    });

    // Función para obtener los usuarios desde la API utilizando los filtros
    const fetchUsers = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/v1/users/findUsers', filters, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            // Actualiza el estado con los datos recibidos de la API
            setUsers(response.data);
        } catch (error) {
            // Maneja cualquier error que ocurra durante la petición
            console.error('Error fetching users', error);
        }
    };

    // Hook useEffect para ejecutar fetchUsers cuando los filtros cambien
    useEffect(() => {
        fetchUsers();
    }, [filters]);

    // Función para manejar los cambios en los filtros
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        // Actualiza el estado de los filtros con el nuevo valor
        setFilters({
            ...filters,
            [name]: value
        });
    };

    return (
        <div>
            <h1>User List</h1>
            <div>
                {/* Campos para ingresar los filtros */}
                <label>
                    Name: {/* Campo para filtrar por nombre */}
                    <input type="text" name="name" value={filters.name} onChange={handleFilterChange} />
                </label>
                <label>
                    Login Before Date: {/* Campo para filtrar por fecha de inicio de sesión antes de una fecha específica */}
                    <input type="date" name="login_before_date" value={filters.login_before_date} onChange={handleFilterChange} />
                </label>
                <label>
                    Login After Date: {/* Campo para filtrar por fecha de inicio de sesión después de una fecha específica */}
                    <input type="date" name="login_after_date" value={filters.login_after_date} onChange={handleFilterChange} />
                </label>
                <label>
                    Active: {/* Campo para filtrar por estado activo/inactivo */}
                    <select name="active" value={filters.active} onChange={handleFilterChange}>
                        <option value="">All</option> {/* Opción para mostrar todos los usuarios */}
                        <option value="true">True</option> {/* Opción para mostrar solo usuarios activos */}
                        <option value="false">False</option> {/* Opción para mostrar solo usuarios inactivos */}
                    </select>
                </label>
            </div>
            <button onClick={fetchUsers}>Apply Filters</button>
            <ul>
                {/* Muestra la lista de usuarios */}
                {users.map(user => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
