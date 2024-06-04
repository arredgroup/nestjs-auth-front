import axios from 'axios';

const handleLogin = (user, pass) => {
    //const response = axios.post('fakeapi', {user, pass});
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
}

export default {
    handleLogin,
};