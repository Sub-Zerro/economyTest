const express = require('express')
const app = express()
//var myParser = require("body-parser");
const fs = require('fs');
const path = require('path');
const pg = require('pg');
const {Pool, Client} = require('pg');
const filepath = path.join(__dirname, 'index.html');
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
pool.connect();

let arr = [];
const ranswArr = ['1', '4', '3', '4', '2', '2', '3', '1', '2', '2', '2', '2', '2', '2', '4', '4', '1'];

let users = {
    us1:{
        name: '1',
        pass: '1'
    },
    us2:{
        name: "economica",
        pass: "2023"
    }
}


//const client = new pg.Client(pool);

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

app.get('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var myReadStream = fs.createReadStream(path.join(__dirname, '/htmls', 'index.html'), 'utf8');
    myReadStream.pipe(res);
});

app.get('/pups227', function (req, res){
    (async ()=>{
        await queryDatabase();
        await res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        for (let i = 0; i<arr.length; i++){
            res.write(`<div>${arr[i][0]} - ${arr[i][3]} баллов из 17, ${100*arr[i][3]/18} % </div>`);
        }
    })()
})

app.get("/login", function (req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
     var myReadStream = fs.createReadStream(path.join(__dirname, '/htmls', 'login.html'), 'utf8');
     myReadStream.pipe(res);
})

app.get("/create", function (req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    var myReadStream = fs.createReadStream(path.join(__dirname, '/htmls', 'create.html'), 'utf8');
    myReadStream.pipe(res);
})





app.post('/', function (req, res) {
    post_to_base(req.body.name, req.body.answer)
})

app.post("/login", function (req, res) {
    console.log(req.body);
    if ((req.body.name == users.us1.name) && (req.body.password == users.us1.pass)){
        res.sendStatus(200);
        console.log(1);
    }else{
        res.status(401).end();
        console.log(2);
    }
})

app.post("/create", function (req, res) {
    let arr = req.body.arr;
    let str = req.body.str;

    console.log(arr);
    console.log(str);


})



app.listen(3000)







//Функции
function post_to_base(name, answer){

    const query = `INSERT INTO results(name, answer)values('${name}', '${answer}');`;


    pool.query(`
            INSERT INTO results(name, answer)values('${name}', '${answer}');

    `, (err, res) => {
        console.log(err, res);
        //pool.end();
    })
    //return 0;
}



async function queryDatabase() {

    //console.log(`Running query to PostgreSQL server: ${pool.host}`);

    const query = "select name,answer from results;";

    await pool.query(query)
        .then(res => {
            const rows = res.rows;

            rows.map(row => {
                console.log(`Read: ${JSON.stringify(row)}`);
            });

            for (let i = 0; i<res.rows.length; i++){
                arr.push([res.rows[i]['name'],res.rows[i]['answer']]);
            }

            console.log(arr);

            //process.exit();
        })
        .catch(err => {
            console.log(err);
        });


        for(let i = 0; i<arr.length; i++){
            arr[i].push(arr[i][1].split(''))
        }
        console.log(arr)

        for(let i = 0; i<arr.length; i++){
            let counter = 0;
            for(let k = 0; k<arr[i][2].length; k++){
                if (arr[i][2][k]==ranswArr[k]){
                    counter++;
                }

            }
            arr[i].push(counter)
        }
        console.log(arr)
}


function set_new_quiz(){

}








