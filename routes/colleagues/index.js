const fetchColleague = require("../../services/dbService/fetchColleague");
const upsertColleague = require("../../services/dbService/upsertColleague");
const deleteColleague = require("../../services/dbService/deleteColleague");

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
    const result = await upsertColleague(req.body);
    res.send(result);
  })

  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    const result = await deleteColleague(id);
    res.send({result});
  });

module.exports = route;
