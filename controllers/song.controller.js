const Song = require("../models/song.model.js");
const Artist = require("../models/artist.model.js");
const errorHandler = require("../utils/error.js");

const createSong = async (req, res, next) => {
  try {
    const { songName, artistName } = req.body;
    console.log(songName, artistName);
    const artist = await Artist.findOne({ name: artistName });
    if (!artist) {
      next(errorHandler(404, "Artist is not found with the given name."));
      return;
    }
    const newSong = new Song({ name: songName, artist: artistName });
    await newSong.save();
    res.status(200).json({
      success: true,
      message: "Song is created with the given details.",
    });
  } catch (err) {
    next(err);
  }
};

const getAllSongs = async (req, res, next) => {
  try {
    const allSongs = await Song.find();
    res.status(200).json(allSongs);
  } catch (err) {
    next(err);
  }
};

module.exports = { createSong, getAllSongs };
