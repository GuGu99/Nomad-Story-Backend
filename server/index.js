import Koa from 'koa';
import Router from 'koa-router';

import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import dotenv from 'dotenv';

import login from './routes/login';

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

dotenv.config();

// mariadb connetion

app
.use(bodyParser())
.use(logger())
.use(helmet());

router.use();

app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`) );

export default app;
