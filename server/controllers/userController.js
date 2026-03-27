const { generateToken } = require("../auth/Controller");
const { hashPassword, verifyPassword } = require("../config/hasher");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const user = req.body;

    if (!user || !user.name || !user.email || !user.password) {
      return res.status(400).json({ message: "Invalid Request" });
    }

    const hashedPassword = await hashPassword(user.password);

    const newUser = new User({
      name: user.name,
      email: user.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.json({ message: "Registered Successfully" });
  } catch (error) {
    const message =
      error.code === 11000 ? "User Already Registered" : "Something went wrong";
    console.error("Error:", error.message);
    res.status(500).json({ message: message });
  }
};

const login = async (req, res) => {
  try {
    const user = req.body;

    if (!user || !user.email || !user.password) {
      return res.status(400).json({ message: "Invalid Request" });
    }

    const savedUser = await User.findOne({ email: user.email });

    if (!savedUser) return res.status(404).json({ message: "User Not Found" });

    const isPassword = await verifyPassword(user.password, savedUser.password);

    if (!isPassword)
      return res.status(400).json({ message: "Invalid Password" });

    res.status(200).json({
      message: "Login Successfull",
      user: {
        name: savedUser.name,
        email: savedUser.email,
        token: generateToken(savedUser.email),
      },
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
