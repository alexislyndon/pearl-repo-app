const getAppUsers = require("../../services/dbService/a/getAppUsers");
const getOneAppUser = require("../../services/dbService/getOneAppUser");
const express = require("express");
const route = express.Router();

route

  .get("/", async (req, res) => {
    const data = await getAppUsers();

    res.render("users/index", { users: data });
  })

  .get("/:id", async (req, res) => {
    const { id } = req.params;
    const data = await getOneAppUser(id);
    res.render("users/view", data);
  });

module.exports = route;
