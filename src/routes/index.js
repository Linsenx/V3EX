const router = require('koa-router')();

const user = require('../controllers/user.js');
// 用户注册
router.post('/user', user.register)
// 用户登录
router.post('/session', user.login)
// 用户登出
router.delete('/session', user.logout)

const post = require('../controllers/post.js');
// 创建帖子
router.post('/post',post.create)



module.exports = router;