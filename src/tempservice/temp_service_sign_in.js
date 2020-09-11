var express = require('express');
var dataState = require('./init-state')
var router = express.Router();

router.post('/prod/signin', function(req, res){
    const result = {
        result : "success",
        data :{
            name: "john"
        }
    }
    res.send(result);
})




module.exports = router;