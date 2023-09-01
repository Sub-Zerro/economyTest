const {Router} = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');
const js_functions = require(path.join(__dirname, '../functions.js'));


router.get('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var myReadStream = fs.createReadStream(path.join(__dirname, '../htmls', 'home.html'), 'utf8');
    myReadStream.pipe(res);
});

router.post('/', function (req, res) {
    console.log(req.body);
    try {
        js_functions.post_to_base(req.body.name, req.body.answer, req.body.num_quiz);
        res.send({isgood: true});
    }
    catch{
        res.send({isgood: false});
    }


})

module.exports = router