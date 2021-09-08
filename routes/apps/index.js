const getALLApps = require("../../services/dbService/getALLApps");

const express = require("express");
const route = express.Router();

route.get("/", async (req, res) => {
  const data = await getALLApps();

  res.render("apps/index", { apps: data });
});
