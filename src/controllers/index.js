const validator = require('validator');
const PostModel = require('../models/post/post.js');
const UserModel = require('../models/user/user.js');
const ReplyModel = require('../models/post/reply.js');

class Main{
  async post(ctx){
    let Index = 1;
    const { type,item } = ctx.query;
    if(item) Index =item;
    const user = ctx.session.user;
    return ctx.render('post', { 
      title: 'V3EX管理平台',
      message:'文章管理',
      user,
      index: Index,
      menu:menu[type]  
    });
  }
}
module.exports = index;