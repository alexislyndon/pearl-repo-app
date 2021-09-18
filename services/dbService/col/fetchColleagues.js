const db = require("../db");

//fetch all colleagues
module.exports = async () => {
  const result = await db.query(`
  SELECT col.col_id id, col.firstname, col.lastname, col.jobtitle, col.startdate, col.enddate, col.personalemail, wg.name as wgname
  FROM colleagues col
  LEFT JOIN workgroups wg
  ON wg.wg_id = col.wg_id
  ORDER BY col.firstname ASC
  `);
  const data = result.rows;

  return data;
};
