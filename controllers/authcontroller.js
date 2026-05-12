const db = require("../config/db");

const bcrypt = require("bcryptjs");

const generateToken = require("../utils/generateToken");



// REGISTER
exports.registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;



    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (error, result) => {

        if (result.length > 0) {

          return res.json({
            message: "User Already Exists",
          });

        }



        const hashedPassword = await bcrypt.hash(password, 10);



        db.query(
          "INSERT INTO users(name,email,password) VALUES(?,?,?)",
          [name, email, hashedPassword],
          (error, data) => {

            if (error) {
              return res.status(500).json(error);
            }



            res.json({
              message: "Register Success",
              token: generateToken(data.insertId),
            });

          }
        );

      }
    );

  } catch (error) {

    res.status(500).json(error);

  }

};




// LOGIN
exports.loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;



    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (error, result) => {

        if (result.length === 0) {

          return res.json({
            message: "User Not Found",
          });

        }



        const user = result[0];



        const matchPassword = await bcrypt.compare(
          password,
          user.password
        );



        if (!matchPassword) {

          return res.json({
            message: "Invalid Password",
          });

        }



        res.json({
          message: "Login Success",
          token: generateToken(user.id),
          user,
        });

      }
    );

  } catch (error) {

    res.status(500).json(error);

  }

};




// PROFILE
exports.getProfile = (req, res) => {

  res.json(req.user);

};