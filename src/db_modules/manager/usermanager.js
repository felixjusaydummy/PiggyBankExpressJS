var AWS = require("aws-sdk");
var config = require("./../../../config");
var log = require("./../../utilities/consoleutil");

AWS.config.update({
  region: config.DB_REGION,
  endpoint: config.DB_ENDPOINT
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();
var table = "users";


exports.createAccount = (param, callback)=>{
    
    
    var email = param.email
    var password = param.password;
    var name = param.name;

    var params = {
        TableName:table,
        Item:{
            "email": email,
            "password": password,
            "name": name
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            logTitle = "'"+table+"' ADD ITEM";
            logMessage = "Unable to add item";
            log.error(logTitle, logMessage, err)

            callback(new Error("ERROR "+ logTitle+", "+ logMessage));
        } else {
            // log.info("CREATE ITEM IN TABLE: "+ table, )
            logTitle = "'"+table+"' - ADD ITEM";
            logMessage = "Added Item: "+ JSON.stringify(data, null, 2);
            log.info(logTitle, logMessage);

            callback(null, data);
        }
    });
}



// GET ALL ACCOUNT - WORKING
exports.getAllUsers = async () =>{
    console.log("GET ALL Users")
    var params = {
        TableName:table
    };

    let scanResult = [];
    let items;
    
    do{
        items = await docClient.scan(params).promise();
        items.Items.forEach((item)=>{
            console.log("elemt: "+ JSON.stringify(item, null, 2))
            scanResult.push(item)
        });
        params.ExclusiveStartKey - items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey != "undefined");

    console.log("result list: "+ scanResult)
    return scanResult;
}





//name: zy
exports.getUser = async (emailToken) =>{
    console.log("GET User Item")

    var params = {
        TableName:table,
        Key: {
            email: emailToken
        }
    };

    docClient.get(params, (err, result)=>{
        if(err){
            console.log("get user error "+ err);
        }else{
            console.log("get user success: "+ JSON.stringify(result, null, 2))
        }
    })
}



exports.updateUser = async (email, password) => {
    console.log("UPDATE User Item")

    var params = {
        TableName:table,
        Key: {
            email : "john"
        },
        UpdateExpression: "set password = :p, purse.allocation = :a, purse.balance = :b ",
        ExpressionAttributeValues:{
            ":p" : "zzzzz",
            ":b" : 500,
            ":a" : [
                {
                    "id": 1,
                    "name" : "banana"
                },
                {
                    "id": 2,
                    "name" : "apple"
                },
            ]
        },
        ReturnValues: "UPDATED_NEW"
    };

    docClient.update(params, function(err, data) {
        if (err) {
            console.log("Error Update: "+ err)
        } else {
            logMessage = "Update Item: "+ JSON.stringify(data, null, 2);
            console.log(logMessage)
        }
    });
}