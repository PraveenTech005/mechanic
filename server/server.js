const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db/db");
const userRoutes = require("./routes/userRoute");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/user", userRoutes);

app.listen(3000, () => console.log("Server Running on 3000"));
