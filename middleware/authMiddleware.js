

const jwt = require("jsonwebtoken");

const db = require("../config/db");



const protect = async (req, res, next) => {

  try {

    let token;



    // CHECK TOKEN
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      token = req.headers.authorization.split(" ")[1];



      // VERIFY TOKEN
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );



      // FIND USER
      const [result] = await db.query(
        "SELECT * FROM users WHERE id = ?",
        [decoded.id]
      );



      // USER NOT FOUND
      if (result.length === 0) {

        return res.status(401).json({
          message: "User Not Found",
        });

      }



      // SAVE USER
      req.user = result[0];



      next();

    } else {

      return res.status(401).json({
        message: "No Token",
      });

    }

  } catch (error) {

    console.log(error);



    return res.status(401).json({
      message: "Token Failed",
    });

  }

};



module.exports = protect;