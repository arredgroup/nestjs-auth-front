import axios from 'axios';

const handleLogin = async (user, pass) => {
    try {
        const response = await axios.post('http://localhost:3001/api/v1/auth/login', {
            email: user,
            password: pass,
        });
        // response.data contains a token in BASE64 format

        const decoded = atob(response.data);
        localStorage.setItem('token', response.data);
        localStorage.setItem('user', decoded);
        return { success: true };
    } catch (e) {
        console.error(e);
        return { success: false, message: 'Usuario o contraseña incorrectos' };
    }
}

const getUsers = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/v1/users');
        return response.data;
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
    } catch (e) {
        console.error(e);
        return null;
    }
}

const logOut = async (token) => {
    try {
        const response = await axios.post('http://localhost:3001/api/v1/auth/logout', {}, {
            headers: {
                'token': token,
            }
        });
        if (response.status !== 200) {
            return false;
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
        const response = await axios.post('http://localhost:3001/api/v1/auth/register', {
            name,
            email,
            password,
            password_second,
            cellphone,
        });
        return (response.status === 200);
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
const findUsers = async (filters) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/api/v1/users/findUsers', {
        headers: {
          token,
        },
        params: filters
      });
      return response.data;
    } catch (e) {
      console.error(e);
      return [];
    }
};

// Nueva función para la creación de usuarios en masa
const bulkCreateUsers = async (objetos) => {
    console.log("Users received:", objetos); // Verifica los datos aquí
    try {
      const response = await axios.post('http://localhost:3001/api/v1/users/bulkCreate', objetos);
      return response.data; // Asegúrate de que la respuesta contiene 'data'
    } catch (error) {
      console.error("Error:", error); // Más detalle del error
      return { message: 'Error al crear usuarios' }; // Asegúrate de que siempre devuelve un objeto con 'message'
    }
  };

export default {
    handleLogin,
    getUsers,
    getUserById,
    logOut,
    registerUser,
    updateUser,
    bulkCreateUsers, // Asegúrate de exportar la nueva función
    findUsers,
};
