const db = require("./db");
const { v4: uuid } = require("uuid");

module.exports = async ({
  firstname,
  lastname,
  jobtitle,
  startdate,
  enddate,
  personalemail,
  id,
}) => {
  if (!id) {
    id = uuid();

    const result = await db.query(
      `
        INSERT INTO colleagues (firstname,lastname,jobtitle,startdate, enddate, personalemail, col_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
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

  return res = {
    firstname,
    lastname,
    jobtitle,
    startdate,
    enddate,
    personalemail,
    id,
  };
};
