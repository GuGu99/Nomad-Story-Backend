import Router from 'koa-router';
import LoginController from '../controllers/login';
const router = new Router();

router.get('/sign-up', (ctx) => {
  ctx.body = {
    data: 'sending some json'
  };
});

router.post('/sign-up', LoginController.register);
router.post('/sign-in', LoginController.login);

export default router;
