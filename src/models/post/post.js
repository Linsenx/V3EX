const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * 帖子结构
 * -- node: 节点
 * -- tags: 标签
 * -- author: 作者
 * -- title: 标题
 * -- content: 正文
 * -- createAt: 发布日期
 * -- updateAt: 更新日期
 * -- likeCount: 顶
 * -- dislikeCount: 踩
 * -- reviewCount: 点击量
 * -- deleted: 是否被删除
 */
const PostSchema = new mongoose.Schema({
  node: { type: Number, default: 0 },
  tags: { type: Array, default: [] },
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: ObjectId, required: true},
  createAt: { type: Date, required: true },
  updateAt: { type: Date, required: true },
  likeCount: { type: Number, default: 0 },
  likeUsers: { type: Array, default:[] },
  dislikeCount: { type: Number, default: 0 },
  dislikeUsers: { type: Array, default:[] },
  reviewCount: { type: Number, default: 0 },
  deleted: { type: Boolean, default: false }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;