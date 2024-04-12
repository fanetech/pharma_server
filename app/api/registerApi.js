module.exports = {
    registerOrdersToApp: function (app){
        app.use("/api/auth", require("../modules/auth/auth.router"));
    }
}