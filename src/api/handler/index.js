import { Router } from 'express'
import { middleware as body } from 'bodymen'
import {
  handleMessage
} from './controller'

const router = new Router()

router.get('/',(req, res) => {
  res.send('Handler Requests Are On!');
});

router.post('/handle',
  handleMessage
)

export default router
