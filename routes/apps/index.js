const getALLApps = require("../../services/dbService/getALLApps");
const getOneApp = require("../../services/dbService/getOneApp");

const express = require("express");
const route = express.Router();

route

  .get("/", async (req, res) => {
    const data = await getALLApps();

    res.render("apps/index", { apps: data });
  })

  .get("/:id", async (req, res) => {
    const { id } = req.params;
    const data = await getOneApp(id);
    res.render("apps/view", { data });
  });

module.exports = route;
