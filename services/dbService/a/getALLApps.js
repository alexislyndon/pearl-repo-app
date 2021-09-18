const db = require("../db");

//fetch all colleagues
module.exports = async () => {
  const result = await db.query(`
  
  select y.appname, y.a_id, json_agg(json_build_object(
    'user', CONCAT(y.firstname, ' ', y.lastname),
        'uuid', y.col_id
    )) users from
  (select xxx.appname, xxx.a_id, col.col_id, col.firstname, col.lastname from 
  (select a.appname, a.a_id, unnest(aag.u_ids) appadmins
  from apps a
  left join appadmingroups aag
  on a.a_id = aag.a_id) xxx
  left join colleagues col
  on col.col_id = xxx.appadmins)  y
  GROUP BY y.appname, y.a_id

  `);
  const data = result.rows;

  return data;
};
