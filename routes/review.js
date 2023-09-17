const {Router} = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');
const js_functions = require(path.join(__dirname, '../functions.js'));


router.get("/", function (req, res){
    if (req.session){
        if (req.session.userid){
            res.writeHead(200, {'Content-Type': 'text/html'});
            var myReadStream = fs.createReadStream(path.join(__dirname, '../htmls', 'review.html'), 'utf8');
            myReadStream.pipe(res);
        }
    }

})

router.post("/", function (req, res){
    js_functions.get_answers(res, req.body.num_quiz);
})

module.exports = router