const express = require('express')
const app = express()
const fs = require('fs');
const path = require('path');
const {Pool, Client} = require('pg');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const dirname = `${__dirname}`;
module.exports.dirname = dirname;
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



const oneDay = 1000 * 60 * 60 * 24 * 30;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: true
}));




const homeRoutes = require(path.join(__dirname, './routes/home.js'));
const answerRoutes = require(path.join(__dirname, './routes/answers.js'));
const createRoutes = require(path.join(__dirname, './routes/create.js'));
const doRoutes = require(path.join(__dirname, './routes/do.js'));
const loginRoutes = require(path.join(__dirname, './routes/login.js'));
let userRoutes = require(path.join(__dirname, './routes/user.js'));
const errorsRoutes = require(path.join(__dirname, './routes/errors.js'));
userRoutes = userRoutes.router;
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
app.use('/logs', errorsRoutes);
//Использование подключенных роутов


const PORT = process.env.PORT;
app.listen(PORT || 3000);
//Пролушиваемый порт