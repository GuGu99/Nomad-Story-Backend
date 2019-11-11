import Router from 'koa-router';
import { ping } from './auth.ctrl';

const auth = new Router();

auth.get('/ping', ping);
export default auth;