const WebSocket = require('ws');

module.exports = function(server) {
  const socketServer = new WebSocket.Server({ server });

  socketServer.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('message', (message) => {
      console.log(`Mensagem recebida: ${message}`);

      // Enviar mensagem para todos os clientes conectados
      socketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    socket.on('close', () => {
      console.log('Cliente desconectado');
    });
  });
};
