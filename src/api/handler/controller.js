import { proccessSempreFitModasRequest } from '../sempreFitModas';
import { proccessGloboRequest } from '../globo';

export const handleMessage = (req, res) => {
  const { id } = req.params;
  console.log('---------------------headers------------------------');
  console.log(req.headers);
  console.log('----------------------------------------------------');
  console.log('-----------------------body-------------------------');
  console.log(req.body);
  console.log('----------------------------------------------------');

  switch (id) {
    case 'semprefitmodas':
      proccessSempreFitModasRequest(req, res);
      break;
    case 'globo':
      proccessGloboRequest(req, res);
      break;
    default:
      res.status(400).send();
  }
}