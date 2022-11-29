const mongoose = require("mongoose");

//Artist Schema for input sanitization and Mongo Formatting
const artistSchema = mongoose.Schema(
  {
    artist_id: {
      type: String,
      required: true,
    },
    artist_bio: {
      type: String,
      required: false,
    },
    artist_image_file: {
      type: String,
      required: true,
    },
    artist_latitutde: {
      type: String,
      required: true,
    },
    artist_location: {
      type: String,
      required: true,
    },
    artist_longitude: {
      type: String,
      required: true,
    },
    artist_name: {
      type: String,
      required: true,
    },
    artist_website: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
artistSchema.index({ artist_name: "text" }); //Index to search artists by name (Index allows for reference through mongoose)

module.exports = mongoose.model("artist", artistSchema);
