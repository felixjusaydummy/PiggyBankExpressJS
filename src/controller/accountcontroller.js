var express = require('express');
var log = require("./../utilities/consoleutil")
var INIT_INSERTACCOUNT = require("./../db_modules/init/data/insert-account")
var router = express.Router();

router.get('/', function(req, res){
    res.send("login please");
})

router.post('/', function(req, res){
    
    log.info("POST ACCOUNT "+ JSON.stringify(req.body, null, 2))

    const username = req.body.username;
    res.send("username: "+ username)
    // res.json(username);
});


router.get('/initializeAccountsTable', function(req, res){
    
    
    const result = INIT_INSERTACCOUNT.insertDummyData();
    console.log("Success: "+ result)
    res.send(result);
    
});


module.exports = router;