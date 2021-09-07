const db = require("./db");

//fetch all colleagues
module.exports = async (wgid) => {
  const result = await db.query(
    `SELECT * FROM colleagues WHERE wg_id = $1`,
    [wgid]
  );
  const data = result.rows[0];

  return data;
};
