import Router from 'koa-router';
import LoginController from '../controllers/login'
const router = new Router();

router.post('/register', LoginController.register);
router.post('/login', LoginController.login);

export default router;