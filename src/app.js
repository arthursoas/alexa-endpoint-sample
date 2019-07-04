import http from 'http';
import { port, ip } from './config';
import express from './services/express';
import api from './api';

const app = express(api);
const server = http.createServer(app);

setImmediate(() => {
  server.timeout = 180000;
  server.listen(port, () => {
    console.log('Express server listening on port %d', port);
  })
})

export default app
