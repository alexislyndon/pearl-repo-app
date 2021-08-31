const express = require("express");
const router = express.Router();
const fetchColleagues = require("../services/dbService/fetchColleagues");

router.get("/", async (req, res) => {
  const data = await fetchColleagues();

  res.render("index", { colleagues: data });
});

module.exports = router;
