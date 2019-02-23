var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("babel-core/register");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var wnsRouter = require('./routes/wns');
var app = express();
var net = require("net")
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/wns',wnsRouter);
app.listen(8090);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// var server = net.createServer(function (socket){
//   //新的连接；
//       socket.on('data',function(data){
//           console.log(JSON.stringify(data))
//           socket.write("你好");
//       });
//       socket.on('end',function(data){
//           console.log('连接断开');
//       });
//       socket.write("朋友，你好.\n");
//   });
//   server.listen(8000,function(){
//       console.log('绑定服务器80端口');
//   });


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
