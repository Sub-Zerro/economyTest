const express = require("express");

const app = express();

let answerArr = [];

const urlencodedParser = express.urlencoded({extended: false});
// app.get("/", function (request, response) {
//     response.sendFile(__dirname + "/word2.txt");
// });
const fs = require("fs");
const pg = require('pg');
//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


const {Pool, Client} = require('pg');

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const pool = new Pool({
    host: 'db.lsqzvzhcwzpvqhgpdwbl.supabase.co',
    // Do not hard code your username and password.
    // Consider using Node environment variables.
    user: 'postgres',
    password: 'wrH_RT@easgfh',
    database: 'postgres',
    port: 5432,
    ssl: true
})


// асинхронное чтение
let indexData;
app.get("/file", function (req, res){
    // fs.readFile("word3.txt", "utf8",
    //     function(error,data){
    //         console.log("Асинхронное чтение файла");
    //         if(error) throw error; // если возникла ошибка
    //         console.log(data);  // выводим считанные данные
    //         indexData = data;
    // });
    indexData = fs.readFileSync('word3.txt').toString();
    res.sendFile(__dirname + "/index.html");
})

app.get("/", function (req, res){
    res.sendFile(__dirname + "/form.html");
})

app.post("/", urlencodedParser, function (request, response) {
    //if(!request.body) return response.sendStatus(400);



    pool.query(`
            INSERT INTO results(name, answer)values('${request.body.name}', '${request.body.numberOfQ}')

    `, (err, res) => {
        console.log(err, res);
    })
});

app.listen(3000, () => console.log("Сервер запущен..."));