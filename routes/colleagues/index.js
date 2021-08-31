const fetchColleague = require("../../services/dbService/fetchColleague");
const insertColleague = require("../../services/dbService/insertColleague");

const express = require("express");
const route = express.Router();

route

  .get("/new", (req, res) => {
    res.render("colleagues/new");
  })

  .get("/:id", async (req, res) => {
    const { id } = req.params;
    const data = await fetchColleague(id);
    res.render("colleagues/view", data);
  })

  .post("/", async (req, res) => {
    const result = await insertColleague(req.body);
    res.send(result);
  });

module.exports = route;
