const db = require("../db");
const { v4: uuid } = require("uuid");

module.exports = async ({
  firstname,
  lastname,
  jobtitle,
  startdate,
  enddate,
  personalemail,
  id,
  registrarid,
  workgroup,
}) => {
  if (!id) {
    id = uuid();
    date = new Date()

    const result = await db.query(
      `
        INSERT INTO colleagues (firstname,lastname,jobtitle,startdate, enddate, personalemail, col_id, registrar_id, wg_id, datetimesent)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, to_timestamp(${Date.now()/1000}))`,
      [
        firstname || null,
        lastname || null,
        jobtitle || null,
        startdate || null,
        enddate || null,
        personalemail || null,
        id || null,
        registrarid || "348c83c7-e92e-4116-b809-ca5665208fac",
        workgroup || null,
      ]
    );
  } else {
    const result = await db.query(
      `
        UPDATE colleagues SET firstname=$1, lastname=$2,jobtitle=$3,startdate=$4, enddate=$5, personalemail=$6
            WHERE  col_id=$7`,
      [
        firstname || null,
        lastname || null,
        jobtitle || null,
        startdate || null,
        enddate || null,
        personalemail || null,
        id || null,
      ]
    );
  }

  return (res = {
    firstname,
    lastname,
    jobtitle,
    startdate,
    enddate,
    personalemail,
    id,
  });
};
