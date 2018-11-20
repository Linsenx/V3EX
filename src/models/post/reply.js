const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
/**
 * 帖子结构
 * -- node: 节点
 * -- tags: 标签
 * -- title: 标题
 * -- content: 正文
 * -- createAt: 发布日期
 * -- likeCount: 顶
 * -- dislikeCount: 踩
 * -- reviewCount: 点击量
 * -- deleted: 是否被删除
 */
const ReplySchema = new mongoose.Schema({
  content: { type: String, required: true },
  authorId: { type: ObjectId, required: true},
  postId: { type: ObjectId, required: true },
  createAt: { type: Date, required: true },
  updateAt: { type: Date, required: true },
  deleted: { type: Boolean, default: false }
});

ReplySchema.index({ postId: 1 });

const Reply = mongoose.model('Reply', ReplySchema);

module.exports = Reply;