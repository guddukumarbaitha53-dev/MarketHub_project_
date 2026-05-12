// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const SECRET_KEY = "mysecretkey";

// ///  REGISTER
// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  
//   db.query(sql, [name, email, hashedPassword], (err, result) => {
//     if (err) {
//       return res.json({ status: false, message: err.message });
//     }
//     res.json({ status: true, message: "User Registered" });
//   });
// });

// ///// LOGIN
// router.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   const sql = "SELECT * FROM users WHERE email = ?";
  
//   db.query(sql, [email], async (err, result) => {
//     if (err) return res.json({ status: false });

//     if (result.length === 0) {
//       return res.json({ status: false, message: "User not found" });
//     }

//     const user = result[0];

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.json({ status: false, message: "Wrong password" });
//     }

//     const token = jwt.sign({ id: user.id }, SECRET_KEY, {
//       expiresIn: "7d"
//     });

//     res.json({
//       status: true,
//       token: token,
//       user: user
//     });
//   });
// });

// module.exports = router;


const router = require("express").Router();

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authcontroller");

const protect = require("../middleware/authMiddleware");



router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, getProfile);



module.exports = router;