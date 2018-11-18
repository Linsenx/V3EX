const mongoose = require('mongoose');
const md5 = require('blueimp-md5');
const validator = require('validator');

/**
 * 用户结构
 * -- groupId: 用户组 (0: 普通用户)
 * -- username: 用户名
 * -- password: 密码(md5加盐加密)
 * -- email: 注册邮箱
 * -- createAt: 注册日期
 */
const UserSchema = new mongoose.Schema({
  groupId: { type: Number, default: 0 },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, default: '' },
  createAt: { type: Date, required: true }
});

// 密码密钥
const md5_key = "helloworld_v3ex";

// 生成加盐密码
UserSchema.statics.generatePassword = function(password) {
  return md5(password, md5_key);
}

// 用户验证密码
UserSchema.methods.verifyPassword = function(unhashPass) {
  const hash = UserSchema.statics.generatePassword(unhashPass);
  return validator.equals(hash, this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;