const db = require("./db");

//fetch all workgroups
module.exports = async () => {
  const result = await db.query(
    `select ff.wg_id, ff.wgname, ff.uids, col.firstname, col.lastname,
    json_agg(json_build_object(
    'user', CONCAT(col.firstname, ' ', col.lastname),
        'uuid', ff.uids
    )) users
    
    from
    (select w.wg_id, w.name wgname, unnest(w.u_ids) uids from workgroups w WHERE datetimedisabled is null) ff
    INNER JOIN colleagues col
    ON ff.uids = col.col_id
    GROUP BY ff.wg_id, ff.wgname, ff.uids, col.firstname, col.lastname`
  );
  const data = result.rows;
  return data;
};