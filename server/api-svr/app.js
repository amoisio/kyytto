const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const R = require('ramda');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env['SQL_HOST'],
  user: process.env['SQL_USER'],
  password: process.env['SQL_PWD'],
  database: process.env['SQL_DB']
});

const indexRoutes = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', process.env['CORS_ALLOW_ORIGIN']);
  next();
});

app.use('/', indexRoutes);

module.exports = app;
