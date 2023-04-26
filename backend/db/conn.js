require("dotenv").config();

const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@tcc.b7d5uac.mongodb.net/?retryWrites=true&w=majority`
  );
  console.log("Conectado ao mongo Atlas!");
}

main().catch((err) => console.log(err));

module.exports = mongoose;
