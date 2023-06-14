const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Exit = mongoose.model(
  "Exit",
  new Schema(
    {
      bloodQuantity: {
        type: Number,
        required: true,
      },
      bloodType: {
        type: String,
        required: true,
      },
      recipientName: {
        type: String,
        required: true,
      },
      exitType: {
        type: String,
        required: true,
      },
      exitNotes: {
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

module.exports = Exit;
