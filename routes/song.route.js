const express = require("express");
const {
  createSong,
  getAllSongs,
} = require("../controllers/song.controller.js");

const router = express.Router();

router.post("/addSong", createSong);
router.get("/getAllSongs", getAllSongs);

module.exports = router;
