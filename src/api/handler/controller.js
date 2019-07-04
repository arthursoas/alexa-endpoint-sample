import { handleIntentRequest } from '../intentRequests/controller';
import { handleLaunchRequest } from '../launchRequests/controller';
import { handleSessionEndedRequest } from '../SessionEndedRequest/controller';

export const handleMessage = (req, res) => {
  const { body } = req;
  switch (body.request.type) {
    case 'LaunchRequest':
      handleLaunchRequest(body, res);
      break;
    case 'IntentRequest':
      handleIntentRequest(body, res);
      break;
    case 'SessionEndedRequest':
      handleSessionEndedRequest(body, res);
      break;
    default:
      res.status(400).send();
  }
}