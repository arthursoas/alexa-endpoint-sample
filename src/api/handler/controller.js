import { proccessSempreFitModasRequest } from '../sempreFitModas';

export const handleMessage = (req, res) => {
  const { id } = req.params;

  switch (id) {
    case 'semprefitmodas':
      proccessSempreFitModasRequest(req, res);
      break
    default:
      res.status(400).send();
  }
}