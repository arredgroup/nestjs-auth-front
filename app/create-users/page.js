"use client"
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { 
    Card,
    Container, 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    TextField,
    Button,
    Modal,
    IconButton,
    Alert,
    Snackbar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle } from "@mui/material";
import { HowToReg, Delete, Edit, Add } from '@mui/icons-material';
import AuthService from '../../services/AuthService';

import './page.css';
import Navbar from '@/components/Navbar';

const style = {
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -35%)',
    width: 600,
};

export default function CreateUsers(){
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordSecond, setPasswordSecond] = useState("");
    const [cellphone, setCellphone] = useState("");
    const [users, setUsers] = useState([]);
    const [editedUser, setEditedUser] = useState({});
    const [deletedUser, setDeletedUser] = useState({});
    const [dialogConfirmOpen, setDialogConfirmOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTypeEdit, setModalTypeEdit] = useState(false);
    const [formErrorLog, setFormErrorLog] = useState([]);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [snackBarType, setSnackBarType] = useState('success');
    const [backendDetails, setBackendDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleModalClose = () => {
        setModalOpen(false);
        setFormErrorLog([]);
        clearForm();
    }

    const handleModalAddUser = () => {
        setModalTypeEdit(false);
        setModalOpen(true);
    }

    const handleAddEditUser = () => {
        let validEmail = true;
        users.forEach((u) => {
            if (email === u.email && u.email !== editedUser.email) {
                validEmail = false;
            }
        });

        const errorLog = [];
        if (name === '')
            errorLog.push('Ingrese un nombre de usuario');
        if (email === '' || !email.includes('@'))
            errorLog.push('Ingrese un email válido');

        if (password === '' || passwordSecond === '')
            errorLog.push('Ingrese ambas contraseñas');
        else if (password !== passwordSecond) 
            errorLog.push('Las contraseñas no coinciden');

        if (cellphone === '')
            errorLog.push('Ingrese un número de telefono');
        if (!validEmail) 
            errorLog.push('El email ya está siendo usado');
        
        
        if (errorLog.length > 0) {
            setFormErrorLog(errorLog);
            return false;
        } 

        if (modalTypeEdit) {
            let indice = null;
            users.forEach((u, i) => {
                if (u.email === editedUser.email) indice = i;
            });

            setUsers([...users.splice(indice, 1)]);
        }

        const new_user = {
            'name': name,
            'email': email,
            'password': password,
            'password_second': passwordSecond,
            'cellphone': cellphone,
        };

        setUsers([...users, new_user]);
        setModalOpen(false);
        clearForm();
        setSnackBarType('success');
        setSnackBarMessage('Usuario ' + (modalTypeEdit ? 'editado': 'añadido'));
        setSnackBarOpen(true);
    }

    const handleEditUserModal = (user) => {
        setEditedUser(user);
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
        setPasswordSecond(user.password);
        setCellphone(user.cellphone);
        setModalTypeEdit(true);
        setModalOpen(true);
    }

    const clearForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setPasswordSecond('');
        setCellphone('');
    }

    const handleDialogConfirmClose = (action) => {
        if (action === true) {
            setUsers([...users.filter(u => u.email !== deletedUser.email)]);
            setSnackBarType('success');
            setSnackBarMessage('Usuario eliminado');
            setSnackBarOpen(true);
        }

        setDialogConfirmOpen(false);
    }

    const handleDeleteUser = (user) => {
        setDeletedUser(user);
        setDialogConfirmOpen(true);
    }

    const handlesnackBarClose = (e, reason) => {
        if (reason === 'clickaway') return;
        setSnackBarOpen(false);
    }

    const registerAllUsers = async () => {
        const token = localStorage.getItem('token');
        const result = await AuthService.bulkCrateUsers(token, users);
        return result;
    }

    const handleRegisterAllUsers = async () => {
        if (users.length === 0){
            setSnackBarType('error');
            setSnackBarMessage('No hay usuarios para registrar');
            setSnackBarOpen(true);
            return;
        }
        
        const result = await registerAllUsers();

        if (result === true) {
            setSnackBarType('success');
            setSnackBarMessage('Usuarios registrados con éxito!');
            setSnackBarOpen(true);
            setUsers([]);
            setBackendDetails([]);
        } else {
            setSnackBarType('error');
            setSnackBarMessage('No se pudieron registrar los usuarios');
            setSnackBarOpen(true);
            setBackendDetails(result);
        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user || user.expiration < Date.now()){
            router.push('/login');
            return;
        }
        setLoading(null);
    }, []);

    return (
        loading ?? <Container style={{ "display": "flex", "flexDirection": "column", "gap": "2rem" }}>
            <Navbar section="2"></Navbar>
            <h1>Crear usuarios</h1>
            <Card>
                <Table>
                    <TableHead>
                        <TableRow className='table-head'>
                            <TableCell style={{ width: '23%' }}>Nombre</TableCell>
                            <TableCell style={{ width: '23%' }}>Email</TableCell>
                            <TableCell style={{ width: '20%' }}>Contraseña</TableCell>
                            <TableCell style={{ width: '20%' }}>Teléfono</TableCell>
                            <TableCell style={{ width: '14%' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map(user => {
                                return <TableRow key={user.name + user.cellphone}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.password}</TableCell>
                                    <TableCell>{user.cellphone}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="delete" onClick={() => handleDeleteUser(user)}>
                                            <Delete />
                                        </IconButton>
                                        <IconButton aria-label="edit" onClick={() => handleEditUserModal(user)}>
                                            <Edit />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>;
                            })
                        }
                    </TableBody>
                </Table>
                <div className='add-user-btn' onClick={handleModalAddUser}><Add /></div>
            </Card>
            <Button
                variant="contained"
                size="large"
                style={{ maxWidth: "fit-content", alignSelf: "center" }}
                endIcon={<HowToReg />}
                onClick={handleRegisterAllUsers}>
                Registrar todos los usuarios
            </Button>
            {(backendDetails.length > 0) && <Alert severity="error">
                {backendDetails.map(m => {
                    return <>
                    <h4>Detalles usuario {m.user_name}</h4>
                    <p>{m.password}</p>
                    <p>{m.email} (email)</p>
                    </>
                    })}
            </Alert>}
            
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-add-user"                >
                <Card sx={style}>
                <Typography id="modal-add-user" variant="h5" component="h2" sx={{pt:3, pl:4, pr: 4, pb: 2}}>
                    NUEVO USUARIO
                </Typography>
                <div className='form-add-user'>
                    <div className="input-form">
                        <TextField
                            id="outlined-basic"
                            label="Nombre"
                            variant="outlined"
                            required
                            placeholder="Nombre de usuario"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="input-form">
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            required
                            placeholder="email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-form">
                        <TextField
                            id="outlined-basic"
                            label="Contraseña"
                            variant="outlined"
                            required
                            type="password"
                            placeholder="******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-form">
                        <TextField
                            id="outlined-basic"
                            label="Confirmar Contraseña"
                            variant="outlined"
                            type="password"
                            required
                            placeholder="******"
                            value={passwordSecond}
                            onChange={(e) => setPasswordSecond(e.target.value)}
                        />
                    </div>
                    <div className="input-form">
                        <TextField
                            id="outlined-basic"
                            label="Teléfono"
                            variant="outlined"
                            required
                            placeholder="+56123456789"
                            value={cellphone}
                            onChange={(e) => setCellphone(e.target.value)}
                        />
                    </div>
                    <div className="input-form">
                        <Button variant="contained" onClick={handleAddEditUser}>{modalTypeEdit ? 'Guardar': 'Agregar'}</Button>
                    </div>
                    {(formErrorLog.length > 0) && <Alert severity="error">
                        {formErrorLog.map(m => <p>{m}</p>)}
                        </Alert>}
                </div>
                </Card>
            </Modal>
            
            <Dialog
                open={dialogConfirmOpen}
                onClose={handleDialogConfirmClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Eliminar el usuario " + deletedUser.name}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    Está eliminando el usuario {deletedUser.name}, desea continuar?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogConfirmClose(true)} variant="contained" color="error">
                        Eliminar
                    </Button>
                    <Button onClick={() => handleDialogConfirmClose(false)} variant="contained" autoFocus>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackBarOpen} autoHideDuration={4000} onClose={handlesnackBarClose}>
                <Alert
                    onClose={handlesnackBarClose}
                    severity={snackBarType}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}