const {Router} = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');

const js_functions = require(path.join(__dirname, '../functions.js'));

router.get('/', function (req, res){

    if (req.session.userid){
        res.writeHead(200, {'Content-Type': 'text/html'});
        var myReadStream = fs.createReadStream(path.join(__dirname, '../htmls', 'settings.html'), 'utf8');
        myReadStream.pipe(res);
    }else{
        res.redirect('/');
    }
})

router.post('/', async function (req, res){
    console.log('POST!');
    let arr  = await js_functions.check_settings(req.session.userid);
    console.log(arr);
    res.send({arr: arr});
})

router.put('/', async function (req, res){
    let num_quiz = req.body.num_quiz;
    let value;
    if (req.body.action == "to_1"){
        value = 1;
    }else{
        value = 0;
    }

    // console.log("num_quiz = ", num_quiz);
    // console.log("value = ", value);

    await js_functions.change_settings(num_quiz, value);

    res.send({});
})




module.exports = router;