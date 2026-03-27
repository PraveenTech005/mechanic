const express = require("express");
const { Hello, register, login } = require("../controllers/userController");
const router = express.Router();
const {protect} = require("../middlewares/authMiddleware")

router.get("/hello", async (req, res) => {
  try {
    res.json({ message: "Hello" });
  } catch (error) {
    console.error("Error: ", error.message);
  }
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;
