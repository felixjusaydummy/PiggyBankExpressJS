const dateFormat = require('dateformat');
// const stringFormat = "dddd, mmmm dS, yyyy, h:MM:ss TT"
const stringFormat = "yyyy-mm-dd hh:MM:ss "

exports.info = (title, message) => {
    const dt = dateFormat(Date.now(), stringFormat);
    console.log("["+ dt+" INFO ] "+ title + ", "+ message);
}

exports.error = (title, message, err) => {
    const dt = dateFormat(Date.now(), stringFormat);
    console.error("["+ dt+" ERROR ] "+title+": "+ message+ " . Error JSON:"+ JSON.stringify(err, null, 2));
}