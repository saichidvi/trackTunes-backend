const express = require("express");
const {
  createArtist,
  getArtistsSongsCount,
} = require("../controllers/artist.controller.js");

const router = express.Router();

router.post("/addArtist", createArtist);
router.get("/getArtistsSongsCount", getArtistsSongsCount);

module.exports = router;
