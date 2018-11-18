const mongoose = require('mongoose');
const validator = require('validator');
const PostModle = require('../modules/post/post.js');
const UserModle = require('../modules/user/user.js');


class PostController {
  // 创建帖子
  async create(ctx) {
    const { node, title, content } = ctx.request.body;
    if (validator.isEmpty(ctx.session.username + '')) {
      return ctx.error({ msg: '您尚未登录，无法进行发帖操作' });
    }

    if (validator.isEmpty(title) || validator.isEmpty(content)){
      return ctx.error({ msg: '标题和内容不能为空'});
    }

    const user = await UserModle.findOne({ username: ctx.session.username });
    const result = await PostModle.create({ 
      author: user._id,
      title: title,
      node : node,
      content : content,
      createAt: new Date()
    });
    ctx.success({ msg: '发布成功!' })
  }

  // 发表评论
  async create_comment(ctx) {

  }

  // 删除帖子
  async delete(ctx) {

  }
}

module.exports = new PostController();