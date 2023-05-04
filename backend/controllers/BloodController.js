const Blood = require("../models/Blood");

module.exports = class BloodController {
  // create a bag blood
  static async create(req, res) {
    res.json({ message: "Deu certo!" });
  }
};
