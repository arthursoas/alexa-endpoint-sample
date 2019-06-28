const ResponseFormatter = require('../services/response_formatter');

const { type: opType, playBehavior } = require('../consts/output_speech');
const { type: cType } = require('../consts/card');

class IntentRequest {
  constructor(request) {
    this.request = request;
  }

  newSeeCollectionIntentResponse() {
    const outputSpeechText = this.generateAnswer();

    const outputSpeech = {
      type: opType.plainText,
      text: outputSpeechText,
      playBehavior: playBehavior.enqueue
    };

    const card = {
      type: cType.standard,
      title: 'Arrasou',
      text: outputSpeechText,
      image: {
        smallImageUrl: 'https://i2.wp.com/cantinhodena.com.br/wp-content/uploads/2015/11/compras-nos-estados-unidos-roupas-femininas-capa.jpg?resize=709%2C355&ssl=1',
        largeImageUrl: 'https://s2.glbimg.com/wu_oq4FjGgamZZ61MpCBPyI8Vn8=/940x523/e.glbimg.com/og/ed/f/original/2018/07/03/assorted-blurred-background-boutique-994523.jpg'
      }
    };

    const responseFormatter = new ResponseFormatter(outputSpeech, card);
    return responseFormatter.formatResponse();
  }

  // Private
  generateAnswer() {
    const answers = [
      'A coleção que você está procurando é um tremendo sucesso, venha à nossa loja para conhecer.',
      'Essa coleção é o que há no momento, não perca a oportunidade e venha conhecer nossa loja.'
    ];

    return answers[Math.floor(Math.random()*answers.length)];
  }
}

module.exports = IntentRequest;