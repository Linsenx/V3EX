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
// 获取帖子
router.get('/post', post.index);

const reply = require('../controllers/reply.js');
// 获取回复
router.get('/reply', reply.get);
// 创建回复
router.post('/reply', reply.create);

const node = require('../controllers/node.js');
// 获取节点
router.get('/node', node.get);
// 创建节点
router.post('/node', node.createNode);


module.exports = router;