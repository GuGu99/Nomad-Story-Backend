import Router from 'koa-router';
import * as authController from "./auth.ctrl";

const auth = new Router();

auth.post('/signup', authController.signup);
auth.post('/signin', authController.signin);

export default auth;