const router = require('koa-router')();

const user = require('../controllers/user.js');
// 用户注册
router.post('/user', user.register)
// 用户登录
router.post('/session', user.login)
// 用户登出
router.delete('/session', user.logout)

module.exports = router;