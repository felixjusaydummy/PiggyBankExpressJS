var AWS = require("aws-sdk");
var config = require("./../../../config");
var log = require("./../../utilities/consoleutil");

AWS.config.update({
  region: config.DB_REGION,
  endpoint: config.DB_ENDPOINT
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();
var table = "Accounts";

//PRIVATE FUNCTION
exports.getAccountSize = (callback)=>{
    var params  = {
        TableName: table
    }
    dynamodb.describeTable(params, function(err, data) {
        if (err) {
            logTitle = "DESCRIBE TABLE";
            logMessage = "Unable to describe item";
            log.error(logTitle, logMessage, err)
            callback(new Error("ERROR "+ logTitle+", "+ logMessage));
        } else {
            var tableData = data['Table'];
            var size = tableData['ItemCount'];

            log.info("DESCRIBE SUCCESS "+ JSON.stringify(tableData, null, 2))
            logTitle = "DESCRIBE TABLE - "+ table;
            logMessage = "Table size: "+ size;
            log.info(logTitle, logMessage);
            
            callback(null, data);
        }
    });
}



exports.createAccount = (param, callback)=>{
    
    var id = param.id;
    var name = param.name;
    var username = param.username;
    var password = param.password;

    var params = {
        TableName:table,
        Item:{
            "id":id,
            "name": name,
            "username": username,
            "password": password
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
exports.getAllAccounts = async () =>{
    console.log("GET ALL ACCOUNTS")
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



// GET ACCOUNTS - WORKING
exports.getAllAccounts2 = async () =>{
    console.log("GET ALL ACCOUNTS")
    var params = {
        TableName:table
    };

    let scanResult = [];
    let items;
    
    docClient.scan(params, onScan);
    var count = 0;
    function onScan(err, data){
        if(err){
            console.log("error bay")
        }else{
            console.log("scan all success")
            data.Items.forEach(element => {
                console.log("element: "+ JSON.stringify(element,null, 2))
            });

            if(typeof data.LastEvaluatedKey != "undefined"){
                console.log("scanning for more ....");
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                docClient.scan(params, onScan);
            }
        }
    }
}


//name: zy
exports.getAccount = async (nameToken) =>{
    console.log("GET Account Item")
    // var params = {
    //     TableName:table,
    //     KeyConditionExpression : "#name = :name",
    //     ExpressionAttributeNames : {
    //         "#name" :"name"
    //     },
    //     ExpressionAttributeValues :{
    //         ":name" : nameToken
    //     }
    // };

    let testToken = 4
    let testName = "juzy1"
    var params = {
        "TableName": "Accounts",
        "Key": {
            "id": {
                "S" : "4"
            },
            "name": {
                "S": "juzy1"
            }
        },
        "ProjectionExpression": "LastPostDateTime, Message, Tags",
        "ConistentRead": true,
        "ReturnConsumedCapacity": "TOTAL"
    };

    let scanResult = [];
    let items;
    // await docClient.get(params).promise()
    docClient.get(params, (err, result)=>{
        if(err){
            console.log("get account error "+ err);
        }else{
            console.log("get account success: "+ JSON.stringify(result, null, 2))
        }
    })
    // items = await docClient.query(params).promise();
    // console.log("result list: "+ JSON.stringify(items, null, 2))
    // return scanResult;c
}



