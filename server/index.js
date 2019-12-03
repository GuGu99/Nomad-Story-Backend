import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import routing from './routes';

const app = new Koa();
require('dotenv').config();

// mariadb connetion

app
.use(bodyParser())
.use(logger())
.use(helmet());

routing(app);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`✅  The server is running at http://localhost:${port}/`)
);

export default app;
