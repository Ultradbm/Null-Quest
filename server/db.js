/** @format */

const Pool = require("pg").Pool;
require("dotenv").config({ path: "./.env" });
const user = process.env.USER;
const password = process.env.PASSWORD;

const pool = new Pool({
  user: user,
  password: password,
  host: "localhost",
  port: 5432,
  database: "perntodo",
});

module.exports = pool;
