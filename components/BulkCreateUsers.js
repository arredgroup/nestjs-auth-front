import React, { useState } from 'react';
import axios from 'axios';

const BulkCreateUsers = () => {
    const [users, setUsers] = useState([{ name: '', email: '', password: '' }]);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newUsers = [...users];
        newUsers[index][name] = value;
        setUsers(newUsers);
    };

    const handleAddUser = () => {
        setUsers([...users, { name: '', email: '', password: '' }]);
    };

    const handleRemoveUser = (index) => {
        const newUsers = users.filter((_, i) => i !== index);
        setUsers(newUsers);
    };

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:3001/api/v1/users/bulkCreate', { users }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Users created successfully');
        } catch (error) {
            console.error('Error creating users', error);
        }
    };

    return (
        <div>
            <h1>Bulk Create Users</h1>
            {users.map((user, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={user.name}
                        onChange={(e) => handleChange(index, e)}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) => handleChange(index, e)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(e) => handleChange(index, e)}
                    />
                    <button onClick={() => handleRemoveUser(index)}>Remove</button>
                </div>
            ))}
            <button onClick={handleAddUser}>Add User</button>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default BulkCreateUsers;
