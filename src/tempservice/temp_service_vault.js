var express = require('express');
var dataState = require('./init-state')
var router = express.Router();



router.post('/prod/account-vault-allocation-add', function(req, res){
    let datax =  Object.assign({}, dataState.initialStateResult)
    datax.user.vault.allocations[0].description = "vault-allocation-add"
    const result = {
        status : "success",
        data : datax
    }
    res.send(result);
})


router.post('/prod/account-vault-allocation-add-cash', function(req, res){
    let datax =  Object.assign({}, dataState.initialStateResult)
    datax.user.vault.allocations[0].description = "vault-allocation-add-CASH"
    const result = {
        status : "success",
        data : datax
    }
    res.send(result);
})

module.exports = router;