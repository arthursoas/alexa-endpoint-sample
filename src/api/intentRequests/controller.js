import ResponseFormatter from '../../services/formatters/response';

import { type as opType, playBehavior } from '../../services/misc/consts/outputSpeech';
import { type as cType } from '../../services/misc/consts/card';

export const handleIntentRequest = (body, res) => {
  let response;
  switch (body.request.intent.name) {
    case 'SeeCollectionIntent':
      response = newSeeCollectionIntentResponse();
      break;
    default:
      res.send(400);
  }

  res.send(response);
}

const newSeeCollectionIntentResponse = () => {
  const outputSpeechText = generateAnswer();

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

  const responseFormatter = new ResponseFormatter(outputSpeech, card, undefined, undefined, true);
  return responseFormatter.formatResponse();
}

// Private
const generateAnswer = () => {
  const answers = [
    'A coleção que você está procurando é um tremendo sucesso, venha à nossa loja para conhecer.',
    'Essa coleção é o que há no momento, não perca a oportunidade e venha conhecer nossa loja.'
  ];

  return answers[Math.floor(Math.random()*answers.length)];
}