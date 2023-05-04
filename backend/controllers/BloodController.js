const Blood = require("../models/Blood");

// helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class BloodController {
  // create a bag blood
  static async create(req, res) {
    const {
      donator,
      cpf,
      nasc,
      age,
      phone,
      marital,
      sex,
      bloodVolume,
      bloodType,
    } = req.body;

    //validations
    if (!donator) {
      res.send(422).json({ message: "O nome do doador é obrigatório!" });
      return;
    }

    if (!cpf) {
      res.send(422).json({ message: "O CPF é obrigatório!" });
      return;
    }

    if (!phone) {
      res.send(422).json({ message: "O telefone é obrigatório!" });
      return;
    }

    if (!bloodType) {
      res.send(422).json({ message: "A tipagem sanguínea é obrigatória!" });
      return;
    }

    // get a user
    const token = getToken(req);
    const user = await getUserByToken(token);

    // create a bag blood
    const blood = new Blood({
      donator,
      cpf,
      nasc,
      age,
      phone,
      marital,
      sex,
      bloodVolume,
      bloodType,
      users: {
        _id: user._id,
        name: user.name,
      },
    });

    try {
      const newBlood = await blood.save();
      res
        .status(201)
        .json({ message: "Bolsa sanguínea adicionada com sucesso!", newBlood });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getAll(req, res) {
    const bloods = await Blood.find().sort("-createdAt");

    res.status(200).json({
      bloods: bloods,
    });
  }

  static async getBloodById(req, res) {
    const id = req.params.id;

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    // check if blood exists
    const blood = Blood.findOne({ _id: id });

    if (!blood) {
      response.status(404).json({ message: "Bolsa não encontrada!" });
    }

    res.status(200).json({ blood: blood });
  }

  static async removeBloodById(req, res) {
    const id = req.params.id;

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    // check if blood exists
    const blood = Blood.findOne({ _id: id });

    if (!blood) {
      res.status(404).json({ message: "Bolsa não encontrada!" });
      return;
    }

    await Blood.findByIdAndRemove(id);

    res.status(200).json({ message: "Bolsa removida com sucesso!" });
  }
};
