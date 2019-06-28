const ResponseFormatter = require('../services/response_formatter');

const { type: opType, playBehavior } = require('../consts/output_speech');
const { type: cType } = require('../consts/card');

class LaunchRequest {
  constructor(request) {
    this.request = request;
  }

  newLaunchResponse() {
    const outputSpeechText = this.generateAnswer();

    const outputSpeech = {
      type: opType.plainText,
      text: outputSpeechText,
      playBehavior: playBehavior.enqueue
    };

    const card = {
      type: cType.standard,
      title: 'Seja Bem Vindo(a)!',
      text: outputSpeechText,
      image: {
        smallImageUrl: 'https://ph-cdn3.ecosweb.com.br/Web/posthaus/foto/moda-feminina/vestido-curto//vestido-listrado-mangas-7-8-com-faixa-avulsa_312303_301_1.jpg',
        largeImageUrl: 'https://ibahia-cdn1.cworks.cloud/fileadmin/user_upload/ibahia/2019/marco/13/dica-moda.jpg'
      }
    };

    const responseFormatter = new ResponseFormatter(outputSpeech, card);
    return responseFormatter.formatResponse();
  }

  oldLaunchResponse() {
    const outputSpeechText = this.generateAnswer();

    const outputSpeech = {
      type: opType.plainText,
      text: outputSpeechText,
      playBehavior: playBehavior.enqueue
    };

    const card = {
      type: cType.standard,
      title: 'Ops, não entendi. :(',
      text: outputSpeechText,
      image: {
        smallImageUrl: 'https://ph-cdn3.ecosweb.com.br/Web/posthaus/foto/moda-feminina/vestido-curto//vestido-listrado-mangas-7-8-com-faixa-avulsa_312303_301_1.jpg',
        largeImageUrl: 'https://ibahia-cdn1.cworks.cloud/fileadmin/user_upload/ibahia/2019/marco/13/dica-moda.jpg'
      }
    };

    const responseFormatter = new ResponseFormatter(outputSpeech, card);
    return responseFormatter.formatResponse();
  }

  isNew() {
    return this.request.session.new;
  }

  // Private
  generateAnswer() {
    const newAnswers = [
      'Olá, seja bem vindo à Sempre Fit Modas! Como posso ajudar?',
      'Como é bom ter você na Sempre Fit Modas! Como posso ajudar?',
      'É um prazer recebê-lo na Sempre Fit Modas! Em que posso ajudar?'
    ];

    const oldAnswers = [
      'Desculpe, não entendi. Fale de outra forma o que você deseja.',
      'Hmmm não estou conseguindo entender. Diga o que desja em outras palavras.',
      'Desculpe, mas não sei sobre o que você falou. Pode dizer de outra maneira?'
    ]

    if (this.isNew()) {
      return newAnswers[Math.floor(Math.random()*newAnswers.length)]
    } else {
      return oldAnswers[Math.floor(Math.random()*oldAnswers.length)]
    }
  }
}

module.exports = LaunchRequest;