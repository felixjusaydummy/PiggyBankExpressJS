var express = require('express');
var dataState = require('./init-state')
var router = express.Router();



router.post('/prod/transfer-savingsaccount-to-vault', function(req, res){
    let datax =  Object.assign({}, dataState.initialStateResult)
    datax.user.account.bankName = "transfer-savingsaccount-to-vault"
    const result = {
        status : "success",
        data : datax
    }
    res.send(result);
})


router.post('/prod/transfer-vault-to-savingsaccount', function(req, res){
    let datax =  Object.assign({}, dataState.initialStateResult)
    datax.user.vault.allocations[0].description = "transfer-vault-to-savingsaccount"
    const result = {
        status : "success",
        data : datax
    }
    res.send(result);
})

module.exports = router;