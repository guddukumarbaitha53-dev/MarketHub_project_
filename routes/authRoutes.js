
const router = require("express").Router();

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} = require("../controllers/authcontroller");

const protect = require("../middleware/authMiddleware");



router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, getProfile);

router.put("/profile/update", protect, updateProfile);



module.exports = router;