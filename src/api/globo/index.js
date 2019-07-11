import { handleIntentRequest } from './intentRequests/controller';
import { handleLaunchRequest } from './launchRequests/controller';
import { handleSessionEndedRequest } from './SessionEndedRequest/controller';
import { handleUnhandledRequest } from './UnhandledRequests/controller';

export const proccessGloboRequest = (req, res) => {
  const { body } = req;

  const now = new Date();
  console.log('-----------------------------------------------');
  console.log(`semprefitmodas - ${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR')}`);

  switch (body.request.type) {
    case 'LaunchRequest':
      console.log('LaunchRequest');
      handleLaunchRequest(body, res);
      break;
    case 'IntentRequest':
      console.log('IntentRequest', body.request.intent.name, body.request.dialogState)
      handleIntentRequest(body, res);
      break;
    case 'SessionEndedRequest':
      console.log('SessionEndedRequest');
      handleSessionEndedRequest(body, res);
      break;
    case 'Unhandled':
      console.log('Unhandled');
      handleUnhandledRequest(body, res);
      break;
    default:
      res.status(400).send();
  }

  console.log('-----------------------------------------------');
}