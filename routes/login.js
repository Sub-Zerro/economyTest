const {Router} = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');
const js_functions = require(path.join(__dirname, '../functions.js'));
let my_json = require(path.join(__dirname, '../users.json'));

router.get("/", function (req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    var myReadStream = fs.createReadStream(path.join(__dirname, '../htmls', 'login.html'), 'utf8');
    myReadStream.pipe(res);
})

router.post("/", function (req, res) {
    console.log(req.body);
    let count = 0;
    for (var key in my_json){
        if ((req.body.name == my_json[key].name) && (req.body.password == my_json[key].pass)){
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

module.exports = router