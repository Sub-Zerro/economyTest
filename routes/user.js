const {Router} = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');
const js_functions = require(path.join(__dirname, '../functions.js'));
let my_json = require(path.join(__dirname, '../users.json'));


let session;
router.get('/', function(req, res) {
    session=req.session;
    if(session.userid){
        //checkSession()
        res.writeHead(200, {'Content-Type': 'text/html'});
        var myReadStream = fs.createReadStream(path.join(__dirname, '../htmls', 'create_ans.html'), 'utf8');
        myReadStream.pipe(res);

        //res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else {
        //res.sendFile(path.join(__dirname, 'index.html'));
        res.redirect('/');

    }
});

router.post('/', function (req, res){
    console.log(req.body);
    let count = 0;
    for (var key in my_json){
        if ((req.body.name == my_json[key].name) && (req.body.password == my_json[key].pass)){
            session=req.session;
            session.userid=my_json[key].name;
            console.log(req.session)

            res.sendStatus(200);
            console.log(1);
            count++;
        }
    }
    if (count==0){
        res.status(401).end();
        console.log(2);
    }
})

function get_session(){
    return session;
}

//module.exports.session = session;
module.exports = {router, session, get_session};