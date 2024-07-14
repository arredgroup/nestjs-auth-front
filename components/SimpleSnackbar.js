"use client"
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const SimpleSnackbar = (props) => {
    const { message, openSnack, closeSnack } = props;

    const handleClose = (event, reason) => {
        event.preventDefault();
        if (reason === 'clickaway') {
            return;
        }

        closeSnack();
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Snackbar
            open={openSnack}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
            //action={action}
        />
    );
}

export default SimpleSnackbar;
