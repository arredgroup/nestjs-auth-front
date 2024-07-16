import axios from 'axios';

const initializeDefaultUsers = () => {
    let users = JSON.parse(localStorage.getItem('registeredUsers'));
    // Inicializar datos si no existen
    if (!users) {
        users = [
            { id: 1, name: 'Muhammad Fake', email: 'a@b.cl', password: '123456', password_second: '123456', cellphone: '1234567890', status: false },
            { id: 2, name: 'Muhammed Fake', email: 'b@b.cl', password: 'abcdef', password_second: 'abcdef', cellphone: '0987654321', status: false },
            { id: 3, name: 'Muhammid Fake', email: 'c@b.cl', password: 'password', password_second: 'password', cellphone: '1122334455', status: false }
        ];
        localStorage.setItem('registeredUsers', JSON.stringify(users));
    }
};

const handleLogin = async (email, password) => {
    let users = JSON.parse(localStorage.getItem('registeredUsers'));
    
    // Verificar si el usuario existe y la contraseña es correcta
    const userIndex = users.findIndex(user => user.email === email && user.password === password);

    if (userIndex !== -1) {
        const user = users[userIndex];

        const token = 'phantom-token'; // Generación de token (puedes mejorar esto usando alguna librería de generación de tokens)

        const authenticatedUser = {
            ...user,
            token: token,
            status: true
        };

        users[userIndex].status = true; // Marcar al usuario como activo
        localStorage.setItem('registeredUsers', JSON.stringify(users)); // Guardar los usuarios actualizados
        localStorage.setItem('user', JSON.stringify(authenticatedUser));
        localStorage.setItem('token', token);  // Guardar el token por separado
        return true;
    } else {
        return false;
    }
};

const getUsers = async () => {
    try {
        const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        return users;
    } catch (e) {
        console.error(e);
        return [];
    }
}

const getUserById = async (id, token) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/v1/users/${id}`, {
            headers: {
                token,
            }
        });
        return response.data;
    } catch(e){
        console.error(e);
        return null;
    }
}

const logOut = async () => {
    try {
        let users = JSON.parse(localStorage.getItem('registeredUsers'));
        const currentUser = JSON.parse(localStorage.getItem('user'));

        if (currentUser) {
            const userIndex = users.findIndex(user => user.id === currentUser.id);
            if (userIndex !== -1) {
                users[userIndex].status = false; // Marcar al usuario como inactivo al cerrar sesión
                localStorage.setItem('registeredUsers', JSON.stringify(users));
            }
        }

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
        const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

        const newUser = {
            id: users.length + 1,
            name: name,
            email: email,
            password: password,
            password_second: password_second,
            cellphone: cellphone,
            status: false
        };

        users.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

const updateUser = async (id, user, token) => {
    try {
        const response = await axios.put(`http://localhost:3001/api/v1/users/${id}`, user, {
            headers: {
                token,
            }
        });
        
        return (response.status === 200);
    } catch (e) {
        console.error(e);
        return false;
    }
}

initializeDefaultUsers(); // Llamar a esta función para inicializar usuarios por defecto

export default {
    handleLogin,
    getUsers,
    getUserById,
    logOut,
    registerUser,
    updateUser,
};
