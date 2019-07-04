import ResponseFormatter from '../../services/formatters/response';

import { type as opType, playBehavior } from '../../services/misc/consts/outputSpeech';
import { type as cType } from '../../services/misc/consts/card';

export const handleLaunchRequest = (body, res) => {
  let response;
  if(isNew(body)) {
    response = newLaunchResponse();
  } else {
    response = oldLaunchResponse();
  }

  res.send(response);
}

const newLaunchResponse = () => {
  const outputSpeechText = generateAnswer(true);

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

const oldLaunchResponse = () => {
  const outputSpeechText = generateAnswer(false);

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

const isNew = (body) => {
  return body.session.new;
}

// Private
const generateAnswer = (isNew) => {
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

  if (isNew) {
    return newAnswers[Math.floor(Math.random()*newAnswers.length)]
  } else {
    return oldAnswers[Math.floor(Math.random()*oldAnswers.length)]
  }
}