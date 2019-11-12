import Router from 'koa-router';
import { Register, Test } from './auth.ctrl';
const auth = new Router();

auth.post('/register', Register);
auth.post('/test', Test);

export default auth;