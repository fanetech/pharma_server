require("dotenv").config({ path: ".env" });
require("./configs/db");
var app = require("./index").app;

const PORT = process.env.PORT ?? 5000;
const IP = process.env.IP ?? "localhost"

app.listen(PORT, (error) => {
  if (error) {
    throw new Error("Unable to listen for connections", error);
  }
  console.log('----------------------------------------------------------------------------------------------------------------------------------------')
  console.log("Express is listening on http://" + IP + ":" + PORT);
});
