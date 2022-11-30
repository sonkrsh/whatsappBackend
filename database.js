import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "Learn_MERN",
  })
  .promise();

const [result] = await pool.query("SELECT * from notes");
console.log(result);
