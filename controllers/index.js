const LaunchRequest = require('../models/lauch_request');
const ResponseFormatter = require('../services/response_formatter');

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
    const outputSpeechText = launchRequest.generateAnswer();

    const outputSpeech = {
      type: 'PlainText',
      text: outputSpeechText,
      playBehavior: 'ENQUEUE'
    };

    const card = {
      type: 'Standard',
      title: 'Sempre Fit Modas',
      text: outputSpeechText,
      image: {
        smallImageUrl: 'https://ph-cdn3.ecosweb.com.br/Web/posthaus/foto/moda-feminina/vestido-curto//vestido-listrado-mangas-7-8-com-faixa-avulsa_312303_301_1.jpg',
        largeImageUrl: 'https://ibahia-cdn1.cworks.cloud/fileadmin/user_upload/ibahia/2019/marco/13/dica-moda.jpg'
      }
    };

    const repromptOutputSpeech = {
      type: 'PlainText',
      text: 'Oi, você ainda está aí?',
      playBehavior: 'ENQUEUE'
    };

    const responseFormatter = new ResponseFormatter(
      body,
      outputSpeech,
      card,
      repromptOutputSpeech,
      false
    );
    const responseBody = responseFormatter.formatResponse();

    res.send(responseBody);
  }
}

module.exports = Requests
