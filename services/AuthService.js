// AuthService.js
import axios from 'axios';

const handleLogin = async (user, pass) => {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/auth/login', {
      email: user,
      password: pass,
    });
    const decoded = atob(response.data);
    localStorage.setItem('token', response.data);
    localStorage.setItem('user', decoded);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const getUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/v1/users');
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

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

const getUserById = async (id, token) => {
  try {
    const response = await axios.get('http://localhost:3001/api/v1/users/' + id, {
      headers: {
        token,
      }
    });
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

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
};

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
};

const bulkCreateUsers = async (users) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:3001/api/v1/users/bulkCreate', users, {
      headers: {
        token,
      }
    });
    return response.data;
  } catch (e) {
    console.error(e);
    return { code: 500, message: "Error al registrar usuarios" };
  }
};

const updateUser = async (id, user, token) => {
  try {
    const response = await axios.put('http://localhost:3001/api/v1/users/' + id, user, {
      headers: {
        token,
      }
    });
    return (response.status === 200);
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default {
  handleLogin,
  getUsers,
  findUsers,
  getUserById,
  logOut,
  registerUser,
  bulkCreateUsers,
  updateUser,
};
