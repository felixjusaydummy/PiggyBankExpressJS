
var config = require("../../../../config");
var log = require("../../../utilities/consoleutil");
var AWS = require("aws-sdk");

AWS.config.update({
  region: config.DB_REGION,
  endpoint: config.DB_ENDPOINT
});
var dynamodb = new AWS.DynamoDB();
var tableName = "Accounts"
var params = {
    TableName : tableName
};
dynamodb.deleteTable(params, function(err, data) {
    if (err) {
        log.info("DELETE TABLE", "Unable to delete table. Error JSON:"+JSON.stringify(err, null, 2) )
    } else {
        log.info("DELETE TABLE Successful", "Deleted table. Table description JSON:"+JSON.stringify(data, null, 2));
    }
});