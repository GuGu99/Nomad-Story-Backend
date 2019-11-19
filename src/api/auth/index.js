import Router from 'koa-router';
import { Register, Login } from './auth.ctrl';
const auth = new Router();

auth.post('/register', Register);
auth.post('/login', Login);

export default auth;