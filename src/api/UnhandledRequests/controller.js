import ResponseFormatter from '../../services/formatters/response';

import { type as opType, playBehavior } from '../../services/misc/consts/outputSpeech';
import { type as cType } from '../../services/misc/consts/card';

export const handleUnhandledRequest = (body, res) => {
  const outputSpeechText = 'Desculpe, não entendi o que você deseja.';

  const outputSpeech = {
    type: opType.plainText,
    text: outputSpeechText,
    playBehavior: playBehavior.enqueue
  };

  const card = {
    type: cType.standard,
    title: 'Desculpe :(',
    text: outputSpeechText,
    image: {
      smallImageUrl: 'https://ph-cdn3.ecosweb.com.br/Web/posthaus/foto/moda-feminina/vestido-curto//vestido-listrado-mangas-7-8-com-faixa-avulsa_312303_301_1.jpg',
      largeImageUrl: 'https://ibahia-cdn1.cworks.cloud/fileadmin/user_upload/ibahia/2019/marco/13/dica-moda.jpg'
    }
  };

  const responseFormatter = new ResponseFormatter(outputSpeech, card);
  res.send(responseFormatter.formatResponse());
}