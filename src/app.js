const Koa = require('koa');
const app = new Koa();
const session = require('koa-session');
const bodyParser = require('koa-bodyparser')();
const db = require('./modules/db.js');
const router = require('./routes');

// koa-session
app.keys = ['helloworld_v3ex'];
app.use(session({
  key: 'koa:sess',
  maxAge: 86400000
}, app));

app.use(bodyParser);
app.use(require('./middlewares/filter.js'));
app.use(require('./middlewares/response.js'));
app.use(router.routes());
app.listen(3000);
