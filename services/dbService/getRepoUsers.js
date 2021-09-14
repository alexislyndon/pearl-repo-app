const db = require("./db");

//fetch all app admins
module.exports = async () => {
  const result = await db.query(`
  select u.unnest, CONCAT(c.firstname, ' ', c.lastname) from
  (select distinct(unnest(u_ids)) from workgroups 
  UNION
  select distinct(unnest(u_ids)) from appadmingroups) u
  JOIN colleagues c
  on u.unnest = c.col_id
  order by concat
  `);
  const data = result.rows;

  return data;
};
