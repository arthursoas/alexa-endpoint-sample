import express from 'express';

export default (routes) => {
  const app = express();

  app.use(express.json());
  app.use(routes);

  app.get('/', (req, res) => {
    res.send('Wow, the API is working!');
  });

  app.get('/ping', (req, res) => {
    res.send('I\'m here');
  })

  return app;
}
