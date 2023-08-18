const express = require('express')
const app = express()
const fs = require('fs');
const path = require('path');
const {Pool, Client} = require('pg');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
//Подключаем модули и настраиваем process

const database_data = require(path.join(__dirname, 'database.json'));
const pool = new Pool(database_data);
module.exports.pool = pool;
//Создаем новый пул в базу

let my_json = require(path.join(__dirname, 'users.json'));
//Подключаем json файл с данными пользователей

pool.connect();
//Подключаемся к базе по данным переменной pool

const js_functions = require(path.join(__dirname, 'functions.js'));
//Подключаем файл с функциями


const homeRoutes = require(path.join(__dirname, './routes/home.js'));
const answerRoutes = require(path.join(__dirname, './routes/answers.js'));
const createRoutes = require(path.join(__dirname, './routes/create.js'));
const doRoutes = require(path.join(__dirname, './routes/do.js'));
const loginRoutes = require(path.join(__dirname, './routes/login.js'));
const userRoutes = require(path.join(__dirname, './routes/user.js'));
//Подключаем роуты


app.use(express.json());
app.use(express.urlencoded());
//Для чтения файловпри get запросах ниже

app.use('/', homeRoutes);
app.use('/answers', answerRoutes);
app.use('/create', createRoutes);
app.use('/do', doRoutes);
app.use('/login', loginRoutes);
app.use('/user', userRoutes);
//Использование подключенных роутов


const PORT = process.env.PORT;
app.listen(PORT || 3000);
//Пролушиваемый порт