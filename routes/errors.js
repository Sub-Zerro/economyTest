const {Router} = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');
const dirname = require(path.join(__dirname, '../app.js')).dirname;


router.get('/', function (req, res){
    res.download(`${dirname}/errors.txt`);
})

module.exports = router;