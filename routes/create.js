const {Router} = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');
const js_functions = require(path.join(__dirname, '../functions.js'));
const app = require(path.join(__dirname, '../app.js'));
const pool = app.pool;

let session;

router.get("/", function (req, res){
    session = require(path.join(__dirname, 'user.js')).get_session();

    if (session){
        if (session.userid){
            res.writeHead(200, {'Content-Type': 'text/html'});
            var myReadStream = fs.createReadStream(path.join(__dirname, '../htmls', 'create.html'), 'utf8');
            myReadStream.pipe(res);
        }else{
            res.redirect('/');
        }
    }else{
        res.redirect('/');
    }


})

router.post("/", function (req, res) {
    let arr = req.body.arr;
    let str = req.body.str;

    console.log(arr);
    console.log(str);


    (async ()=>{
        await js_functions.set_new_quiz(arr, str, req.session.userid);

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
                js_functions.add_err(err);
                console.log(err);
            });

        console.log(last_num);

        res.send({otv: last_num});
    })()
})

module.exports = router