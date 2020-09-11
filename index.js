
var express = require('express')
var app = express();
var config = require('./config')
var cors = require('cors');
var bodyParser = require('body-parser');


var cookieParser = require('cookie-parser');
var session = require('express-session');
var multer = require('multer');
var upload = multer(); 



var PATH_CONTROLLER = "/src/controller"


//open gate for frontend
// app.use(express.static('public'));
// app.use(upload.array()); 

app.use(cookieParser())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'));
app.use(upload.array()); 
//all access
app.use(cors());

//session


//API
app.get('/', function(req, res){
    res.send("Hello KoalaHackers!zz");
})

var accountcontroller = require("."+PATH_CONTROLLER+"/accountcontroller.js");
app.use('/accounts', accountcontroller);


var temp_service_account = require("./src/tempservice/temp_service_accounts");
app.use('/temp', temp_service_account);

var temp_service_signin = require("./src/tempservice/temp_service_sign_in");
app.use('/temp', temp_service_signin);

var temp_service_purse = require("./src/tempservice/temp_service_purse");
app.use('/temp', temp_service_purse);

var temp_service_vault = require("./src/tempservice/temp_service_vault");
app.use('/temp', temp_service_vault);

var temp_service_vault = require("./src/tempservice/temp_service_bankaccount");
app.use('/temp', temp_service_vault);

console.log("PORT: "+ config.PORT)
app.listen(config.PORT);
