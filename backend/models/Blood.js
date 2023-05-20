const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Blood = mongoose.model(
  "Blood",
  new Schema(
    {
      donator: {
        type: String,
        required: true,
      },
      cpf: {
        type: String,
        required: true,
        unique: true,
      },
      nasc: {
        type: Date,
      },
      age: {
        type: Number,
      },
      phone: {
        type: String,
        required: true,
      },
      marital: {
        type: String,
      },
      sex: {
        type: String,
      },
      bloodVolume: {
        type: String,
      },
      bloodType: {
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

module.exports = Blood;
