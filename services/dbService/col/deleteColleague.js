const db = require("../db");

//fetch all colleagues
module.exports = async (colID) => {
  const result = await db.query(
    `DELETE FROM colleagues WHERE col_id = $1`,
    [colID]
  );
  const data = result.rowCount;

  return data;
};
