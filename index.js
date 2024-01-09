const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

app.use(cors());
const songRouter = require("./routes/song.route.js");
const artistRouter = require("./routes/artist.route.js");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Data base connected.");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hey you are on our server",
  });
});

app.use("/api/song", songRouter);
app.use("/api/artist", artistRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Errror";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Your server is listening on the port 3000");
});
