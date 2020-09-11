var config = require("./../../../../config");
var log = require("./../../../utilities/consoleutil");
var AWS = require("aws-sdk");
AWS.config.update({
  region: config.DB_REGION,
  endpoint: config.DB_ENDPOINT
});
var dynamodb = new AWS.DynamoDB();
var tableName = "users"
console.log("CREATE USER TABLE")

//CHECK IF TABLE EXIST
// exports.checkTable = function checkTable(tableName, callback) {
function checkTable(callback) {
    log.info("CHECK TABLE", tableName);
    var params = {
        TableName: tableName
    };

    dynamodb.describeTable(params, function (err, data) {
        if (err) {
            callback(err)
        }else{
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
            { AttributeName: "email", KeyType: "HASH" }
        ],
        AttributeDefinitions: [       
            { AttributeName: "email", AttributeType: "S" },
        ],
        ProvisionedThroughput: {       
            ReadCapacityUnits: 10, 
            WriteCapacityUnits: 10
        }
    };

    dynamodb.createTable(params, function(err, data) {
        if (err) {
            callback(new Error("Unable to create table. Error JSON: "+ JSON.stringify(err, null, 2)));
            
        } else {
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
