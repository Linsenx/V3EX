const validator = require('validator');
const NodeModel = require('../models/node/node.js');

class NodeController {
  // 获取节点信息
  async get(ctx) {
    const { nid = 0 } = ctx.request.query;

    const node = await NodeModel.findOne({ nid });
    if (!node) {
      return ctx.error({ msg: '该节点不存在' });
    }
    
    const data = {
      title: node.title,
      subNodes: []
    };
    const getSubInfoTask = node.subNodes.map((nid) => {
      return NodeModel.findOne({ nid }, { _id: 0, nid: 1, title: 1 });
    })
    data.subNodes = await Promise.all(getSubInfoTask);

    return ctx.success({ data });
  }

  // 新建节点
  async createNode(ctx) {
    const { nid, title, parentNode = 0, root = false } = ctx.request.body;
    if (validator.isEmpty(nid)) {
      return ctx.error({ msg: '节点ID不能为空' });
    }
    if (validator.isEmpty(title)) {
      return ctx.error({ msg: '节点标题不能为空' });
    }
    const hasOne = await NodeModel.findOne({ nid });
    if (hasOne) {
      return ctx.error({ msg: '节点ID已存在' });
    }

    // 创建根节点则忽略父节点处理
    if (!root) {
      const parent = await NodeModel.findOne({ nid: +parentNode });
      if (!parent) {
        return ctx.error({ msg: '父节点不存在' });
      }
      if (parent.subNodes.indexOf(nid) === -1) {
        parent.subNodes.push(nid);
      }
      await parent.save();
    }

    await NodeModel.create({ nid, title, parentNode });
    return ctx.success({ msg: '节点插入成功' });
  }

  // 删除节点
  async removeNode(ctx) {
    
  }
}

module.exports = new NodeController();