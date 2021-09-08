const db = require("./db");

//fetch all colleagues
module.exports = async () => {
  const result = await db.query("SELECT * FROM apps WHERE datetimedisables is null");
  const data = result.rows;

  return data;
};
