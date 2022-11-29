const mongoose = require("mongoose");

//Genre Schema for input sanitization and Mongo Formatting
const genreSchema = mongoose.Schema(
  {
    genre_id: {
      type: String,
      required: true,
    },
    num_tracks: {
      type: String,
      required: true,
    },
    parent: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    top_level: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("genre", genreSchema);
