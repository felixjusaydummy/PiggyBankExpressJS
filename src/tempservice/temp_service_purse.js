var express = require('express');
var dataState = require('./init-state')
var router = express.Router();



router.post('/prod/account-purse-allocation-add', function(req, res){
    let datax =  Object.assign({}, dataState.initialStateResult)
    datax.user.account.bankName = "purse-allocation-add"
    const result = {
        status : "success",
        data : datax
    }
    res.send(result);
})




router.post('/prod/account-purse-allocation-add-cash', function(req, res){
    let datax =  Object.assign({}, dataState.initialStateResult)
    datax.user.account.bankName = "purse-allocation-add-cash"
    const result = {
        status : "success",
        // status : "error",
        data : datax
    }
    res.send(result);
})


router.post('/prod/account-purse-allocation-delete', function(req, res){
    let datax =  Object.assign({}, dataState.initialStateResult)
    datax.user.account.bankName = "purse-allocation-delete"
    const result = {
        status : "success",
        // status : "error",
        data : datax
    }
    res.send(result);
})


router.post('/prod/account-purse-allocation-release-cash', function(req, res){
    let datax =  Object.assign({}, dataState.initialStateResult)
    datax.user.account.bankName = "purse-allocation-release-cash"
    const result = {
        status : "success",
        // status : "error",
        data : datax
    }
    res.send(result);
})

module.exports = router;