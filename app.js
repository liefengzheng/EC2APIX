var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/', users);

require('./provider/db');
var userController = require('./controller/usercontroller');
app.use('/',userController);
var webcommoncontroller = require('./controller/webcommoncontroller');
app.use('/', webcommoncontroller);
var web2webcontroller = require('./controller/web2webcontroller');
app.use('/', web2webcontroller);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.statusCode = 404;
  res.end(`The url is not found!`);
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//注册模板引擎的 callback 用来处理ext扩展名的文件 默认情况下, 根据文件扩展名require() 对应的模板引擎
// 比如你想渲染一个 "foo.jade" 文件，Express会在内部执行下面的代码，然后会缓存require()，这样就可以提高后面操作的性能
app.engine('jade', require('jade').__express);

module.exports = app;
