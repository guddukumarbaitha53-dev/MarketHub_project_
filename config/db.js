// const mysql = require("mysql2");

// const pool = mysql.createPool({
 // host: "82.25.121.115",
 // user: "u205680228_guddu",
 // password: "MarketHub@Guddu62",
  // database: "u205680228_MarketHub",

//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });


// pool.getConnection((err, connection) => {
//   if (err) {
//     console.log("❌ DB Pool Error:", err);
//     return;
//   }
//   console.log("✅ Database Connected (Pool)");

//   connection.release(); 
// });

// module.exports = pool;


const mysql = require("mysql2");

require("dotenv").config();



const connection = mysql.createConnection({

  host: process.env.DB_HOST,

  user: process.env.DB_USER,

  password: process.env.DB_PASSWORD,

  database: process.env.DB_NAME,

});



connection.connect((error) => {

  if (error) {

    console.log(error);

  } else {

    console.log("MySQL Connected");

  }

});



module.exports = connection;