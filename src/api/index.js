import { Router } from 'express';
import handler from './handler';

const router = new Router();

const handlers_url = '/handlers';

router.use(handlers_url, handler);

export default router;
