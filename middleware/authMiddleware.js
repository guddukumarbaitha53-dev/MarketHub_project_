// const jwt = require("jsonwebtoken");

// const SECRET_KEY = "mysecretkey";

// const verifyToken = (req, res, next) => {
//   const token = req.headers["authorization"];

//   if (!token) {
//     return res.json({ status: false, message: "No token provided" });
//   }

//   jwt.verify(token, SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.json({ status: false, message: "Invalid token" });
//     }

//     req.userId = decoded.id;
//     next();
//   });
// };

// module.exports = verifyToken;

const jwt = require("jsonwebtoken");

const db = require("../config/db");



const protect = (req, res, next) => {

  try {

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      token = req.headers.authorization.split(" ")[1];



      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );



      db.query(
        "SELECT * FROM users WHERE id = ?",
        [decoded.id],
        (error, result) => {

          if (result.length === 0) {

            return res.status(401).json({
              message: "User Not Found",
            });

          }



          req.user = result[0];

          next();

        }
      );

    } else {

      res.status(401).json({
        message: "No Token",
      });

    }

  } catch (error) {

    res.status(401).json({
      message: "Token Failed",
    });

  }

};

module.exports = protect;