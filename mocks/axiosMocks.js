import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios, { delayResponse: 500 });

const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: true, lastLogin: '2023-07-12' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', status: false, lastLogin: '2023-06-01' },
    { id: 3, name: 'Jim Brown', email: 'jim.brown@example.com', status: true, lastLogin: '2023-07-01' },
    { id: 4, name: 'Lisa White', email: 'lisa.white@example.com', status: true, lastLogin: '2023-05-12' },
];

mock.onPost('http://localhost:3001/api/v1/users/findUsers').reply(config => {
    const { name, login_before_date, login_after_date, active } = JSON.parse(config.data);
    let filteredUsers = mockUsers;

    if (name) {
        filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (login_before_date) {
        filteredUsers = filteredUsers.filter(user => new Date(user.lastLogin) < new Date(login_before_date));
    }
    if (login_after_date) {
        filteredUsers = filteredUsers.filter(user => new Date(user.lastLogin) > new Date(login_after_date));
    }
    if (active !== '') {
        filteredUsers = filteredUsers.filter(user => user.status === (active === 'true'));
    }

    return [200, filteredUsers];
});

mock.onPost('http://localhost:3001/api/v1/users/bulkCreate').reply(config => {
    const { users } = JSON.parse(config.data);
    users.forEach((user, index) => {
        user.id = mockUsers.length + 1 + index;
        mockUsers.push(user);
    });
    return [200, { message: 'Users created successfully', users }];
});

export default mock;
