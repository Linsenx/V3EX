const mongoose = require('mongoose');
// const ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * 节点结构
 * -- title: 节点名称
 */
const NodeSchema = new mongoose.Schema({
  nid: { type: Number, required: true },
  title: { type: String, default: '默认板块' },
  subNodes: { type: Array, default: [] },
  parentNode: { type: Number, default: 0 }
});

const Node = mongoose.model('Node', NodeSchema);

module.exports = Node;