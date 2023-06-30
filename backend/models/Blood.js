const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Blood = mongoose.model(
  "Blood",
  new Schema(
    {
      inventoryType: {
        type: String,
        required: true,
      },
      bloodType: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      phone: {
        type: String,
      },
      notes: {
        type: String,
      },
      entryType: {
        type: String,
      },
      donator: {
        type: String,
      },
      age: {
        type: Number,
      },
      marital: {
        type: String,
      },
      sex: {
        type: String,
      },
      donorName: {
        type: String,
      },
      exitType: {
        type: String,
      },
      recipientName: {
        type: String,
      },
      destination: {
        type: String,
      },
      user: {
        type: Object,
      },
      // funcionario: {
      //   type: Schema.Types.ObjectId,
      //   ref: "User",
      // },
    },
    { timestamps: true }
  )
);

module.exports = Blood;
