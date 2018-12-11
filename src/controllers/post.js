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

    if (post.deleted){
      return ctx.error({ msg: '该帖已被删除' });
    }
    post.deleted = true;
    post.save();

    return ctx.success({ msg: '删帖成功！' });
  }

  //点赞帖子
  async like(ctx){
    const { postId } = ctx.request.body;
    if (ctx.isUnauthenticated()) {
      return ctx.error({ msg: '您尚未登录，无法进行点赞操作' });
    }
    
    const user = ctx.state.user;
    const post = await PostModel.findById(postId);
    
    if (!post) {
      return ctx.error({ msg: '参数错误，未找到该帖子' });
    }
    const haveLiked =  post.likeUsers.includes(user.id);
    const havedisLiked = post.dislikeUsers.includes(user.id);
    if (haveLiked){
      post.likeUsers.splice(post.likeUsers.findIndex(item => item ==user.id ), 1)
      post.likeCount -- ;
      post.save();
      return ctx.error({ msg: '取消点赞成功' });
    }
    if(havedisLiked){
      post.dislikeUsers.splice(post.dislikeUsers.findIndex(item => item ==user.id ), 1)
      post.dislikeCount -- ;
    }
    post.likeUsers.push(user.id);
    post.likeCount++;
    post.save();
    return ctx.success({ msg: '点赞成功,此时点赞数为' + post.likeCount });
  }

  //踩帖子
  async dislike(ctx){
    const { postId } = ctx.request.body;
    if (ctx.isUnauthenticated()) {
      return ctx.error({ msg: '您尚未登录，无法进行踩帖操作' });
    }
    
    const user = ctx.state.user;
    const post = await PostModel.findById(postId);
    
    if (!post) {
      return ctx.error({ msg: '参数错误，未找到该帖子' });
    }
    const haveLiked =  post.likeUsers.includes(user.id);
    const havedisLiked =  post.dislikeUsers.includes(user.id);
    if (havedisLiked){
      post.dislikeUsers.splice(post.dislikeUsers.findIndex(item => item ==user.id ), 1);
      post.dislikeCount -- ;
      post.save();
      return ctx.error({ msg: '取消踩成功' });
    }
    if(haveLiked){
      post.likeUsers.splice(post.likeUsers.findIndex(item => item ==user.id ), 1);
      post.likeCount -- ;
    }
    post.dislikeUsers.push(user.id);
    post.dislikeCount++;
    post.save();
    
    return ctx.success({ msg: '踩帖成功,此时踩帖数为' + post.dislikeCount })
  }

  //更新帖子内容
  async update(ctx){
    const { postId, content } = ctx.request.body;
    if (ctx.isUnauthenticated()) {
      return ctx.error({ msg: '您尚未登录，无法进行更新操作' });
    }
    
    const user = ctx.state.user;
    const post = await PostModel.findById(postId);
    
    if (!post) {
      return ctx.error({ msg: '参数错误，未找到该帖子' });
    }

    if (!validator.equals(post.authorId.toString(), user.id)) {
      return ctx.error({ msg: '您没有权限更新该帖' });
    }

    post.content = content;
    post.updateAt = new Date();
    post.save();

    ctx.success({ msg: '帖子更新成功' });
  }
}

module.exports = new PostController();