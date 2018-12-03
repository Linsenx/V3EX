const validator = require('validator');
const PostModel = require('../models/post/post.js')
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
  // 删除回复
  async delete(ctx) {
    const { replyId } = ctx.request.body;
    if (ctx.isUnauthenticated()) {
      return ctx.error({ msg: '您尚未登录，无法进行删帖操作' });
    }
    
    const user = ctx.state.user;
    
    const reply = await ReplyModel.findById(replyId);
    const post = await PostModel.findById(reply.postId);
    
    if (!reply) {
      return ctx.error({ msg: '参数错误，未找到该回复' });
    }

    if (!validator.equals(reply.authorId.toString(), user.id) && !validator.equals(post.authorId.toString(), user.id)) {
      return ctx.error({ msg: '您没有权限删除该回复' });
    }

    if (reply.deleted){
      return ctx.error({ msg: '该回复已被删除' });
    }
    reply.deleted = true;
    reply.save();

    return ctx.success({ msg: '删除回复成功！' });
  }
}

module.exports = new ReplyController();