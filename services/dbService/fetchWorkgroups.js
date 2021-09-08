const db = require("./db");

//fetch all workgroups
module.exports = async () => {
  const result = await db.query(
    `select  xx.wg_id, xx.wgname,   json_agg(json_build_object(
      'user', CONCAT(xx.firstname, ' ', xx.lastname),
          'uuid', xx.uids
      )) users from
  (select ff.wg_id, ff.wgname, ff.uids, col.firstname, col.lastname
  
      
      from
      (select w.wg_id, w.name wgname, unnest(w.u_ids) uids from workgroups w WHERE datetimedisabled is null) ff
      LEFT JOIN colleagues col
      ON ff.uids = col.col_id
      GROUP BY ff.wg_id, ff.wgname, ff.uids, col.firstname, col.lastname) xx
    group by xx.wg_id, xx.wgname`
  );
  const data = result.rows;
  return data;
};