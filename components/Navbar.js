import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AuthService from '@/services/AuthService';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();
    const [user, setUser] = useState({ name: "" });

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }, []);

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        const result = await AuthService.logOut(token);
        if (result) {
            router.push('/login');
        }
    }

    const handleFindUsers = () => {
        router.push('/findUsers');
    }
    const handlebulkCreate = () => {
        router.push('/bulkCreate');
    }
    return (
        <div className="navbar">
            <div className="navbar-item">
                {user?.name}
            </div>
            <div className={"login-box-child"}>
                        <Button type="submit" variant="contained" color="primary" onClick={handleFindUsers}>findUsers</Button>
            </div>
            <div className={"login-box-child"}>
                        <Button type="submit" variant="contained" color="primary" onClick={handlebulkCreate}>bulkCreate</Button>
            </div>
            <div className="navbar-item">
                <Button onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </div>
    );
}

export default Navbar;
