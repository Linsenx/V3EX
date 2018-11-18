const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const dbConfig = require('../../config/db.cfg.js')[process.env.NODE_ENV||'development'];
mongoose.connect(dbConfig.uri);

// 连接成功 
mongoose.connection.on('connected', function() {
  console.log('Mongoose connection open to ' + dbConfig.uri);
});

// 连接失败
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});

// 断开连接
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose connection disconnected');
});
