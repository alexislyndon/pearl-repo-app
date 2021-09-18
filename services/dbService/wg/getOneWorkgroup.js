const db = require("../db");

//fetch all colleagues
module.exports = async (wgid) => {
  const result = await db.query(
    `WITH y AS (
      SELECT w.wg_id,
      json_agg(
          json_build_object(
            'name', CONCAT(y.firstname, ' ', y.lastname),
            'uuid', y.col_id
          )
        ) members
      FROM colleagues Y
      inner join workgroups w
      on w.wg_id = y.wg_id
      WHERE y.wg_id = $1
      GROUP by w.wg_id
    )
    select  z.wg_id id, z.wgname as name, z.admins, yy.members
    from
    (select  xx.wg_id, xx.wgname,   json_agg(json_build_object(
          'name', CONCAT(xx.firstname, ' ', xx.lastname),
              'uuid', xx.uids
          )) admins
        from
      (select ff.wg_id, ff.wgname, ff.uids, col.firstname, col.lastname, col.col_id
      
          
          from
          (select w.wg_id, w.name wgname, unnest(w.u_ids) uids from workgroups w WHERE w.wg_id = $1) ff
          LEFT JOIN colleagues col
          ON ff.uids = col.col_id
          GROUP BY ff.wg_id, ff.wgname, ff.uids, col.firstname, col.lastname, col.col_id) xx
        group by xx.wg_id, xx.wgname) z
      left join y yy
      on yy.wg_id = z.wg_id`,
    [wgid]
  );
  const data = result.rows[0];

  return data;
};
