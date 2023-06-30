const Blood = require("../models/Blood");

// helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class BloodController {
  // create a bag blood
  static async create(req, res) {
    const {
      inventoryType,
      bloodType,
      quantity,
      phone,
      notes,
      entryType,
      donator,
      age,
      marital,
      sex,
      donorName,
      exitType,
      recipientName,
      destination,
    } = req.body;

    //validations
    if (!inventoryType) {
      return res
        .status(422)
        .json({ message: "O tipo de registro é obrigatório!" });
    }

    if (!quantity) {
      return res.status(422).json({ message: "A quantidade é obrigatória!" });
    }

    if (!bloodType) {
      return res
        .status(422)
        .json({ message: "A tipagem sanguínea é obrigatória!" });
    }

    // get a user
    const token = getToken(req);
    const user = await getUserByToken(token);

    // create a bag blood
    const blood = new Blood({
      ...req.body,
      user: {
        _id: user._id,
        name: user.name,
      },
    });

    try {
      const newBlood = await blood.save();
      return res.status(201).json({
        message: "Registro adicionado com sucesso!",
        blood: newBlood,
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  //get all registered blood bags
  static async getAll(req, res) {
    const bloods = await Blood.find().sort("-createdAt");

    return res.status(200).json({
      bloods,
    });
  }

  //get a specific blood
  static async getBloodById(req, res) {
    const id = req.params.id;

    // check if blood exists
    const blood = await Blood.findOne({ _id: id });

    if (!blood) {
      return res.status(404).json({ message: "Bolsa não encontrada!" });
    }

    return res.status(200).json({ blood: blood });
  }

  //remove a blood
  static async removeBloodById(req, res) {
    const id = req.params.id;

    // check if blood exists
    const blood = await Blood.findOne({ _id: id });

    if (!blood) {
      return res.status(404).json({ message: "Bolsa não encontrada!" });
    }

    await Blood.findByIdAndRemove(id);

    return res.status(200).json({ message: "Bolsa removida com sucesso!" });
  }

  static async updateBlood(req, res) {
    const id = req.params.id;

    const {
      inventoryType,
      bloodType,
      quantity,
      phone,
      notes,
      entryType,
      donator,
      age,
      marital,
      sex,
      donorName,
      exitType,
      recipientName,
      destination,
    } = req.body;

    const updatedData = {
      ...req.body,
    };

    // check if blood exists
    const blood = await Blood.findOne({ _id: id });

    if (!blood) {
      return res.status(404).json({ message: "Bolsa não encontrada!" });
    }

    await Blood.findByIdAndUpdate(id, updatedData);

    return res.status(200).json({ message: "Bolsa atualizada com sucesso!" });
  }
};
