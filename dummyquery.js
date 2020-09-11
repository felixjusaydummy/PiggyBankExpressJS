console.log("DUMMY QUERY")

//SETUP ACCOUNTS
var usermanager = require('./src/db_modules/manager/usermanager')


//TRY ADD DATA
//skip 1 id number
// var tosend = {
//     id: "6",
//     name: "juzy2",
//     username: "juzyusername2",
//     password: "juzypassword2"
// }

// accountmanager.createAccount(tosend, (err, data)=>{})

// DESCRIBE DATA
// accountmanager.getAccountSize((err, data)=>{
//     if(err){
//         console.log("DUMMY QUERY: ERROR");
//         console.log(err)
//     }else{
//         console.log("DUMMY QUERY: SUCCESS");
//         console.log(data)
//     }
// });


// accountmanager.getAllAccounts((err,data)=>{
//     if(err){
//         console.log("DUMMY QUERY: ERROR");
//         console.log(err);
//     }else{
//         console.log("DUMMY QUERY: SUCCESS");
//         console.log(data);
//     }
// })

// accountmanager.getAllAccounts();
// accountmanager.getAccount("zy");



// ===== SAMPLE FOR USER QUERIES ======== //

// var userlist = [
//     {
//         email: "john",
//         password: "john",
//         name: "john"
//     },{
//         email: "jc",
//         password: "jc",
//         name: "jc"
//     }
// ]

// userlist.forEach(element => {
//     console.log("---------------")
//     console.log("Element")
//     usermanager.createAccount(element, (err, data)=>{})
// });
// usermanager.getAllUsers();

usermanager.updateUser("john", "vvvvvv")
usermanager.getUser("john")
// usermanager.getUserByPassword("john", "john")


