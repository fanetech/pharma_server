const mongoose = require('mongoose');
require("dotenv").config({ path: "./config/.env" });
// let conn
const url = "mongodb://0.0.0.0:27017"
// const url = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASWORD}@cluster0.fetcq4j.mongodb.net`
mongoose
	.connect(
`${url}/pharma`,
		{ useNewUrlParser: true, useUnifiedTopology: true },
	)
	.then((res) => {
		console.log('connected to mongoDB')
		// conn = res.connection
	} )
	.catch(err => console.log('failed to connected mongoDB : ', err));