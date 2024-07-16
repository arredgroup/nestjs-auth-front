import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SimpleSnackbar = ({ message, openSnack, closeSnack }) => {
  return (
    <Snackbar open={openSnack} autoHideDuration={6000} onClose={closeSnack}>
      <Alert onClose={closeSnack} severity="error">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SimpleSnackbar;