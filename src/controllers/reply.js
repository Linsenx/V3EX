const validator = require('validator');
const ReplyModel = require('../models/post/reply.js');

class ReplyController {
  // 发表回复
  async create(ctx) {
    const { postId, content } = ctx.request.body;
    if (ctx.isUnauthenticated()) {
      return ctx.error({ msg: '您尚未登录，无法进行回复操作' });
    }

    if (validator.isEmpty(content)){
      return ctx.error({ msg: '内容不能为空'});
    }

    const post = await PostModel.findById(postId);
    if (!post) {
      return ctx.error({ msg: '参数错误，未找到该帖子' });
    }
    
    const user = ctx.state.user;
    ReplyModel.create({
      content: content,
      authorId: user.id,
      postId: post.id,
      createAt: new Date(),
      updateAt: new Date()
    })
    ctx.success({ msg: '回复发布成功' })
  }
}

module.exports = new ReplyController();