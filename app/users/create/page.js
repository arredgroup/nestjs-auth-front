"use client"
import { useUsuarios } from "@/app/hooks/useUsuarios";
import AuthService from "@/services/AuthService";
import DeleteIcon from '@mui/icons-material/Delete';
import {Box, Button, Container, Grid, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter()
  const {usuarios, addUsuario, deleteUsuario, editUsuario, areValid, clean} = useUsuarios()
  const handleAdd = async () => {
    const token = localStorage.getItem('token');
    const res = await AuthService.addUsers(usuarios, token)
    if(res){
      clean()
      alert('Usuarios agregados correctamente')
    }
    else router.push('/login')
  }
  return (
    <Container>
     <Stack>
      <Box>
        <Grid container spacing={4} padding={10}>
          <Grid xs={2} padding={2}>
            <Link href="/users"><Button variant="contained" color="secondary">&lt; -Volver</Button></Link>
          </Grid>
          <Grid xs={3} padding={2}>
            <Button variant="contained" color="primary" onClick={addUsuario}>+ Añadir usuario</Button>
          </Grid>
        </Grid>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Quitar</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Celular</TableCell>
            <TableCell>Contraseña</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            usuarios.map((usuario, index) => (
              <TableRow key={index}>
                <TableCell >
                  <Button aria-label="delete" color="error" variant="outlined" onClick={()=>deleteUsuario(index) }>
                    Quitar
                  </Button>
                </TableCell>
                <TableCell>
                  <TextField placeholder="Definir nombre" value={usuario.name} onChange={(e) => editUsuario(index, {name: e.target.value})} />
                </TableCell>
                <TableCell>
                  <TextField placeholder="Definir email" value={usuario.email} onChange={(e) => editUsuario(index, {email: e.target.value})} />
                </TableCell>
                <TableCell>
                  <TextField placeholder="Definir celular" value={usuario.cellphone} onChange={(e) => editUsuario(index, {cellphone: e.target.value})} />
                </TableCell>
                <TableCell>
                  <TextField placeholder="Definir contraseña" value={usuario.password} onChange={(e) => editUsuario(index, {password: e.target.value})} />
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <Box>
        <Grid container spacing={4} padding ={10}>
          <Grid xs={2}>
            <Button variant="contained" disabled={!areValid || usuarios.length == 0} onClick={handleAdd}>Añadir</Button>
          </Grid>
          <Grid xs={5}>
            
            {usuarios.length == 0 ? <h2>No hay usuarios</h2>:(
              areValid ? <h2>'Todos los campos están llenos, puede agregar los usuarios a la base de datos'</h2> : <h2>'Faltan campos por llenar'</h2>
            )}
          </Grid>
        </Grid>
      </Box>
     </Stack>
    </Container>
  );
}