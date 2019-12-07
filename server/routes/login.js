import Router from 'koa-router';
import LoginController from '../controllers/login'
const router = new Router();

router.post('/sign-up', LoginController.register);
router.post('/sign-in', LoginController.login);

export default router;
