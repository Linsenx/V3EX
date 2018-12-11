const router = require('koa-router')();

const user = require('../controllers/user.js');
// 用户注册
router.post('/user', user.register);
// 用户登录
router.post('/session', user.login);
// 用户登出
router.delete('/session', user.logout);

const post = require('../controllers/post.js');
// 创建帖子
router.post('/post', post.create);
// 删除帖子
router.delete('/post', post.delete);
// 点赞帖子
router.put('/post_like', post.like);
// 踩帖子
router.put('/post_dislike', post.dislike);
// 更新帖子
router.put('/post', post.update);

const reply = require('../controllers/reply.js');
// 创建回复
router.post('/reply', reply.create);
//删除回复
router.delete('/reply', reply.delete);


module.exports = router;