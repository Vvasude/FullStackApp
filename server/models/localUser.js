const mongoose = require("mongoose");

const localUserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    id: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("localUser", localUserSchema);
