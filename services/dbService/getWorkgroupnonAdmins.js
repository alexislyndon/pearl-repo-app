const db = require("./db");

//fetch all colleagues
module.exports = async (id) => {
  const result = await db.query(
    `SELECT 
    FROM workgroups wg
    LEFT JOIN colleagues col
    ON wg.wg_id = col.wg_id
    WHERE col_id NOT IN ()`,
    [id]
  );
  const data = result.rows[0];

  data.startdate.getTimezoneOffset();
  data.startdate.getTimezoneOffset();

  return data;
};
