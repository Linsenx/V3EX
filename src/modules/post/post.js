let mongooes = require('mongoose');

/**
 * 帖子结构
 * -- title: 标题
 * -- createAt: 发布日期
 * -- likeCount: 顶
 * -- dislikeCount: 踩
 * -- reviewCount: 点击量
 */
const postSchema = new mongooes.Schema({
  title: { type: String, required: true },
  createAt: { type: Date, required: true },
  likeCount: { type: Number, default: 0 },
  dislikeCount: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }  
});

const Post = mongooes.model('Post', postSchema);

module.exports = Post;