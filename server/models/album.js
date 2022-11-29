const mongoose = require("mongoose");

//Album Schema for input sanitization and Mongo Formatting
const albumSchema = mongoose.Schema(
  {
    album_id: {
      type: String,
      required: true,
    },
    album_date_released: {
      type: String,
      required: true,
    },
    album_image_file: {
      type: String,
      required: true,
    },
    album_title: {
      type: String,
      required: true,
    },
    album_tracks: {
      type: String,
      required: true,
    },
    artist_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("album", albumSchema);
