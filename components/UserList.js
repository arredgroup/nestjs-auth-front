import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    login_before_date: '',
    login_after_date: '',
    active: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:3001/api/v1/users/findUsers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: filters,
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <form onSubmit={handleSubmit} className="filter-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={filters.name}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="login_before_date"
          value={filters.login_before_date}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="login_after_date"
          value={filters.login_after_date}
          onChange={handleInputChange}
        />
        <select
          name="active"
          value={filters.active}
          onChange={handleInputChange}
        >
          <option value="">Select Active Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <button type="submit">Apply Filters</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
