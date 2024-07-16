// Hola profesor, yo solo estaba en electivo Front End :c
const users = [
    {
        id: 1,
        name: 'Miguel',
        email: 'miguel@gmail.com',
        password: '1', 
        status: true,
        roles: ['admin'],
        date: "15/7/2024, 19:26:29",
    },
    {
        id: 2,
        name: 'Pablo',
        email: 'userdos@example.com',
        password: '2', 
        status: true,
        roles: ['user'],
        date: "12/7/2024, 20:20:12",
    },
    {
        id: 3,
        name: 'Javier',
        email: 'usertres@example.com',
        password: '1', 
        status: false,
        roles: ['user'],
        date: "8/7/2024, 21:22:29",
    },
    {
        id: 4,
        name: 'Martin',
        email: 'usercuatro@example.com',
        password: '4', 
        status: false,
        roles: ['user'],
        date: "13/7/2024, 18:34:29",
    },
];

class MockAuthService {
    static handleLogin(email, password) {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            const token = btoa(JSON.stringify(user));
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            return true;
        }
        return false;
    }

    static registerUser(name, email, password, password_second, cellphone) {
        users.push({
            id: users.length + 1,
            name,
            email,
            status: true,
            roles: ['user'],
            date: null,
        });
        return true;
    }

    static getUsers() {
        return users;
    }

    static getUserById(id) {
        return users.find(u => u.id === id);
    }

    static logOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return true;
    }
    static bulkCreateUsers(usersData) {
        usersData.forEach(userData => {
            users.push({
                id: users.length + 1,
                name: userData.name,
                email: userData.email,
                password: userData.password,
                status: true,
                roles: ['user'],
                date: null,
            });
        });
        return true;
    }
}

export default MockAuthService;
