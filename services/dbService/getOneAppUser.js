const db = require("./db");

//fetch all colleagues
module.exports = async (id) => {
  const result = await db.query(
    `
    
select xyz.userr, xyz.u_name, json_agg(
    json_build_object(
        'a_id', xyz.a_id,
        'a_name', xyz.a_name
    )
  ) userapps 
  from
  
   (
  select 
   abc.userr, CONCAT(c.firstname, ' ', c.lastname) as u_name, abc.a_id, abc.a_name
  
  from
  (
  select unnest(u_ids) as userr, a.a_id, a.appname as a_name from appadmingroups aag 
  join apps a
  on a.a_id = aag.a_id 
      
      order by userr
      
  ) abc
  
  join colleagues c
  on c.col_id = abc.userr
  where abc.userr = $1
  GROUP BY abc.userr, u_name, abc.a_id, abc.a_name
  order by abc.userr
   ) xyz 
   GROUP BY xyz.userr, xyz.u_name
      `,
    [id]
  );
  const data = result.rows[0];

  return data;
};
