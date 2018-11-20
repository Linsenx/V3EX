const validator = require('validator');
const PostModel = require('../models/post/post.js');
const UserModel = require('../models/user/user.js');

class PostController {
  // 创建帖子
  async create(ctx) {
    const { node, title, content } = ctx.request.body;
    if (ctx.isUnauthenticated()) {
      return ctx.error({ msg: '您尚未登录，无法进行发帖操作' });
    }

    if (validator.isEmpty(title) || validator.isEmpty(content)){
      return ctx.error({ msg: '标题和内容不能为空'});
    }

    const user = ctx.state.user;
    await PostModel.create({ 
      node : node,
      title: title,
      content : content,
      authorId: user.id,
      createAt: new Date(),
      updateAt: new Date()
    });
    ctx.success({ msg: '帖子发布成功' })
  }

  // 删除帖子
  async delete(ctx) {
    const { postId } = ctx.request.body;
    if (ctx.isUnauthenticated()) {
      return ctx.error({ msg: '您尚未登录，无法进行删帖操作' });
    }
    const user = ctx.state.user;
    const post = await PostModel.findById(postId);
    
    if (!post) {
      return ctx.error({ msg: '参数错误，未找到该帖子' });
    }
    if (!validator.equals(post.authorId.toString(), user.id)) {
      return ctx.error({ msg: '您没有权限删帖' });
    }
    post.deleted = true;
    post.save();

    return ctx.success({ msg: '删帖成功！' });
  }
}

module.exports = new PostController();