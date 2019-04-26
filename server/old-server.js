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
    // user: 'Administrador',
    message: 'Bienvenido a esta aplicacion'
  })


  client.on('disconnect', () => {
    console.log('Usuario desconectado');
  })


  // Para recibir la informacion en el servidor
  // Hay que implementar para poder escuchar el mensaje
  // -- Escuchar al cliente
  //        (nombre del evento, recibir evento, funcion a llamar cuando todo salio bien o se realiza la accion)
  client.on('enviarMensaje', (message, callback) => {
    console.log(message);

    //El callback se puede llamar x cantidad de veces
    if(message.user ) { //Si viene el usuario
      callback({
        response: 'Todo salio bien!'
      });
    }
    else {
      callback({
        response: 'Todo salio mal!!'
      })
    }
  })
})




// app.listen(port, (error) => {
server.listen(port, (error) => {  //para usar con sockets
  if(error) throw new Error(error);

  console.log(`Servidor corriendo en el puerto ${port}`);
})
