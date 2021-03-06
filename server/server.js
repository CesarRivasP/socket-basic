const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');

const app = express();
// Servidor con toda la configuracion que se le va a implementar al express
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// Hay que inicializar el socketIO
// IO hace referencia a inputs y outputs
// io va a mantener una conexion directa con el servidor, esta es la comunicacion del backend
// let io = socketIO(server); BEFORE
module.exports.io = socketIO(server);  // AFTER

require('./sockets/socket');

// app.listen(port, (error) => {
server.listen(port, (error) => {  //para usar con sockets
  if(error) throw new Error(error);

  console.log(`Servidor corriendo en el puerto ${port}`);
})
