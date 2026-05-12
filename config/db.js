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

const connection = mysql.createConnection({
   host: "82.25.121.115",
  user: "u205680228_guddu",
  password: "MarketHub@Guddu62",
  database: "u205680228_MarketHub",
});

connection.connect((error) => {

  if (error) {
    console.log(error);
  } else {
    console.log("MySQL Connected");
  }

});

module.exports = connection;