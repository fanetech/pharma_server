const bole = require("bole");
const path = require("path");
const registerAPIs = require("./api/registerApi")
const fs = require("fs");
const utils = require("./others/utils");
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const app = express();
const config = require('./configs/pharma_config');
const cors = require("cors");

/**
 * Logging configuration 
 * */
// var logDirectory = path.join(utils.appRootDataDir(), "logs") || path.join(utils.serverRootDir(__filename), "/", process.env.LOGS_DIR || "/logs/");
// bole.output(
// 	{ level: "info", objectMode: true, stream: fs.createWriteStream(path.join(logDirectory, "pharma.log"), { flags: "a" }) },
// 	{ level: "warn", objectMode: true, stream: fs.createWriteStream(path.join(logDirectory, "pharma.err"), { flags: "a" }) }
// );
const boleLogger = bole("server");


// create a rotating write stream

// app.use(morgan('combined', { stream: logDirectory }))

// compress all responses
// app.use(compression({
// 	// body size before considering compression, the default is 1 kB
// 	threshold: 0
// }));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//CORS
var corsOptions = {
	origin: function (origin, callback) {
		if (config.CORS_ALLOWED_ORIGIN.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			boleLogger.warn("Not allowed by CORS");
			callback(new Error("Not allowed by CORS"));
		}
	},
	methods: config.CORS_ALLOWED_METHODS,
	allowedHeaders: config.CORS_ALLOWED_HEADERS,
	credentials: config.CORS_ALLOWED_CREDENTIALS
};

app.options("*", cors(corsOptions));
app.use("*", cors(corsOptions));

//Register models'API
registerAPIs.registerOrdersToApp(app);

// Error handlers
app.use(require("./modules/notFound/notFound.controller"));

// Export the instance
module.exports = {
	app: app,
	boleLogger: boleLogger
};