const dotenv = require('dotenv');
dotenv.config();

module.exports = () =>{

	const secret = process.env.SECRET
	const database = {
		url: 'mongodb://localhost:27017/node-test'
	}
	
	return {database, secret}

};