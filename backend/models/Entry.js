const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Entry = mongoose.model(
  "Entry",
  new Schema(
    {
      bloodQuantity: {
        type: Number,
        required: true,
      },
      donorName: {
        type: String,
        required: true,
      },
      bloodType: {
        type: String,
        required: true,
      },
      entryType: {
        type: String,
        required: true,
      },
      entryNotes: {
        type: String,
      },
      destination: {
        type: String,
        required: true,
      },
      user: {
        type: Object,
      },
    },
    { timestamps: true }
  )
);

module.exports = Entry;
