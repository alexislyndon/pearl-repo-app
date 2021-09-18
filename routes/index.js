const express = require("express");
const router = express.Router();
const getAdmins = require("../services/dbService/getUsers");
const ejs = require("ejs");

router.get("/", async (req, res) => {
  const data = await getAdmins();
  const  {user}  = req.headers;
  if(user) {
    //
  }
  const tabs = [{ menu: "col" }, { menu: "wg" }];
  // res.render("partials/tabs", { tt: tabs });
  res.render("index", { admins: data, tabs: null });
});

module.exports = router;
