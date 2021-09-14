const getColleague = require("../../services/dbService/getColleague");
const upsertColleague = require("../../services/dbService/upsertColleague");
const deleteColleague = require("../../services/dbService/deleteColleague");
const fetchColleagues = require("../../services/dbService/fetchColleagues");
const fetchWorkgroups = require("../../services/dbService/fetchWorkgroups");

const express = require("express");
const route = express.Router();

route

  .get("/", async (req, res) => {
    const data = await fetchColleagues();

    res.render("colleagues/index", { colleagues: data });
  })

  .get("/new", async (req, res) => {
    // const user
    const data = await fetchWorkgroups();
    res.render("colleagues/new", {workgroups: data});
  })

  .get("/all", async (req, res) => {
    const data = await fetchWorkgroups();
    res.render("colleagues/new", {workgroups: data});
  })

  .get("/:id", async (req, res) => {
    const { id } = req.params;
    const data = await getColleague(id);
    const wgdata = await fetchWorkgroups();
    res.render("colleagues/view", {c: data, wg:wgdata});
  })

  .post("/", async (req, res) => {
    const result = await upsertColleague(req.body);
    res.send(result);
  })

  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    const result = await deleteColleague(id);
    res.send({ result });
  });

 module.exports = route;
