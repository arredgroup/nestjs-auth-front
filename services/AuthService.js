import axios from 'axios';

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

const getfindUsers = async (query, token) => {
    const queryparams = new URLSearchParams(query).toString();
    try {
        console.log("nquery",query);
        const response = await axios.get('http://localhost:3001/api/v1/users/findUsers?' + queryparams, {
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

const bulkCreate = async (body, token) => {
    console.log("Esta intentando enviar", body);
    try {
        console.log("Esta intentando enviar", body);
        const response = await axios.post('http://localhost:3001/api/v1/users/bulkCreate', body, {
            headers: {
                'token': token,
            }
        });
        console.log(response);
        return (response);
    } catch (e) {
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

export default {
    handleLogin,
    getUsers,
    getUserById,
    logOut,
    registerUser,
    updateUser,
    getfindUsers,
    bulkCreate,
};