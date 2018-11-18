const mongoose = require('mongoose');
const UserModel = require('../models/user/user.js');
const validator = require('validator');
const passport = require('koa-passport');

class UserController {
  // 用户注册
  async register(ctx) {
    const { username, password, email } = ctx.request.body;
    if (validator.isEmpty(username) || validator.isEmpty(password)) {
      return ctx.error({ msg: '用户名密码不得为空' });
    }

    if (email && validator.isEmail(email)) {
      return ctx.error({ msg: '电子邮箱格式错误' });
    }

    const hasOne = await UserModel.findOne({ username });
    if (hasOne) {
      return ctx.error({ msg: '该用户名已被注册' });
    }

    const result = await UserModel.create({ 
      username: username,
      password: UserModel.generatePassword(password),
      email: email,
      createAt: new Date()
    });
    ctx.success({ msg: '注册成功!' })
  }

  // 用户登录
  async login(ctx) {
    const { username, password } = ctx.request.body;
    if (validator.isEmpty(username) || validator.isEmpty(password)) {
      return ctx.error({ msg: '用户名密码不得为空' });
    }

    const user = await UserModel.findOne({ username });
    if (!user) {
      return ctx.error({ msg: '该用户尚未注册' });
    }

    if (!user.verifyPassword(password)) {
      return ctx.error({ msg: '用户名和密码无法匹配' });
    }
    
    ctx.login(user);
    ctx.success({ msg: '登录成功' });
  }

  // 用户登出
  logout(ctx) {
    if (ctx.isUnauthenticated()) {
      return ctx.error({ msg: '您尚未登录，无法进行登出操作' });
    }
    ctx.logout();
    ctx.success({ msg: '登出成功' });
  }
}

module.exports = new UserController();