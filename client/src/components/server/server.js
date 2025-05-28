//rodar o comando node ./src/components/server/server.js
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('message', (message) => {
    console.log(`Mensagem recebida: ${message}`);

    // Enviar mensagem para todos os clientes conectados
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on('close', () => {
    console.log('Cliente desconectado');
  });
});
