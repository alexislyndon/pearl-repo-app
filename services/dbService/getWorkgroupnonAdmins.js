const db = require("./db");

//get all users except those that are already admin of workgroup
module.exports = async (id) => {
  const result = await db.query(
    `with x as (
      select u.unnest, CONCAT(c.firstname, ' ', c.lastname) from
        (select distinct(unnest(u_ids)) from workgroups 
        UNION
        select distinct(unnest(u_ids)) from appadmingroups) u
        JOIN colleagues c
        on u.unnest = c.col_id
        order by concat
      )
      
      SELECT xx.unnest as id, xx.concat as label
          FROM x xx
          WHERE xx.unnest not in 
          (
            select unnest(u_ids) 
            from workgroups where 
            wg_id = $1
          )`,
    [id]
  );
  const data = result.rows;

  return data;
};
