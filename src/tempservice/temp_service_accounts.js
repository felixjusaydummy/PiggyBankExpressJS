var express = require('express');
var dataState = require('./init-state')
var router = express.Router();

router.get('/prod/account', function(req, res){
    const result = {
        status : "success",
        data : dataState.initialState.user
    }
    
    res.send(result);
})




module.exports = router;