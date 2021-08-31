const db = require("./db");

//fetch all colleagues
module.exports = async () => {
  const result = await db.query("SELECT col_id id, firstname, lastname, jobtitle, startdate, enddate, personalemail FROM colleagues");
  const data = result.rows;

  return data;
};
