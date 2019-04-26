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
let io = socketIO(server);

// client contiene toda la informacion de la computadora o conexion que se establecio
io.on('connection', (client) => {
  console.log('Usuario conectado');

  // Emitir desde el servidor, escuchar en el cliente
  client.emit('enviarMensaje', {
    user: 'Administrador',
    message: 'Bienvenido a esta aplicacion'
  })


  client.on('disconnect', () => {
    console.log('Usuario desconectado');
  })


  // Para recibir la informacion en el servidor
  // Hay que implementar para poder escuchar el mensaje
  // -- Escuchar al cliente
  //        (nombre del evento, recibir evento)
  client.on('enviarMensaje', (message) => {
    console.log(message);
  })

})




// app.listen(port, (error) => {
server.listen(port, (error) => {  //para usar con sockets
  if(error) throw new Error(error);

  console.log(`Servidor corriendo en el puerto ${port}`);
})
