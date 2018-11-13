let mongooes = require('mongoose');

/**
 * 用户结构
 * -- name: 用户名
 * -- password: 密码(md5加盐加密)
 * -- email: 注册邮箱
 * -- createAt: 注册日期
 */
var userSchema = new mongooes.Schema({
  name: { tpye: String, required: true },
  password: { tpye: String, required: true },
  email: { tpye: String, required: true },
  createAt: { type: Date, required: true }
});

var User = mongooes.model('User', userSchema);

module.exports = User;