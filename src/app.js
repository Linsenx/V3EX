const Koa = require('koa');
const app = new Koa();

// database
require('./modules/db.js');

// session
const session = require('koa-session');
app.keys = ['helloworld_v3ex'];
app.use(session({}, app));

// passport
require('./auth.js');
const passport = require('koa-passport');
app.use(passport.initialize());
app.use(passport.session());

// body parser
const bodyParser = require('koa-bodyparser')();
app.use(bodyParser);

// router
const router = require('./routes');
app.use(require('./middlewares/filter.js'));
app.use(require('./middlewares/response.js'));
app.use(router.routes());

// http listener
app.listen(3000);
