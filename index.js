const express = require('express');
const Requests = require('./controllers/index')

const requests = new Requests();
const app = express();
app.use(express.json());

app.post('/', (req, res) => {
  requests.handleMessage(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on "+ process.env.PORT +" port");
});
