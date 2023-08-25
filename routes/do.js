const {Router} = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');
const js_functions = require(path.join(__dirname, '../functions.js'));
const app = require(path.join(__dirname, '../app.js'));
const pool = app.pool;

router.get('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var myReadStream = fs.createReadStream(path.join(__dirname, '../htmls', 'index.html'), 'utf8');
    myReadStream.pipe(res);
});

router.post("/", function (req, res){
    let obj = {
        arr: [],
        str: '',
        num_quiz: req.body.num,
        scam: false
    };
    let arr = [];

    new Promise(function (resolve, reject){
        const query = `select st from status where num_quiz=${req.body.num}`;
        pool.query(query)
            .then(res => {
                const rows = res.rows;

                rows.map(row => {
                    console.log(`Read: ${JSON.stringify(row)}`);
                });

                let st = res.rows[0]["st"];

                if (st==1){
                    resolve();
                }else{
                    reject();
                }



            })
            .catch(err => {
                reject(err);
            });


    }).then(()=>{
        new Promise(function (resolve, reject) {
            (async ()=>{
                const query = `select * from questions where num_quiz=${req.body.num} order by num_question asc`;
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
                        obj.scam = true;
                        reject(err);
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
                        obj.scam = true;
                        reject(err);
                    });

                resolve();
            })()
        }).then(()=>{
            res.send(obj);
        }).catch((err)=>{
            //res.end('/123');
            res.redirect('https://fonts.google.com/');
            js_functions.add_err(err);
        })
    }).catch((err)=>{
        js_functions.add_err('the requested quiz is not available');
    })


})

module.exports = router