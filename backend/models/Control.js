const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Control = mongoose.model(
  "Control",
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
      additionalInfo: {
        type: String,
      },
      reason: {
        type: String,
        required: true,
      },
      bloodDestiny: {
        type: String,
        required: true,
      },
      receiver: {
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

module.exports = Control;
