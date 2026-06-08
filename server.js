const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('NoiseShield Signaling Server פעיל ✅');
});

const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

const peerServer = ExpressPeerServer(server, {
  debug: true,
  allow_discovery: true,
  generateClientId: () => {
    return Math.random().toString(36).substring(2, 10);
  }
});

app.use('/peerjs', peerServer);

peerServer.on('connection', (client) => {
  console.log('Connected ID:', client.getId(), 'Time:', new Date().toISOString());
});

peerServer.on('disconnect', (client) => {
  console.log('Disconnected ID:', client.getId());
});
