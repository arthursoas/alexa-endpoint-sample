import ResponseFormatter from '../../../services/formatters/response';

import { type as opType, playBehavior } from '../../../services/misc/consts/outputSpeech';
import { type as cType } from '../../../services/misc/consts/card';

export const handleIntentRequest = (body, res) => {
  let response;
  response = UnknownIntentResponse(body);

  res.send(response);
}

const UnknownIntentResponse = (body) => {
  const outputSpeechText = 'Você está falando sobre a intenção ' + body.request.intent.name + '. Eu ainda não sei falar sobre isso. Em que posso ajudar?';

  const outputSpeech = {
    type: opType.plainText,
    text: outputSpeechText,
    playBehavior: playBehavior.enqueue
  };

  const responseFormatter = new ResponseFormatter(outputSpeech, undefined, undefined, undefined, false);
  return responseFormatter.formatResponse();
}

const NoIntentResponse = (body) => {
  const outputSpeechText = 'Oi, você ainda está aí? Em que posso ajudar?';

  const outputSpeech = {
    type: opType.plainText,
    text: outputSpeechText,
    playBehavior: playBehavior.enqueue
  };

  const responseFormatter = new ResponseFormatter(outputSpeech, undefined, undefined, undefined, false);
  return responseFormatter.formatResponse();
}

const AddressIntentResponse = (body) => {
  const { request } = body;
  if (request.dialogState == 'COMPLETED') {
    return finishAddressIntent(request);
  }

  if (request.dialogState == 'STARTED' || request.dialogState == 'IN_PROGRESS') {
    if (request.intent.slots.State.value === undefined) {
      return elicitSlot('State');   
    }
  }

  // if all necessary fields are filled, complete the intent
  return completeAddressIntent(request);
}

const SoapOperaSummaryIntentResponse = (body) => {
  const { request } = body;
  if (request.dialogState == 'COMPLETED') {
    return udateIntentToAddressIntent(request);
  }

  if (request.dialogState == 'STARTED' || request.dialogState == 'IN_PROGRESS') {
    if (request.intent.slots.CollectionType.value === undefined) {
      return elicitSlot('CollectionType');   
    }

    if (request.intent.slots.ClothesType.value === undefined) {
      return elicitSlot('ClothesType');
    }

    // if all necessary fields are filled, complete the intent
    return completeSeeCollectionIntent(request);
  }
}


// Private
const generateAnswer = (request) => {
  let answers = [];
  switch (request.intent.name) {
    case 'SeeCollectionIntent':
      answers = [
        'Vi que você está procurando por ' + request.intent.slots.ClothesType.value +
        ' da coleção ' + request.intent.slots.CollectionType.value + '.' +
        ' Visite nossa loja mais próxima para saber mais. Use o Cupom ALEXA10 e ganhe 10%' +
        ' de desconto na sua compra! Vamos ver qual a loja mais próxima. Em qual estado você mora?' 
      ];
      break;
    case 'AddressIntent':
      answers = [
        'Nosso endereço em ' + request.intent.slots.State.value +
        ' é Avenida das Laranjeiras, 1450, bairro Centro.'
      ]
  }

  return answers[Math.floor(Math.random()*answers.length)];
}

const generateSlotElicitationAnswer = (slot) => {
  let answers = [];
  switch (slot) {
    case 'CollectionType':
      answers = [
        'Sobre qual coleção você deseja saber?',
        'Qual coleção você está procurando?'
      ];
      break;
    case 'ClothesType':
      answers = [
        'Sobre qual peça de roupa você deseja saber?',
        'Qual peça de roupa você tem interesse?'
      ];
      break;
    case 'State':
      answers = [
        'Qual o estado você está?',
        'Em qual estado você mora?'
      ]
      break;
    default:
      answers = [
        'Não entendi.'
      ];
      break;
  }
  return answers[Math.floor(Math.random()*answers.length)];
}

