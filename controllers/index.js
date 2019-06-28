const LaunchRequest = require('../models/lauch_request');

class Requests {
  constructor() { }

  handleMessage(req, res) {
    const { body } = req;
    switch (body.request.type) {
      case 'LaunchRequest':
        this.handleLaunchRequest(body, res);
      default:
        res.status(400);
    }
  }

  handleLaunchRequest(body, res) {
    const launchRequest = new LaunchRequest(body);

    let response;
    if(launchRequest.isNew()) {
      response = launchRequest.newLaunchResponse();
    } else {
      response = launchRequest.oldLaunchResponse();
    }

    res.send(response);
  }
}

module.exports = Requests
