import mysql2 from "mysql2";

const db = mysql2.createConnection({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database:process.env.DATABASE
//   database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("db connected successfully");
  }
});
export default db;
