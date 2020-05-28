const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
	
module.exports = app => {
	const port = process.env.PORT || 3000;
	app.set("json spaces" , 2);
	app.set("port", port);
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	
}