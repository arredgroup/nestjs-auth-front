import axios from 'axios';
import { formatDate } from '../utils/dateUtils';

const handleLogin = async (user, pass) => {
    try{
        const response = await axios.post('http://localhost:3001/api/v1/auth/login', {
            email: user,
            password: pass,
        });
        //response.data contains a token in BASE64 format

        const decoded = atob(response.data);
        localStorage.setItem('token', response.data);
        localStorage.setItem('user', decoded);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

const getUsers = async () => {
    try {
        //const response = await axios.get('fakeapi');
        const response = {
            data: [
                {
                    id: 1,
                    name: 'muhammad fake',
                    email: 'a@b.cl',
                    status: true
                },

                {
                    id: 2,
                    name: 'muhammed fake',
                    email: 'b@b.cl',
                    status: true
                },
                {
                    id: 3,
                    name: 'muhammid fake',
                    email: 'c@b.cl',
                    status: true
                },
            ]
        }
        return response.data;
    } catch (e) {
        console.error(e);
        return [];
    }
}

const getUserById = async (id, token) => {
    try {
        const response = await axios.get('http://localhost:3001/api/v1/users/' + id, {
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

const logOut = async (token) => {
    try {
        const response = await axios.post('http://localhost:3001/api/v1/auth/logout', {}, {
            headers: {
                'token': token,
            }
        });
        if(response.status !== 200){
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
    try{
        const response = await axios.post('http://localhost:3001/api/v1/auth/register', {
            name,
            email,
            password,
            password_second,
            cellphone,
        });
        return (response.status === 200);
    }catch (e) {
        console.error(e);
        return false;
    }
}

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
}

const getAllUsers = async (token) => {
    // No tengo un endpoint para sacar todos los usuarios, 
    // asi que utilizo el endpoint findUsers sacando los activos
    // e inactivos para tener a todos los usuarios.
    try {
        const response_active = await axios.get('http://localhost:3001/api/v1/users/findUsers?active=true', {
            headers: {
                token,
            }
        });

        const response_inactive = await axios.get('http://localhost:3001/api/v1/users/findUsers?active=false', {
            headers: {
                token,
            }
        });
        return [...response_active.data, ...response_inactive.data];
    } catch (e) {
        console.error(e);
        return false;
    }
}

const getFilterUsers = async (token, name, active, afterDate, beforeDate) => {
    const loginAfterDate = afterDate && formatDate(afterDate);
    const loginBeforeDate = beforeDate && formatDate(beforeDate);

    let url = 'http://localhost:3001/api/v1/users/findUsers?';
    url += name ? `name=${name}&`: '';
    url += typeof active === 'boolean' ? `active=${active}&`: '';
    url += loginAfterDate ? `login_after_date=${loginAfterDate}&`: '';
    url += loginBeforeDate ? `login_before_date=${loginBeforeDate}&`: '';

    console.log(url);
    console.log(token);

    try {
        const response = await axios.get(url, {
            headers: {
                token,
            },
        });
        
        return response.data;
    } catch (e) {
        console.error(e);
        return false;
    }
};


export default {
    handleLogin,
    getUsers,
    getUserById,
    logOut,
    registerUser,
    updateUser,
    getAllUsers,
    getFilterUsers,
};