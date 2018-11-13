const router = require('koa-router')();

router.get('/index/:id', (ctx, next) => {
  ctx.body = `<b>hello world: ${ctx.params.id}</b>`;
})

module.exports = router;