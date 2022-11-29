const mongoose = require("mongoose");

//List Schema for input sanitization and Mongo Formatting
const listSchema = mongoose.Schema(
  {
    list_title: {
      type: String,
      required: true,
    },
    list_trackIDS: {
      type: Array,
    },
  },
  { timestamps: true }
);
listSchema.index({ list_title: "text" }); //Index to search lists by name (Index allows for reference through mongoose)

module.exports = mongoose.model("list", listSchema);
