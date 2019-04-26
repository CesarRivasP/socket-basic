const { io } = require('../server')

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
