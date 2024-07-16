const handleLogin = async (user, pass) => {
    try {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const foundUser = storedUsers.find(u => u.email === user && u.password === pass);
        
        if (foundUser) {
            localStorage.setItem('token', 'tokenfantasma');
            localStorage.setItem('user', JSON.stringify(foundUser));
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.error(e);
        return false;
    }
}

const getUsers = async () => {
    try {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users;
    } catch (e) {
        console.error(e);
        return [];
    }
}

const getUserById = async (id) => {
    try {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.id === id);
        return user || null;
    } catch (e) {
        console.error(e);
        return null;
    }
}

const logOut = async () => {
    try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

const registerUser = async (name, email, password, password_second, cellphone) => {
    try {
        if (password !== password_second) {
            throw new Error('Passwords do not match');
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const newUser = {
            id: users.length + 1,
            name,
            email,
            password,
            cellphone,
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

const updateUser = async (id, updatedUser) => {
    try {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.id === id);

        if (userIndex === -1) {
            return false;
        }

        users[userIndex] = { ...users[userIndex], ...updatedUser };
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

const bulkCreateUsers = async (users) => {
    try {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const newUsers = users.map((user, index) => ({
            id: existingUsers.length + index + 1,
            name: user.name,
            email: user.email,
            password: user.password,
            cellphone: user.cellphone,
        }));

        const allUsers = [...existingUsers, ...newUsers];
        localStorage.setItem('users', JSON.stringify(allUsers));
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export default {
    handleLogin,
    getUsers,
    getUserById,
    logOut,
    registerUser,
    updateUser,
    bulkCreateUsers,
};
