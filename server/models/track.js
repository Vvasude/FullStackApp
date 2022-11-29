const mongoose = require("mongoose");

//Track Schema for input sanitization and Mongo Formatting
const trackSchema = mongoose.Schema(
  {
    track_id: {
      type: String,
      required: true,
    },
    album_id: {
      type: String,
      required: false,
    },
    album_title: {
      type: String,
      required: false,
    },
    artist_id: {
      type: String,
      required: true,
    },
    artist_name: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: false,
    },
    track_date_created: {
      type: String,
      required: false,
    },
    track_date_recorded: {
      type: String,
      required: false,
    },
    track_duration: {
      type: String,
      required: true,
    },
    track_genres: {
      type: String,
      required: false,
    },
    track_number: {
      type: String,
      required: false,
    },
    track_title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
trackSchema.index({
  track_title: "text",
  album_title: "text",
  artist_name: "text",
}); //Index to search tracks by titles, albums, and artists (Index allows for reference through mongoose)

module.exports = mongoose.model("track", trackSchema);
