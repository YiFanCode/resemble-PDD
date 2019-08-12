// 连接数据库
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pdd_data',{useNewUrlParser: true});

// 创建用户集合
var userSchema = mongoose.Schema({
    'name':{type: String},
    'pwd': {type: String},
    'phone': {type: String},
    'l_time': {type: Date, default: Date.now}
})

// 输出文档（model）
var User = mongoose.model('user',userSchema);

module.exports = User;