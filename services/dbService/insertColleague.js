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
  }

  return { col_id: id };
};
