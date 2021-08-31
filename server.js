const express = require("express");
const app = express();

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ urlencoded: true, extended: true }));

// app.use("/", require("./routes/index"));
// app.use("/colleagues", require("./routes/colleagues/index"));

app.listen(3000, async () => {
  console.log(`server running as http://localhost:3000`);
});
require("./services/routeService")(app);
