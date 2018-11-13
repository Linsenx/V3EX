const Koa = require('koa');
const app = new Koa();
const db = require('./modules/db.js');

const router = require('./routes');

app.use(router.routes());
app.listen(3000);
