const Blood = require("../models/Blood");

// helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class BloodController {
  // create a bag blood
  static async create(req, res) {
    const donator = req.body.donator;
    const cpf = req.body.cpf;
    const nasc = req.body.nasc;
    const age = req.body.age;
    const phone = req.body.phone;
    const marital = req.body.marital;
    const sex = req.body.sex;
    const bloodVolume = req.body.bloodVolume;
    const bloodType = req.body.bloodType;

    //validations
    if (!donator) {
      res.status(422).json({ message: "O nome do doador é obrigatório!" });
      return;
    }

    if (!cpf) {
      res.status(422).json({ message: "O CPF é obrigatório!" });
      return;
    }

    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório!" });
      return;
    }

    if (!bloodType) {
      res.status(422).json({ message: "A tipagem sanguínea é obrigatória!" });
      return;
    }

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
      res
        .status(201)
        .json({ message: "Bolsa sanguínea adicionada com sucesso!", newBlood });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  //get all registered blood bags
  static async getAll(req, res) {
    const bloods = await Blood.find().sort("-createdAt");

    res.status(200).json({
      bloods,
    });
  }

  //get a specific blood
  static async getBloodById(req, res) {
    const id = req.params.id;

    // check if id is valid
    // if (!ObjectId.isValid(id)) {
    //   res.status(422).json({ message: "ID inválido!" });
    //   return;
    // }

    // check if blood exists
    const blood = await Blood.findOne({ _id: id });

    if (!blood) {
      res.status(404).json({ message: "Bolsa não encontrada!" });
    }

    res.status(200).json({ blood: blood });
  }

  //remove a blood
  static async removeBloodById(req, res) {
    const id = req.params.id;

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    // check if blood exists
    const blood = await Blood.findOne({ _id: id });

    if (!blood) {
      res.status(404).json({ message: "Bolsa não encontrada!" });
      return;
    }

    await Blood.findByIdAndRemove(id);

    res.status(200).json({ message: "Bolsa removida com sucesso!" });
  }

  static async updateBlood(req, res) {
    const id = req.params.id;

    const donator = req.body.donator;
    const cpf = req.body.cpf;
    const nasc = req.body.nasc;
    const age = req.body.age;
    const phone = req.body.phone;
    const marital = req.body.marital;
    const sex = req.body.sex;
    const bloodVolume = req.body.bloodVolume;
    const bloodType = req.body.bloodType;

    const updatedData = {};

    // check if blood exists
    const blood = await Blood.findOne({ _id: id });

    if (!blood) {
      res.status(404).json({ message: "Bolsa não encontrada!" });
      return;
    }

    //validations
    if (!donator) {
      res.status(422).json({ message: "O nome do doador é obrigatório!" });
      return;
    } else {
      updatedData.donator = donator;
    }

    if (!cpf) {
      res.status(422).json({ message: "O CPF é obrigatório!" });
      return;
    } else {
      updatedData.cpf = cpf;
    }

    updatedData.nasc = nasc;

    updatedData.age = age;

    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório!" });
      return;
    } else {
      updatedData.phone = phone;
    }

    updatedData.marital = marital;

    updatedData.sex = sex;

    updatedData.bloodVolume = bloodVolume;

    if (!bloodType) {
      res.status(422).json({ message: "A tipagem sanguínea é obrigatória!" });
      return;
    } else {
      updatedData.bloodType = bloodType;
    }

    await Blood.findByIdAndUpdate(id, updatedData);

    res.status(200).json({ message: "Bolsa atualizada com sucesso!" });
  }
};
