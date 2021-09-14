const db = require("./db");

//fetch all colleagues
module.exports = async (colID) => {
  const result = await db.query(
    `SELECT col.col_id id, col.firstname, col.lastname, col.jobtitle, col.startdate, col.enddate, col.personalemail, col.workemail, col.wg_id as wgid, wg.name as wgname
    FROM colleagues col
    LEFT JOIN workgroups wg
    ON wg.wg_id = col.wg_id
    WHERE col_id = $1`,
    [colID]
  );
  const data = result.rows[0];

  data.startdate.getTimezoneOffset();
  data.startdate.getTimezoneOffset();

  return data;
};
