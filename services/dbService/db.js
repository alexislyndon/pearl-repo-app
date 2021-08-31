const { Pool } = require("pg");

const db = new Pool({
  user: "postgres",
  host: "localhost",
  port: "5432",
  password: "qwe123",
  database: "repository",
});
console.log("db connected");

async function testConnection() {
  const c = await db.connect(); // try to connect
  c.done(); // success, release connection
  console.log(c.client.serverVersion); // return server version
}

module.exports = db;
