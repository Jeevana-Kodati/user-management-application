const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const alienRouter = require("./routes/aliens");
dotenv.config();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URL).then(() => { console.log("Database connection successful") }).catch((err) => { console.log(err) });

app.use("/api/alien", authRouter);
app.use("/api/aliens", alienRouter);
app.listen(process.env.PORT || 5000, () => { console.log("Backend server is running ") })