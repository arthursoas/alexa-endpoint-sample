class Requests {
  constructor() { }

  handleMessage(req, res) {
    console.log(req.body);
  }
}

module.exports = Requests
