import { proccessSempreFitModasRequest } from '../sempreFitModas';
import { proccessGloboRequest } from '../globo';

export const handleMessage = (req, res) => {
  const { id } = req.params;
  console.log(req.headers);

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