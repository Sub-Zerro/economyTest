const {Router} = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');
const js_functions = require(path.join(__dirname, '../functions.js'));
let my_json = require(path.join(__dirname, '../users.json'));
let session;


router.get("/", function (req, res){
    session = require(path.join(__dirname, 'user.js'));
    session = session.get_session();
    console.log(session);

    if (session){
        if(session.userid) {
            res.redirect('/user');
        }else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            var myReadStream = fs.createReadStream(path.join(__dirname, '../htmls', 'login.html'), 'utf8');
            myReadStream.pipe(res);
        }
    }else{
        res.writeHead(200, {'Content-Type': 'text/html'});
        var myReadStream = fs.createReadStream(path.join(__dirname, '../htmls', 'login.html'), 'utf8');
        myReadStream.pipe(res);
    }
})

module.exports = router