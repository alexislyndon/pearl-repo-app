const db = require("./db");

//fetch all colleagues
module.exports = async (colID) => {
  const result = await db.query(
    `SELECT col_id id, firstname, lastname, jobtitle, startdate, enddate, personalemail FROM colleagues WHERE col_id = $1`,
    [colID]
  );
  const data = result.rows[0];

  data.startdate.getTimezoneOffset();
  data.startdate.getTimezoneOffset();

  return data;
};
