// Se usa var para aumentar la compatibilidad entre navegadores web
var socket = io(); //io es una funcion que aparece gracias a la libreria que se importo mas arriba
// ES el mismo objeto que se tiene en el backend como 'io'
// Es el que se va a utilizar para la comunicacion en ambos lugares
// Funcionan casi igual
// UNa vez declarado el socket, se pueden declarar las funciones

// Va a indicar cuando se esta conectado con el servidor, es decir, cuando se tiene una conexion
// o un canal de comunicacion abierto entre el servidor y el cliente
socket.on('connect', function(){
  console.log('Conectado al servidor');  //ESto indica que el codigo del frontend va a estar pendiente de cualquier
  // cosa que suceda con el backend

});


socket.on('disconnect', function() {
  console.log('Perdida la conexion con el servidor');
});


// Emitir desde el cliente
// los 'emit' son para enviar informacion. Es solo enviarselo al servidor, solo le habla al servidor
// de manera privada
// los 'on' son para escuchar informacion o sucesos
// (nombre del evento, lo que se va a enviar, una funcion que se ejecute cuando todo salga bien)
socket.emit(
  'enviarMensaje',
  {  //Enviar informacion
    user: 'Cesar',
    message: 'Hello World'
  },
  // Para confirmar si todo salio bien
  // function(){
  //   console.log('Se disparo el callback');
  // }
  function(response){
    console.log('Server response: ', response);
  }
);

// se puede mandar cualquier cosa, pero normalmente no se acostumbra a mandar cadenas planas o valores
// booleanos. Lo mas comun es enviar un objeto. De esa manera se puede poner gran cantidad de informacio
// para enviar al servidor en un unico envio



// Escuchar informacion
socket.on('enviarMensaje', function(message) {
  console.log('Servidor: ', message);
})
