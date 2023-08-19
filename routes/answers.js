const {Router} = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');
const js_functions = require(path.join(__dirname, '../functions.js'));

let session;


router.get("/", function (req, res){
    session = require(path.join(__dirname, 'user.js')).get_session();

    if (session){
        if (session.userid){
            res.writeHead(200, {'Content-Type': 'text/html'});
            var myReadStream = fs.createReadStream(path.join(__dirname, '../htmls', 'answers.html'), 'utf8');
            myReadStream.pipe(res);
        }else{
            res.redirect('/');
        }
    }else{
        res.redirect('/');
    }


})

router.post("/", function (req, res){
    js_functions.get_answers(res, req.body.num_quiz);
})

module.exports = router