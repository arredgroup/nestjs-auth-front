"use client"
import React from "react";
import {Card, CardContent, Container} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AuthService from "@/services/AuthService";

import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {TableContainer, paper} from "@mui/material";




export default function bulkCreate() {
    // Register from user -> name, email, password, cellphone

    const [Data,setData]= React.useState([]);

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password_second, setPasswordSecond] = React.useState("");
    const [cellphone, setCellphone] = React.useState("");

    const handlebulkRegister = async () => {

        const response = await AuthService.registerUser(Data);
        
            alert("error al registrar");

    }

    const handleOtroUsuario = async () => {

        const response = await AuthService.handleBulkCreate(name, email, password, password_second, cellphone);
    }
    

    return (
        <Container>
            <TableContainer component = {paper}>
            <table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Password</TableCell>
                        <TableCell>confierme password</TableCell>
                        <TableCell>teléfono</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <div className="input-form">
                                <TextField
                                id="nombre"
                                label="Nombre"
                                variant="outlined"
                                required
                                placeholder="Oleh Oleig"
                                onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </TableCell>    
                        <TableCell>
                            <div className="input-form">
                                <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                required
                                placeholder="alfa@beta.cl"
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="input-form">
                                <TextField
                                    id="password"
                                    label="Contraseña"
                                    variant="outlined"
                                    required
                                    type="password"
                                    placeholder="****"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="input-form">
                                <TextField
                                    id="password_second"
                                    label="Confirmar Contraseña"
                                    variant="outlined"
                                    type="password"
                                    required
                                    placeholder="****"
                                    onChange={(e) => setPasswordSecond(e.target.value)}
                                />
                            </div>
                        </TableCell>
                        <TableCell>
                        <div className="input-form">
                            <TextField
                                id="cellphone"
                                label="Teléfono"
                                variant="outlined"
                                required
                                placeholder="+56987654321"
                                onChange={(e) => setCellphone(e.target.value)}
                            />
                        </div>
                        </TableCell>                   
                    </TableRow>
                </TableBody>
            </table>
            </TableContainer>
            <div className="input-form">
                    <Button variant="contained" onClick={handleOtroUsuario}>Agregar mas usuarios</Button>
                </div>
            <div className="input-form">
                    <Button variant="contained" onClick={handlebulkRegister}>Registrar</Button>
                </div>
        </Container>
        
    )
}
