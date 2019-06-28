const LaunchRequest = require('../models/lauch_request');
const IntentRequest = require('../models/intent_request');

class Requests {
  constructor() { }

  handleMessage(req, res) {
    const { body } = req;
    switch (body.request.type) {
      case 'LaunchRequest':
        this.handleLaunchRequest(body, res);
        break;
      case 'IntentRequest':
        this.handleIntentRequest(body, res);
        break;
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

  handleIntentRequest(body, res) {
    const intentRequest = new IntentRequest(body);

    let response;
    switch (body.request.intent.name) {
      case 'SeeCollectionIntent':
        response = intentRequest.newSeeCollectionIntentResponse();
        break;
      default:
        res.send(400);
    }

    res.send(response);
  }
}

module.exports = Requests
