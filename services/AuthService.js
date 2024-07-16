const handleLogin = async (email, password) => {
    try {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const foundUser = storedUsers.find(user => user.email === email && user.password === password);

        if (foundUser) {
            localStorage.setItem('user', JSON.stringify(foundUser));
            return true;
        } else {
            throw new Error('Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return false;
    }
};

const getUsers = async () => {
    // Obtener los usuarios del localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    return storedUsers;
};

const getUserById = async (id) => {
    // Simulando una respuesta exitosa del servidor
    const users = await getUsers();
    return users.find(user => user.id === id) || null;
};

const logOut = async () => {
    // Simulando una operación de cierre de sesión exitosa
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
};

const registerUser = async (name, email, password, password_second, cellphone) => {
    try {
        if (password !== password_second) {
            throw new Error('Passwords do not match');
        }

        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, password_second, cellphone })
        });

        if (!response.ok) {
            throw new Error('Error al registrar usuario');
        }

        // Obtener los usuarios actuales del localStorage
        let users = JSON.parse(localStorage.getItem('users'));

        // Asegurarse de que users sea un array
        if (!Array.isArray(users)) {
            users = [];
        }

        // Agregar el nuevo usuario
        const newUser = {
            name,
            email,
            password,
            cellphone
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        return true;
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return false;
    }
};


const updateUser = async (id, user) => {
    // Simulando una operación de actualización exitosa
    return true;
};

const getAllUsers = async () => {
    // Obtener los usuarios del localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    return storedUsers;
};

export default {
    handleLogin,
    getUsers,
    getUserById,
    logOut,
    registerUser,
    updateUser,
    getAllUsers
};
