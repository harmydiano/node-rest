const express = require("express") //for handling server requests
const consign = require("consign") //for autoloading the routes

//initialize the epress class
const app = express();

//setup consign to auto loud the routes
consign()
    .include('libs/middleware.js')
    .then('libs/config.js')
    .then('libs/db.js')
    .then('models')
    .then('controllers')
    .then('routes')
	.then('libs/boot.js')
    .into(app);