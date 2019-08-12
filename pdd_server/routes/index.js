var express = require('express');
var router = express.Router();
var sms_util = require('./../util/sms_util');

// 引入数据库文档模型
var User = require('./../models/UserModel');

// 引入svg的验证文件
var svgCaptcha = require('svg-captcha');

// 处理MD5
var md5 = require('blueimp-md5');

// 用户信息
var users = {};

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//获取首页轮播图
router.get('/api/homecasual', (req, res)=>{
  const data = require('./../data/homecasual.json');
  res.json(data);
})

// 获取首页导航
router.get('/api/homenav', (req, res)=>{
  const navJson = require('./../data/homenav.json');
  res.json({
    success_code: 200,
    message: navJson.data
  });
})

// 获取首页商品列表数据
router.get('/api/homeshoplist',(req, res)=>{
  const data = require('./../data/shopList.json');
  res.json({
    success_code: 200,
    message: data
  })
})

// 获取搜索分类列表
router.get('/api/searchgoods', (req, res)=>{
  const data = require('./../data/search.json');
  res.json({
    success_code: 200,
    message: data
  })
})

/*****个人中心*******/
router.get('/api/captcha',(req, res)=>{
  // 生成随机的验证码
  var captcha = svgCaptcha.create({
    color: true,
    noise: 3,
    size: 4,
    ignoreChars: '0o1i'
  })

  //保存验证码到session
  req.session.captcha = captcha.text.toLocaleLowerCase();
  console.log(req.session);

  // 返回给客户端
  res.type('svg');
  res.status(200).send(captcha.data);
});


/*** 用户名和密码 ***/
router.post('/api/login_pwd',(req, res)=>{
  //  1. 获取数据
  var name = req.body.name;
  var pwd = md5(req.body.pwd);
  var captcha = req.body.captcha.toLocaleLowerCase();

  console.log('/api/login_pwd', name, pwd, captcha, req.session.captcha);

  // 2. 合法验证
  if(captcha !== req.session.captcha){
    debugger
    return res.send({err_code: 0, message: '验证码不正确!'});
  }

  // 从session中删除验证码
  delete req.session.captcha;

  // 查询数据库
  User.findOne({name}, (err,user)=>{
    if(user){ // 用户已注册
      console.log(user);
      if(user.pwd !== pwd){ // 密码错误
        return res.send({
          error_code: 0,
          message:'用户名或密码不正确！'
        })
      }else{
        req.session.userid = user._id;
        res.send({
          success_code: 200,
          data: {
            _id: user._id,
            name: user.name,
            phone: user.phone 
          }
        });
      }
    }else{  // 用户没有注册
      var userModel = new User({name, pwd});
      userModel.save(function(err, user){
        req.session.userid = user._id;
        res.send({
          success_code: 200,
          data: {
            _id: user._id,
            name: user.name
          }
        }) 
      })
    }
  })
  
});
/*** 用户名和密码 ***/


/*** 获取短信验证码 ***/
router.get('/api/send_code', (req, res)=>{
  // 获取手机号
  var phone = req.query.phone;
  // 随机产生验证码
  var code = sms_util.randomCode(6);
  
  // console.log(code);
  /*
  sms_util.sendCode(phone, code, function(success){
    if(success){ // 验证码已经成功发送到手机
      users[phone] = code,
      res.send({
        success_code: 200,
        message: '验证码获取成功'
      })
    }else{ // 验证码获取失败
      res.send({
        error_code: 0,
        message:'验证码获取失败'
      })
    }
  })
  */

  // 成功
  setTimeout(()=>{
    users[phone] = code;
    // console.log(users)
    res.send({
      success_code: 200,
      message:'验证码获取成功',
      code
    })
  },2000)

  // 失败
  /*
  setTimeout(()=>{
    res.send({
      error_code: 0,
      message: '验证码获取失败'
    })
  })
  */

})
/*** 获取短信验证码 ***/


/*** 手机验证码登录 ***/
router.post('/api/login_code', (req, res)=>{
  // 获取数据
  const phone = req.body.phone;
  const code = req.body.code;

  // 判断验证码是否正确
  if(users[phone] !== code){
    res.send({
      error_code: 0,
      message: '手机或验证码不正确'
    })
  }

  // 查询和操作
  delete users[phone];
  User.findOne({phone}, (err, user)=>{
    if(user){ // 用户存在
      req.session.userid = user._id;
      res.send({
        success_code: 200,
        data:{
          _id: user._id,
          name: user.name,
          phone: user.phone
        }
      })
    }else{ // 用户不存在
      var userModule =  new User({phone});
      userModule.save((err, user)=>{
        req.session.userid = user._id;
        res.send({
          success_code: 200,
          data:{
            _id: user._id,
            name: user.name,
            phone: user.phone
          }
        })
      })
    }
  })

})
/*** 手机验证码登录 ***/


/*** 根据session中的userid 去查对应的用户返回给客户端 ***/
const filter = {'pwd': 0, 'l_time': 0, '__v': 0};
router.get('/api/userinfo', (req, res)=>{
  // 取出userId
  const userId = req.session.userid;
  // 查询
  User.findOne({_id:userId}, filter, (err, user)=>{
    if(!user){
      // 清除上一次的userid
      delete req.session.userid;
      res.send({error_code: 0, message: '请先登录'});
    }else{
      res.send({success_code: 200, data: user});
    }
  })
})

// 退出登录
router.get('/api/logout', (req, res)=>{
  // 清除session中的userid
  delete req.session.userid;
  // 返回数据
  res.send({success_code: 200, message:'退出登录成功'});
})

/*****个人中心*******/

module.exports = router;
