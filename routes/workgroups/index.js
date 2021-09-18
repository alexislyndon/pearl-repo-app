const fetchWorkgroups = require("../../services/dbService/wg/fetchWorkgroups");
const getOneWorkgroup = require("../../services/dbService/wg/getOneWorkgroup");
const getWorkgroupnonAdmins = require("../../services/dbService/wg/getWorkgroupnonAdmins");

const express = require("express");
const updateAdmins = require("../../services/dbService/wg/updateAdmins");
const route = express.Router();

route

  .get("/", async (req, res) => {
    const data = await fetchWorkgroups();
    res.render("workgroups/index", { workgroups: data });
  })

  .get("/:id", async (req, res) => {
    const { id } = req.params;
    const data = await getOneWorkgroup(id);
    res.render("workgroups/view", data);
  })

  .get("/:id/notadmins", async (req, res) => {
    const { id } = req.params;
    const data = await getWorkgroupnonAdmins(id);
    res.send(data);
  })

  .post("/", async (req, res) => {
    const result = await updateAdmins(req.body);
    res.status(200).send('OKK')
  });

module.exports = route;
