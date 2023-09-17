const path = require('path');
const fs = require('fs');
const app = require(path.join(__dirname, 'app.js'));
const pool = app.pool;


function post_to_base(name, answer, num_quiz, date){
    pool.query(`
            INSERT INTO results(name, answer, num_quiz, date)values('${name}', '${answer}', '${num_quiz}', '${date}');

    `, (err, res) => {
        console.log(err, res);
    })
}



async function queryDatabase(str_arr, num_quiz) {

    console.log("THIS@@@@@@@@@@@@@@@");
    console.log(str_arr);

    //console.log(`Running query to PostgreSQL server: ${pool.host}`);

    let arr = [];

    const query = `select * from results where num_quiz = ${num_quiz}`;

    await pool.query(query)
        .then(res => {
            const rows = res.rows;

            rows.map(row => {
                console.log(`Read: ${JSON.stringify(row)}`);
            });

            for (let i = 0; i<res.rows.length; i++){
                arr.push([res.rows[i]['name'],res.rows[i]['answer'],res.rows[i]['date']]);
            }
            console.log(arr);
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
        for(let k = 0; k<arr[i][3].length; k++){
            console.log("str_arr[i] = ", str_arr[k]);
            if (arr[i][3][k]==str_arr[k]){
                counter++;
                console.log("counter = ", counter);
            }

        }
        arr[i].push(counter)
    }

    for(let i = 0; i < arr.length; i++){
        let counter = 0;
        let push_arr = [];
        for (let k = 0; k < arr[i][3].length; k++){
            if (arr[i][1][k] != str_arr[k]){
                push_arr.push(k+1);
                counter++;
            }
        }
        if (counter == 0){
            arr[i].push(null);
        }else{
            arr[i].push(push_arr);
        }
    }

    console.log(arr)
    return arr;
}


async function set_new_quiz(arr, str, author){

    let last_num;

    let p = await new Promise(function (resolve, reject){
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
            INSERT INTO questions(num_quiz, num_question, question, ans1, ans2, ans3, ans4, author)values('${now_num_quiz}', '${i+1}', '${arr[i][0]}', '${arr[i][1]}', '${arr[i][2]}', '${arr[i][3]}', '${arr[i][4]}', '${author}');
            `, (err, res) => {
                    console.log(err, res);
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
        return new Promise(async function (resolve, reject){
            // await pool.query(`
            // INSERT INTO status(num_quiz, st)values('${now_num_quiz}', 0);
            // `, (err, res) => {
            //     console.log(err, res);
            // })
            resolve(now_num_quiz);
        })

    }).then((now_num_quiz)=>{
        return now_num_quiz;
    })

    return p;
}


function get_answers(res, num_quiz){

    let arr = [];
    let str = '';
    let str_arr;
    let end_arr;
    let counter;

    console.log("Type = ", typeof (num_quiz));

    new Promise(function (resolve, reject) {
        const query = `SELECT * FROM results WHERE num_quiz = ${num_quiz}`;
        pool.query(query)
            .then(res => {
                const rows = res.rows;

                rows.map(row => {
                    console.log(`Read: ${JSON.stringify(row)}`);
                });

                for (let i = 0; i<res.rows.length; i++){
                    arr.push([res.rows[i]["name"], res.rows[i]["answer"], res.rows["date"]]);
                }

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

                })
                .catch(err => {
                    console.log(err);
                });
        })
    }).then(()=>{
        return new Promise(function (resolve, reject) {
            const query2 = `select counter from status where num_quiz=${num_quiz}`;
            pool.query(query2)
                .then(res => {
                    const rows = res.rows;

                    rows.map(row => {
                        console.log(`Read: ${JSON.stringify(row)}`);
                    });

                    counter = res.rows[0]["counter"];

                    resolve();

                })
                .catch(err => {
                    console.log(err);
                });
        })
    }).then(()=>{
        return new Promise(async function (resolve, reject) {
            end_arr = await queryDatabase(str_arr, num_quiz);
            resolve();
        })
    }).then(()=>{
        return new Promise(function (resolve, reject){
            const query2 = `select * from questions where num_quiz=${num_quiz} ORDER BY num_question ASC`;
            pool.query(query2)
                .then(res => {
                    const rows = res.rows;
                    console.log("NUM QUIZ = ", num_quiz);
                    rows.map(row => {
                        console.log(`Read: ${JSON.stringify(row)}`);
                    });

                    let arr2 = [];

                    for (let i = 0; i < res.rows.length; i++){
                        arr2.push([res.rows[i]["question"], res.rows[i]["ans1"], res.rows[i]["ans2"], res.rows[i]["ans3"], res.rows[i]["ans4"]]);
                        //arr2.push(1);
                    }

                    console.log("ARRRRRRRRRRRRRRRRRRRRRRR!!!!!!!!!!!!");
                    console.log(arr2);

                    resolve(arr2);

                })
                .catch(err => {
                    console.log(err);
                });
        })
    }).then((arr2)=>{
        res.send({arr: end_arr, counter:counter, questions: arr2, right_str: str_arr});
    })
}

function add_err(err){
    fs.appendFileSync('errors.txt', `${err} \n \n`);
}

async function check_settings(name){
    //console.log(typeof (name));
    console.log('name', name);
    let arr = [];
    const query2 = `select * from status where name='${name}'`;
    //const query2 = `select st from status`;

    await pool.query(query2)
        .then(res => {
            const rows = res.rows;

            rows.map(row => {
                console.log(`Read: ${JSON.stringify(row)}`);
            });

            //st = res.rows[0]["st"];
            //st = 1;
            for (let i = 0; i < res.rows.length; i++){
                arr.push([res.rows[i]["num_quiz"], res.rows[i]["st"]]);
            }


            return;

        })
        .catch(err => {
            console.log(err);
        })

    return arr;
}

async function change_settings(num_quiz, value){
    const query2 = `UPDATE status SET st=${value}, counter = counter+1 WHERE num_quiz=${num_quiz}`;
    //const query2 = `select st from status`;

    await pool.query(query2)
        .then(res => {
            const rows = res.rows;

            rows.map(row => {
                console.log(`Read: ${JSON.stringify(row)}`);
            });

        })
        .catch(err => {
            console.log(err);
        })
}

function add_settings(num_quiz, author){
    pool.query(`
            INSERT INTO status(num_quiz, name, st)values('${num_quiz}', '${author}', 0);
            `, (err, res) => {
        console.log(err, res);
    })
}

module.exports.post_to_base = post_to_base;
module.exports.queryDatabase = queryDatabase;
module.exports.set_new_quiz = set_new_quiz;
module.exports.get_answers = get_answers;
module.exports.add_err = add_err;
module.exports.check_settings = check_settings;
module.exports.change_settings = change_settings;
module.exports.add_settings = add_settings;