const elicitSlot = (slot, last = false) => {
  const outputSpeechText = generateSlotElicitationAnswer(slot);

  const outputSpeech = {
    type: opType.plainText,
    text: outputSpeechText,
    playBehavior: playBehavior.enqueue
  };

  const directives = [
    {
      type: 'Dialog.ElicitSlot',
      slotToElicit: slot,
    }
  ]

  const responseFormatter = new ResponseFormatter(outputSpeech, undefined, undefined, directives, false);
  return responseFormatter.formatResponse();
}

const completeSeeCollectionIntent = (request) => {
  const outputSpeechText = '';

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

  const directives = [
    {
      type: 'Dialog.Delegate',
      updatedIntent: {
        name: 'SeeCollectionIntent',
        confirmationStatus: 'NONE',
        slots: {
          RequiredSlot: {
            name: 'RequiredSlot',
            value: 'filled',
            resolutions: {},
            confirmationStatus: 'NONE'
          },
          ClothesType: {
            name: 'ClothesType',
            value: request.intent.slots.ClothesType.value,
            resolutions: {},
            confirmationStatus: 'NONE'
          },
          CollectionType: {
            name: 'CollectionType',
            value: request.intent.slots.CollectionType.value,
            resolutions: {},
            confirmationStatus: 'NONE'
          }
        }
      }
    }
  ]

  const responseFormatter = new ResponseFormatter(outputSpeech, card, undefined, directives, false);
  return responseFormatter.formatResponse();
}

const udateIntentToAddressIntent = (request) => {
  const outputSpeechText = generateAnswer(request);

  const outputSpeech = {
    type: opType.plainText,
    text: outputSpeechText,
    playBehavior: playBehavior.enqueue
  };

  const directives = [
    {
      type: 'Dialog.ElicitSlot',
      slotToElicit: "State",
      updatedIntent: {
        name: 'AddressIntent',
        confirmationStatus: 'NONE',
        slots: {
          RequiredSlot: {
            name: 'RequiredSlot',
            resolutions: {},
            confirmationStatus: 'NONE'
          },
          State: {
            name: 'State',
            resolutions: {},
            confirmationStatus: 'NONE'
          }
        }
      }
    }
  ]

  const responseFormatter = new ResponseFormatter(outputSpeech, undefined, undefined, directives, false);
  return responseFormatter.formatResponse();
}

const completeAddressIntent = (request) => {
  const outputSpeechText = '';

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

  const directives = [
    {
      type: 'Dialog.Delegate',
      updatedIntent: {
        name: 'AddressIntent',
        confirmationStatus: 'NONE',
        slots: {
          RequiredSlot: {
            name: 'RequiredSlot',
            value: 'filled',
            resolutions: {},
            confirmationStatus: 'NONE'
          },
          State: {
            name: 'State',
            value: request.intent.slots.State.value,
            resolutions: {},
            confirmationStatus: 'NONE'
          }
        }
      }
    }
  ]

  const responseFormatter = new ResponseFormatter(outputSpeech, card, undefined, directives, false);
  return responseFormatter.formatResponse();
}

const finishAddressIntent = (request) => {
  const outputSpeechText = generateAnswer(request);

  const outputSpeech = {
    type: opType.plainText,
    text: outputSpeechText,
    playBehavior: playBehavior.enqueue
  };

  const card = {
    type: cType.standard,
    title: 'Venha nos conhecer!',
    text: outputSpeechText,
    image: {
      smallImageUrl: 'https://i2.wp.com/cantinhodena.com.br/wp-content/uploads/2015/11/compras-nos-estados-unidos-roupas-femininas-capa.jpg?resize=709%2C355&ssl=1',
      largeImageUrl: 'https://s2.glbimg.com/wu_oq4FjGgamZZ61MpCBPyI8Vn8=/940x523/e.glbimg.com/og/ed/f/original/2018/07/03/assorted-blurred-background-boutique-994523.jpg'
    }
  };

  const responseFormatter = new ResponseFormatter(outputSpeech, card, undefined, undefined, false);
  return responseFormatter.formatResponse();
}
