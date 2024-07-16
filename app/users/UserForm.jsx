import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
    Button,
    TextField,
    Box,
    Typography,
    IconButton,
    Stack
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";
import { styled } from "@mui/material/styles";
const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: "2vh",
  width: "100%",
  "& .MuiInputBase-input": {
    height: "1rem",
  },
}));

const ItemTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    height: ".25em",
  },
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
}));


const UserForm = ({notShow}) => {
    const theme = useTheme();
    
    const initialRow = {
	name : "",
	email : "",
	password : "",
	password_second: "",
	cellphone: "",
    };

    const [userBulk, setUserBulk] = useState([initialRow]);

    const handleSubmit = async (e) => {
	e.preventDefault();
	const token = localStorage.getItem('token');
	if(validateData(userBulk)){
	    const data = await UserService.bulkUsers(userBulk);
	    if(!data) {
		alert('Error en la petición, vuelva a iniciar sesión');
		return;
	    }
	    alert(`Usuarios Creados :${data.success} , Usuarios no creados : ${data.error} `)
	    console.log(data.error)

	    
	} else {
	    alert('Hay campos vacios');

	}
	
    }

    const validateData = (users) => {
	for (let i = 0; i < users.length; i++) {
	     for(var key in users[i]){
	     	if(!(users[i][key])){	     	    
	     	    return false;
	     	};
	    };
	}
	return true;
    }


    const addUser = () => {
	setUserBulk([...userBulk, { ...initialRow }])
    }

    const removeUser = (index) => {
	if(userBulk.length > 1){
	    setUserBulk((prevItems) => prevItems.filter((_, i) => i !== index));
	}

    }
    const handleEdit = (user) => {
        router.push('/users/' + user.id + '/edit');
    }

    const handleChangeUser = (index,e) => {
	const { name, value} = e.target;
	setUserBulk((prevItems) =>
	    prevItems.map((row, i) =>
		i === index
		    ? {
			...row,
			[name]: value,
		    }
		: row
	    )
	);
    }


    return (
	<>
      <Box
        sx={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          bgcolor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          zIndex: 1,
          position: "absolute",
          width: "80vw",
          minWidth: "440px",
          maxHeight: "90vh",
          top: "50%",
          left: "50%",
          display: "flex",
          transform: "translate(-50%, -50%)",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          overflow: "hidden",
          bgcolor: "#ffffff",
          border: "1.5px solid #266763",
          borderRadius: "1rem",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >

	  <form onSubmit={handleSubmit} style={{width : "100%"}}>
              <Box
		  sx={{
		      width: "100%",
		      display: "flex",
		      flexDirection: "column",
		      alignItems: "center",
		  }}
              >

          <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                padding: "10px 0 10px 0",
                borderTop: "1px solid black",
                borderBottom: "1px solid black",
                marginBottom: "15px",
              }}
            >		  
            </Box>
            <Box
              sx={{
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                width: "90%",
                minHeight: "220px",
                maxHeight: "220px",
              }}
            >
            {userBulk.map((row, index) => (
                <StyledStack key={index} paddingBottom=".5%">
                  <ItemTextField
                    name="name"
                    value={row.name}
		    label="Nombre"
                    onChange={(e) => handleChangeUser(index, e)}
                    sx={{ alignItems: "center", flex: 1 }}
                    InputProps={{
                      sx: {
                        width: "100%",
                      },
                    }}
                    inputProps={{ maxLength: 50 }}
		  />
                 <ItemTextField
                    name="email"
		    label="Correo"
                    value={row.email}
                    onChange={(e) => handleChangeUser(index, e)}
                    sx={{ alignItems: "center", flex: 1 }}
                    InputProps={{
                      sx: {
                        width: "100%",
                      },
                    }}
                    inputProps={{ maxLength: 50 }}
                 />
                 <ItemTextField
                    name="password"
		    label="Contraseña"
                    value={row.pass}
                    onChange={(e) => handleChangeUser(index, e)}
                    sx={{ alignItems: "center", flex: 1 }}
                    InputProps={{
                      sx: {
                        width: "100%",
                      },
                    }}
                    inputProps={{ maxLength: 50 }}
                 />
                 <ItemTextField
                    name="password_second"
		    label="Confirmar"
                    value={row.passConfirm}
                    onChange={(e) => handleChangeUser(index, e)}
                    sx={{ alignItems: "center", flex: 1 }}
                    InputProps={{
                      sx: {
                        width: "100%",
                      },
                    }}
                    inputProps={{ maxLength: 50 }}
                 />
                 <ItemTextField
		      name="cellphone"
		      label="Contacto"
                      value={row.contact}
                      onChange={(e) => handleChangeUser(index, e)}
                      sx={{ alignItems: "left" }}
                      InputProps={{
                      sx: {
                   
                        width: "100%",
                        },
                      }}
                      inputProps={{ maxLength: 50 }}
                 />
		 <Box sx={{ flex: 0.3, marginLeft: 1 }}>
                    <IconButton
                      onClick={() => removeUser(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </StyledStack>
              ))}
            </Box>  
             <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "90%",
                borderTop: "2px solid lightgrey",
              }}
            >
              <Box
                display="flex"
                width="100%"
                flexDirection="row"
                paddingTop="2%"
              >
                <Button
                  variant="contained"
                  onClick={addUser}
                >
                  Añadir registro
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "flex-end",
                    width: "20%",
                  }}
                ></Box>
              </Box>
            </Box> 
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                gap: 2,
                padding: "3%",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                endIcon={<CloseIcon />}
                onClick={notShow}
              >
                Cerrar
              </Button>
         
	     <Button variant="contained" onClick={handleSubmit}>Enviar</Button>
	    </Box>
	      </Box>
	  </form>
      </Box>
	  </>
)};

export default UserForm;
