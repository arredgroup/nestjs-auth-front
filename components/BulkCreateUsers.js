import React, { useState } from 'react';
import axios from 'axios';
import './BulkCreateUsers.css';

const BulkCreateUsers = () => {
  const [users, setUsers] = useState([{ name: '', email: '' }]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newUsers = [...users];
    newUsers[index][name] = value;
    setUsers(newUsers);
  };

  const handleAddUser = () => {
    setUsers([...users, { name: '', email: '' }]);
  };

  const handleRemoveUser = (index) => {
    const newUsers = users.filter((user, i) => i !== index);
    setUsers(newUsers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      await axios.post('http://localhost:3001/api/v1/users/bulkCreate', users, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Users created successfully');
    } catch (error) {
      console.error('Error creating users:', error);
    }
  };

  return (
    <div className="bulk-create-container">
      <h2>Bulk Create Users</h2>
      <form onSubmit={handleSubmit} className="bulk-create-form">
        {users.map((user, index) => (
          <div key={index} className="user-input">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={user.name}
              onChange={(e) => handleInputChange(index, e)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => handleInputChange(index, e)}
            />
            <button type="button" onClick={() => handleRemoveUser(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddUser}>Add User</button>
        <button type="submit">Create Users</button>
      </form>
    </div>
  );
};

export default BulkCreateUsers;
