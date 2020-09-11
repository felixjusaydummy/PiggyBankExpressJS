var config = require("./../../../../config");
var log = require("./../../../utilities/consoleutil");
var AWS = require("aws-sdk");
AWS.config.update({
  region: config.DB_REGION,
  endpoint: config.DB_ENDPOINT
});
var dynamodb = new AWS.DynamoDB();
var tableName = "Accounts"

//CHECK IF TABLE EXIST
// exports.checkTable = function checkTable(tableName, callback) {
function checkTable(callback) {
    log.info("CHECK TABLE", tableName);
    // var status = false;
    var params = {
        TableName: tableName
    };

    dynamodb.describeTable(params, function (err, data) {
        if (err) {
            // console.log(err, err.stack); // an error occurred
            // status = false;
            // callback(new Error("Error occured in checking dynamoDB: "+ JSON.stringify(err, null, 2)));
            callback(err)
        }else{
            // log.info("check table info", JSON.stringify(data))
            callback(null,true);

        }
    })

    
}

function createTable(callback){
    //CREATE TABLE
    var dynamodb = new AWS.DynamoDB();

    var params = {
        TableName : tableName,
        KeySchema: [       
            { AttributeName: "id", KeyType: "HASH" }, //Partition Key
            { AttributeName: "name", KeyType: "RANGE" } //Sort Key
            // { AttributeName: "username", KeyType: "HASH" },  
            // { AttributeName: "password", KeyType: "HASH" }
        ],
        AttributeDefinitions: [       
            { AttributeName: "id", AttributeType: "S" },
            { AttributeName: "name", AttributeType: "S" }
        ],
        ProvisionedThroughput: {       
            ReadCapacityUnits: 10, 
            WriteCapacityUnits: 10
        }
    };

    dynamodb.createTable(params, function(err, data) {
        if (err) {
            // console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
            callback(new Error("Unable to create table. Error JSON: "+ JSON.stringify(err, null, 2)));
            
        } else {
            // console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
            callback(null, "Created table. Table description JSON: "+ JSON.stringify(data, null, 2));

        }
    });
}

//======= MAIN =======//

try{
    checkTable((err, data)=>{
        if(err){
            var errdet = JSON.parse(JSON.stringify(err, null, 2));
            
            log.info("ERROR CHECK TABLE", JSON.stringify(err, null, 2));
            if(errdet.errno === "ECONNREFUSED"){
                log.info("ERROR DB CONNECTION", err);
            }else{
                log.info("CREATE TABLE", tableName);
                createTable((err,data)=>{
                    if(err){
                        log.info("UNABLE TO CREATE TABLE", err)
                    }else{
                        log.info("CREATE TABLE","Table '"+ tableName+"' created successfully");
                    }
                });    
            }
        }else{
            log.info("CHECK TABLE RESULT", "Table '"+tableName+"' already exist" );
        }
    });

}catch(err){
    log.info("ERROR CREATING TABLE",err);
}
