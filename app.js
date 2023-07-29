const http = require('http');
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
const ransw = '143422312222322441';
const ranswArr = ['1', '4', '3', '4', '2', '2', '3', '1', '2', '2', '2', '2', '3', '2', '2', '4', '4', '1'];
//const client = new pg.Client(pool);

http.createServer(function(request, response){
    if (request.url==='/'){
        response.writeHead(200, {'Content-Type': 'text/html'});
        var myReadStream = fs.createReadStream(filepath, 'utf8');
        myReadStream.pipe(response);
    }


    if (whatUrl(request.url) === '/about?'){
        post_to_base(request.url);
    }

    if (request.url=='/pups227'){
        (async ()=>{
            await queryDatabase();
            //await (()=>{
            await response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                // let str = '';
                // for (let i = 0; i<arr.length; i++){
                //     str+=`${arr[i][0]} - ${arr[i][3]} баллов, ${100*arr[i][3]/18} %`;
                //     str += ' \n ';
                // }
                // response.end(str);
                for (let i = 0; i<arr.length; i++){

                    response.write(`<div>${arr[i][0]} - ${arr[i][3]} баллов из 18, ${100*arr[i][3]/18} % </div>`);
                }
            //})
        })()
    }



}).listen(3000);

















//Функции
function whatUrl(url){
    let str = "";
    if (url.length>=6){
        for (let i = 0; i < 7; i++){
            let symb = url[i];
            str+=`${symb}`;
        }
    }
    return str;
}

function post_to_base(url){
    let current_url = new URL(`http://localhost:3000${url}`);
    let search_params = current_url.searchParams;

    let name = search_params.get('name');
    let answer = search_params.get('scope');

    console.log('name = ', name);
    console.log('answer = ', answer);

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








