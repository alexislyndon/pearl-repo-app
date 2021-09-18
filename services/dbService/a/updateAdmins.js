const db = require("../db");

module.exports = async ({ id, users }) => {
  const result = await db.query(
    `
    UPDATE appadmingroups
    SET u_ids = $2
    WHERE a_id = $1
    `,
    [id || null, users || null]
  );
  const data = result.rows;

  return data;
};