const getALLApps = require("../../services/dbService/a/getALLApps");
const getOneApp = require("../../services/dbService/a/getOneApp");
const updateAdmins = require("../../services/dbService/a/updateAdmins");
const getAppnonAdmins = require("../../services/dbService/a/getAppnonAdmins");

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
    res.render("apps/view", data);
  })

  .get("/:id/notadmins", async (req, res) => {
    const { id } = req.params;
    const data = await getAppnonAdmins(id);
    res.send(data);
  })

  .post("/", async (req, res) => {
    const result = await updateAdmins(req.body);
    res.status(200).send("OKK");
  });

module.exports = route;
