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

// let arr = [];
// const ranswArr = ['1', '4', '3', '4', '2', '2', '3', '1', '2', '2', '2', '2', '2', '2', '4', '4', '1'];

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

app.get("/answers", function (req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    var myReadStream = fs.createReadStream(path.join(__dirname, '/htmls', 'answers.html'), 'utf8');
    myReadStream.pipe(res);
})







app.post('/', function (req, res) {
    post_to_base(req.body.name, req.body.answer, req.body.num_quiz)
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

    
    (async ()=>{
        await set_new_quiz(arr, str);

        const query = `select num_quiz from right_strs`;

        let last_num;

        await pool.query(query)
            .then(res => {
                const rows = res.rows;

                rows.map(row => {
                    console.log(`Read: ${JSON.stringify(row)}`);
                });

                let res_l = (res.rows.length)-1;

                for (let i = 0; i < res.rows.length; i++) {
                    if (i == res_l) {
                        last_num = res.rows[i]["num_quiz"];
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
        console.log('ВЫВОЖУ!!!!');
        console.log(last_num);

        //res.send(`${last_num}`);
        res.send({otv: last_num});
    })()
})

app.post("/do", function (req, res){
    let obj = {
        arr: [],
        str: '',
        num_quiz: req.body.num
    };
    let arr = [];

    new Promise(function (resolve, reject) {
        (async ()=>{
            const query = `select * from questions where num_quiz=${req.body.num}`;
            await pool.query(query)
                .then(res => {
                    const rows = res.rows;

                    rows.map(row => {
                        console.log(`Read: ${JSON.stringify(row)}`);
                    });

                    for(let i = 0; i < res.rows.length; i++){
                        arr.push([res.rows[i]["question"], res.rows[i]["ans1"], res.rows[i]["ans2"], res.rows[i]["ans3"], res.rows[i]["ans4"]]);
                    }

                    obj.arr = arr;
                })
                .catch(err => {
                    console.log(err);
                });

            const query2 = `select str from right_strs where num_quiz=${req.body.num}`;
            await pool.query(query2)
                .then(res => {
                    const rows = res.rows;

                    rows.map(row => {
                        console.log(`Read: ${JSON.stringify(row)}`);
                    });

                    obj.str = res.rows[0]["str"];
                })
                .catch(err => {
                    console.log(err);
                });

            //console.log(obj);
            resolve();
        })()
    }).then(()=>{
        res.send(obj);
    })
})

app.post("/answers", function (req, res){
    get_answers(res, req.body.num_quiz);
})



app.listen(3000)







//Функции
function post_to_base(name, answer, num_quiz){

    const query = `INSERT INTO results(name, answer, num_quiz)values('${name}', '${answer}', '${num_quiz}');`;


    pool.query(`
            INSERT INTO results(name, answer, num_quiz)values('${name}', '${answer}', '${num_quiz}');

    `, (err, res) => {
        console.log(err, res);
        //pool.end();
    })
    //return 0;
}



async function queryDatabase(str_arr) {

    console.log("THIS@@@@@@@@@@@@@@@");
    console.log(str_arr);

    //console.log(`Running query to PostgreSQL server: ${pool.host}`);

    let arr = [];

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
            console.log("arr[i] = ", arr[i]);
            for(let k = 0; k<arr[i][2].length; k++){
                console.log("str_arr[i] = ", str_arr[k]);
                if (arr[i][2][k]==str_arr[k]){
                    counter++;
                    console.log("counter = ", counter);
                }

            }
            arr[i].push(counter)
        }
        console.log(arr)
        return arr;
}


function set_new_quiz(arr, str){

    let last_num;

    let p = new Promise(function (resolve, reject){
        const query = `select num_quiz from right_strs`;
        pool.query(query)
            .then(res => {
                const rows = res.rows;

                rows.map(row => {
                    console.log(`Read: ${JSON.stringify(row)}`);
                });

                let res_l = (res.rows.length)-1;

                for (let i = 0; i < res.rows.length; i++){
                    if (i == res_l){
                        last_num = res.rows[i]["num_quiz"];
                    }
                }
                resolve(last_num);
            })
            .catch(err => {
                console.log(err);
            });
    }).then((last_num)=>{
        //console.log(last_num);
        return new Promise(function (resolve, reject) {
            let now_num_quiz = last_num+1;

            for (let i = 0; i < arr.length; i++){
                pool.query(`
            INSERT INTO questions(num_quiz, num_question, question, ans1, ans2, ans3, ans4)values('${now_num_quiz}', '${i+1}', '${arr[i][0]}', '${arr[i][1]}', '${arr[i][2]}', '${arr[i][3]}', '${arr[i][4]}');
            `, (err, res) => {
                    console.log(err, res);
                    //pool.end();
                })
            }

            resolve(now_num_quiz);
        })
    }).then((now_num_quiz)=>{
        return new Promise(function (resolve, reject) {
            pool.query(`
            INSERT INTO right_strs(num_quiz, str)values('${now_num_quiz}', '${str}');
            `, (err, res) => {
                console.log(err, res);
            })
            resolve(now_num_quiz);
        })
    }).then((now_num_quiz)=>{
        return now_num_quiz;
    })
}


function get_answers(res, num_quiz){

    let arr = [];
    let str = '';
    let str_arr;
    let end_arr;
    
    new Promise(function (resolve, reject) {
        const query = `select name, answer from results where num_quiz=${num_quiz}`;
        pool.query(query)
            .then(res => {
                const rows = res.rows;

                rows.map(row => {
                    console.log(`Read: ${JSON.stringify(row)}`);
                });

                for (let i = 0; i<res.rows.length; i++){
                    arr.push([res.rows[i]["name"], res.rows[i]["answer"]]);
                }

                //console.log(arr);
                resolve();


            })
            .catch(err => {
                console.log(err);
            });
    }).then(()=>{
        return new Promise(function (resolve, reject) {
            const query2 = `select str from right_strs where num_quiz=${num_quiz}`;
            pool.query(query2)
                .then(res => {
                    const rows = res.rows;

                    rows.map(row => {
                        console.log(`Read: ${JSON.stringify(row)}`);
                    });

                    str = res.rows[0]["str"];


                    str_arr = Array.from(str) ;

                    console.log("THIS");
                    console.log(str_arr);

                    resolve();

                    //console.log(str);


                })
                .catch(err => {
                    console.log(err);
                });
        })
    }).then(()=>{
        return new Promise(function (resolve, reject) {
            end_arr = queryDatabase(str_arr);
            resolve(end_arr);
        })
    }).then((end_arr)=>{
        // (async ()=>{
        //     await res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        //     for (let i = 0; i<arr.length; i++){
        //         res.write(`<div>${end_arr[i][0]} - ${end_arr[i][3]} баллов из 17, ${100*end_arr[i][3]/18} % </div>`);
        //     }
        // })()

        res.send({arr: end_arr});

        //res.write("nsadfaaaaaaasfasfsadf");

    })
}








