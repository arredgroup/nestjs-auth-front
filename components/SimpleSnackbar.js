"use client"
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SimpleSnackbar = ({ message, openSnack, closeSnack }) => {
    const handleClose = (event, reason) => {
        if (event) {
            event.preventDefault();
        }
        if (reason === 'clickaway') {
            return;
        }
        closeSnack();
    };

    return (
        <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SimpleSnackbar;