module.exports = {
    registerOrdersToApp: function (app){
        app.use("/api/auth", require("../modules/auth/auth.router"));
        app.use("/api/user", require("../modules/user/user.router"));
        app.use("/api/pharmacy", require("../modules/pharmacy/pharmacy.router"));
    }
}