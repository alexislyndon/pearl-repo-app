const db = require("./db");

//get one App
module.exports = async (id) => {
  const result = await db.query(
    `
    select y.appname, y.a_id, json_agg(json_build_object(
        'user', CONCAT(y.firstname, ' ', y.lastname),
            'uuid', y.col_id
        )) users from
    (select xxx.appname, xxx.a_id, col.col_id, col.firstname, col.lastname from 
    (select a.appname, a.a_id, unnest(aag.u_ids) appadmins
    from apps a
    left join appadmingroups aag
    on a.a_id = aag.a_id
    where a.a_id = $1
    ) xxx
    left join colleagues col
    on col.col_id = xxx.appadmins)  y
    GROUP BY y.appname, y.a_id
    `,
    [id]
  );
  const data = result.rows[0];

  return data;
};
