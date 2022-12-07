const track = require("../models/track");

const router = require("express").Router();

//Test route to establish Postman
router.get("/getAll", async (req, res) => {
  return res.json("getting all tracks");
});

//Pull desired track based on given id
router.get("/getOne/:id", async (req, res) => {
  const filter = { track_id: req.params.id };

  const data = await track.findOne(filter);

  if (data) {
    return res.json(data);
  } else {
    return res.json("Could not be Found");
  }
});

//Search tracks based on user input field
router.get("/search/:id", async (req, res) => {
  const searchRequest = req.params.id;
  const filterTrack = { track_title: { $regex: searchRequest, $options: "i" } }; //Search by titles or album
  const filterAlbum = { album_title: { $regex: searchRequest, $options: "i" } };
  const filterArtist = {
    artist_name: { $regex: searchRequest, $options: "i" },
  };
  const filterGenre = {
    track_genres: { $regex: searchRequest, $options: "i" },
  };

  const select = {
    track_id: 1,
    album_title: 1,
    artist_name: 1, //Pull desired fields from collection
    track_duration: 1,
    track_title: 1,
    _id: 0,
  };

  const data = await track
    .find(
      { $or: [filterTrack, filterAlbum, filterArtist, filterGenre] },
      select
    )
    .limit(8);
  //$or chooses between both search params
  //limit contains number of results to desired n variable (8 results in this scenario)

  if (data) {
    return res.json(data);
  } else {
    return res.json("Could not be Found");
  }
});

module.exports = router;
