import Router from 'koa-router';
import LoginController from '../controllers/login'
const sign = new Router();

sign.post('/register', LoginController.register);
sign.post('/login', LoginController.login);

export default login;