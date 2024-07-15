Se puede hacer pruebas en modo incognito en el navegador para que no afecte el cache

Se hace las pruebas desde el puerto http://localhost:3000/
paara las consultas que se realizaran al backend 

Vistas:

http://localhost:3000/users

http://localhost:3000/users/find 

http://localhost:3000/users/bulk

Consultas en backend:

http://localhost:3001/api/v1/users/findUsers

http://localhost:3001/api/v1/users/bulkCreate

Se Realiza validaciones con bulkCreate para probar:
-Todos los campos (nombre, email, contraseña, confirmar contraseña, celular) son requeridos
-Las contraseñas no coinciden

