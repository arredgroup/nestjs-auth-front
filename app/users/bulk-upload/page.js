"use client"
import React from 'react';
import { Container } from '@mui/material';
import BulkUserUpload from '../../components/BulkUserUpload';
import Navbar from '../../components/Navbar';

export default function BulkUploadPage() {
    return (
        <Container>
            <Navbar />
            <h1>Carga Masiva de Usuarios</h1>
            <BulkUserUpload />
        </Container>
    );
}
