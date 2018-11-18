let mongoose = require('mongoose');

/**
 * 用户结构
 * -- groupId: 用户组 (0: 普通用户)
 * -- username: 用户名
 * -- password: 密码(md5加盐加密)
 * -- email: 注册邮箱
 * -- createAt: 注册日期
 */
const userSchema = new mongoose.Schema({
  groupId: { type: Number, default: 0 },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, default: '' },
  createAt: { type: Date, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;