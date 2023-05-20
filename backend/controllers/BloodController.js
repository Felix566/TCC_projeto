const Blood = require("../models/Blood").default;

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
    // if (!donator) {
    //   return res
    //     .status(422)
    //     .json({ message: "O nome do doador é obrigatório!" });
    // }

    // if (!cpf) {
    //   return res.status(422).json({ message: "O CPF é obrigatório!" });
    // }

    // if (!phone) {
    //   return res.status(422).json({ message: "O telefone é obrigatório!" });
    // }

    // if (!bloodType) {
    //   return res
    //     .status(422)
    //     .json({ message: "A tipagem sanguínea é obrigatória!" });
    // }

    // get a user
    const token = getToken(req);
    const user = await getUserByToken(token);

    // create a bag blood
    const blood = new Blood({
      donator: donator,
      cpf: cpf,
      nasc: nasc,
      age: age,
      phone: phone,
      marital: marital,
      sex: sex,
      bloodVolume: bloodVolume,
      bloodType: bloodType,
      users: {
        _id: user._id,
        name: user.name,
      },
    });

    try {
      const newBlood = await blood.save();
      return res.status(201).json({
        message: "Bolsa sanguínea adicionada com sucesso!",
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

    // check if id is valid
    // if (!ObjectId.isValid(id)) {
    //   return res.status(422).json({ message: "ID inválido!" });
    // }

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

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      return res.status(422).json({ message: "ID inválido!" });
    }

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

    const updatedData = {};

    // check if blood exists
    const blood = await Blood.findOne({ _id: id });

    if (!blood) {
      return res.status(404).json({ message: "Bolsa não encontrada!" });
    }

    //validations
    if (!donator) {
      return res
        .status(422)
        .json({ message: "O nome do doador é obrigatório!" });
    } else {
      updatedData.donator = donator;
    }

    if (!cpf) {
      return res.status(422).json({ message: "O CPF é obrigatório!" });
    } else {
      updatedData.cpf = cpf;
    }

    updatedData.nasc = nasc;

    updatedData.age = age;

    if (!phone) {
      return res.status(422).json({ message: "O telefone é obrigatório!" });
    } else {
      updatedData.phone = phone;
    }

    updatedData.marital = marital;

    updatedData.sex = sex;

    updatedData.bloodVolume = bloodVolume;

    if (!bloodType) {
      return res
        .status(422)
        .json({ message: "A tipagem sanguínea é obrigatória!" });
    } else {
      updatedData.bloodType = bloodType;
    }

    await Blood.findByIdAndUpdate(id, updatedData);

    return res.status(200).json({ message: "Bolsa atualizada com sucesso!" });
  }
};
