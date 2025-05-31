// server.js
// node ./src/components/server/server.js
const express = require('express');
const path = require('path');
const AWS = require('aws-sdk');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// CONFIG AWS
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

const s3 = new AWS.S3();

// ✅ SUA ROTA DE API PRIMEIRO
app.post('/generate-presigned-url', (req, res) => {
  const { fileName, fileType } = req.body;

  if (!fileName || !fileType) {
    return res.status(400).json({ error: 'Parâmetros ausentes' });
  }

  const params = {
    Bucket: 'aumeow-images',
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
  };

  s3.getSignedUrl('putObject', params, (err, url) => {
    if (err) {
      console.error('Erro ao gerar URL:', err);
      return res.status(500).json({ error: 'Erro ao gerar URL' });
    }

    res.json({ url });
  });
});



// Criar o servidor HTTP que será compartilhado
const server = http.createServer(app);

// Criar WebSocket usando o mesmo servidor HTTP
const wss = new WebSocket.Server({ server });

wss.on('connection', (socket) => {
  console.log('Cliente WebSocket conectado');

  socket.on('message', (message) => {
    console.log(`Mensagem recebida: ${message}`);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on('close', () => {
    console.log('Cliente WebSocket desconectado');
  });
});

// Iniciar o servidor na porta 5000
server.listen(5000, () => {
  console.log('Servidor Express + WebSocket rodando na porta 5000');
});
