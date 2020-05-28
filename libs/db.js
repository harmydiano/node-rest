const mongoose = require("mongoose")

module.exports = (app) => {
    const url = app.libs.config.database.url
    mongoose.connect(url, {
        useNewUrlParser: true
    }).then(() => {
        console.log("Successfully connected to the database");    
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
    const db = mongoose
    return db
}