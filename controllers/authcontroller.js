const db = require("../config/db");

const bcrypt = require("bcryptjs");

const generateToken = require("../utils/generateToken");



// REGISTER
exports.registerUser = async (req, res) => {

  try {

    console.log("REGISTER API HIT");



    const { name, email, password } = req.body;



    // CHECK USER
    const [result] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );



    // USER EXISTS
    if (result.length > 0) {

      return res.json({
        message: "User Already Exists",
      });

    }



    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);



    // INSERT USER
    const [data] = await db.query(
      "INSERT INTO users(name,email,password) VALUES(?,?,?)",
      [name, email, hashedPassword]
    );



    // SUCCESS
    res.json({
      message: "Register Success",
      token: generateToken(data.insertId),
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message,
    });

  }

};





// LOGIN
exports.loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;



    // FIND USER
    const [result] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );



    // USER NOT FOUND
    if (result.length === 0) {

      return res.json({
        message: "User Not Found",
      });

    }



    const user = result[0];



    // CHECK PASSWORD
    const matchPassword = await bcrypt.compare(
      password,
      user.password
    );



    // INVALID PASSWORD
    if (!matchPassword) {

      return res.json({
        message: "Invalid Password",
      });

    }



    // SUCCESS
    res.json({
      message: "Login Success",
      token: generateToken(user.id),
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message,
    });

  }

};





// PROFILE
exports.getProfile = (req, res) => {

  res.json(req.user);

};
///// profile update//////

exports.updateProfile = async (req, res) => {

  try {

    const userId = req.user.id;

    const { name, password } = req.body;



    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);



    // UPDATE USER
    await db.query(
      "UPDATE users SET name=?, password=? WHERE id=?",
      [
        name,
        hashedPassword,
        userId
      ]
    );



    // GET UPDATED USER
    const [user] = await db.query(
      "SELECT id,name,email FROM users WHERE id=?",
      [userId]
    );



    // RESPONSE
    res.json({
      message: "Profile Updated",
      user: user[0]
    });

  } catch (error) {

    console.log(error);



    res.status(500).json({
      error: error.message,
    });

  }

};