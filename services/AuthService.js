import axios from 'axios';

const handleLogin = async (user, pass) => {
    try{
        //const response = await axios.post('fakeapi', {user, pass});
        const response = {
            data: {
                user: 'fake-user',
                name: 'muhammad fake',
                token: 'fake-token',
                expiration: new Date() + (1000 * 60 * 60 * 5), // 5 hours,
                roles: ['user']
            }
        };
        localStorage.setItem('user', JSON.stringify(response.data));
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

const getUserById = async (id) => {
    try {
        //const response = await axios.get('fakeapi');
        const response = {
            data: {
                name: 'muhammad fake',
                email: 'a@b.cl',
                status: true,
            }
        };
        return response.data;
    } catch(e){
        console.error(e);
        return null;
    }
}

export default {
    handleLogin,
    getUsers,
    getUserById,
};