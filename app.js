var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var sessionMiddleware = require('./middleware/session_middleware.js');

var authRouter = require('./routes/auth.js');
var walletRouter = require("./routes/wallet.js");

var app = express();


app.disable('x-powered-by');
app.use(logger('dev'));


app.use(cors({
  credentials: true,
  origin: [
    "http://localhost:9000"
  ]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', authRouter);
app.use('/wallet', sessionMiddleware.checkSessionLife, walletRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    type: "ERROR",
    message: err
  });
});

module.exports = app;
