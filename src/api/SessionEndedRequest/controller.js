
import ResponseFormatter from '../../services/formatters/response';

import { type as opType, playBehavior } from '../../services/misc/consts/outputSpeech';
import { type as cType } from '../../services/misc/consts/card';

export const handleSessionEndedRequest = (body, res) => {
  const outputSpeechText = 'Obrigado por visitar a sempre fit modas!';

  const outputSpeech = {
    type: opType.plainText,
    text: outputSpeechText,
    playBehavior: playBehavior.enqueue
  };

  const responseFormatter = new ResponseFormatter(outputSpeech, undefined, undefined, undefined, false);
  res.send(responseFormatter.formatResponse());
}