const fetchWorkgroups = require("../../services/dbService/fetchWorkgroups");
const getOneWorkgroup = require("../../services/dbService/getOneWorkgroup");

const express = require("express");
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
  });

module.exports = route;

