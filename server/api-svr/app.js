var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var R = require('ramda');

var indexRoutes = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', process.env['CORS_ALLOW_ORIGIN']);
  next();
});

app.use('/', indexRoutes.getRoot);

module.exports = app;
