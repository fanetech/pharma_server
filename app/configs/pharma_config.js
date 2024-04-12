const CLIENT_ORIGINS = () => {
	if (process.env.CLIENT_URL == undefined) {
		return ["http://localhost:4200"]
	}
	const urls = process.env.CLIENT_URL;
	return urls ? urls.split(';') : '';
};

module.exports = {
    CORS_ALLOWED_CREDENTIALS: true,
	CORS_ALLOWED_HEADERS: "Accept, Cache-Control, Content-Type, Expires, Origin, Pragma,  enctype, X-Requested-With, X-access-token,x-saas-customer-id",
	CORS_ALLOWED_METHODS: "PUT, GET, POST, DELETE, OPTIONS",
	CORS_ALLOWED_ORIGIN: CLIENT_ORIGINS(),
}