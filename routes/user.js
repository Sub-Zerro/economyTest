const {Router} = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');
const js_functions = require(path.join(__dirname, '../functions.js'));

router.get('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var myReadStream = fs.createReadStream(path.join(__dirname, '../htmls', 'create_ans.html'), 'utf8');
    myReadStream.pipe(res);
});

module.exports = router