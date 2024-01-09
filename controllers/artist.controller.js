const Song = require("../models/song.model.js");
const Artist = require("../models/artist.model.js");

const createArtist = async (req, res, next) => {
  try {
    const { artistName } = req.body;
    const newArtist = new Artist({ name: artistName });
    await newArtist.save();
    res.status(200).json({
      success: true,
      message: "Artist is successfully created with this name.",
    });
  } catch (err) {
    next(err);
  }
};

const getArtistsSongsCount = async (req, res, next) => {
  try {
    const allSongs = await Song.find();
    const allArtists = await Artist.find();
    const artistsWithSongsCount = allArtists.map((artist) => {
      var cnt = 0;
      allSongs.forEach((song) => {
        if (song.artist == artist.name) {
          ++cnt;
        }
      });
      const { name } = artist.toObject();
      return { name, songsCount: cnt };
    });
    res.status(200).json(artistsWithSongsCount);
  } catch (err) {
    next(err);
  }
};

module.exports = { createArtist, getArtistsSongsCount };
