const Exit = require("../models/Exit");

// helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class ExitController {
  // creating exit
  static async createOutput(req, res) {
    const {
      bloodQuantity,
      bloodType,
      recipientName,
      exitType,
      exitNotes,
      destination,
    } = req.body;

    //validations
    if (!bloodQuantity) {
      return res
        .status(422)
        .json({ message: "A quantidade de bolsas é obrigatória!" });
    }

    if (!exitType) {
      return res.status(422).json({ message: "O motivo é obrigatório!" });
    }

    if (!destination) {
      return res
        .status(422)
        .json({ message: "O destino da saída é obrigatório!" });
    }

    if (!recipientName) {
      return res
        .status(422)
        .json({ message: "O nome do receptor é obrigatório!" });
    }

    if (!bloodType) {
      return res
        .status(422)
        .json({ message: "A tipagem sanguínea é obrigatória!" });
    }

    //get a user
    const token = getToken(req);
    const user = await getUserByToken(token);

    // creating a exit
    const exit = new Exit({
      bloodQuantity: bloodQuantity,
      recipientName: recipientName,
      bloodType: bloodType,
      exitType: exitType,
      exitNotes: exitNotes,
      destination: destination,
      user: {
        _id: user._id,
        name: user.name,
      },
    });

    try {
      const newExit = await exit.save();
      return res.status(201).json({
        message: "Registro de saída criada com sucesso!",
        exit: newExit,
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  // get all exit
  static async getExits(req, res) {
    const exits = await Exit.find().sort("-createdAt");

    return res.status(200).json({
      exits,
    });
  }

  // get a especific exit
  static async getExitById(req, res) {
    const id = req.params.id;

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      return res.status(422).json({ message: "ID inválido!" });
    }

    // check if exit exists
    const exit = await Exit.findOne({ _id: id });

    if (!exit) {
      return res
        .status(404)
        .json({ message: "Registro de Saída não encontrado!" });
    }

    return res.status(200).json({ exit: exit });
  }

  // remove a exit
  static async removeExiteById(req, res) {
    const id = req.params.id;

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      return res.status(422).json({ message: "ID inválido!" });
    }

    // check if exit exists
    const exit = await Exit.findOne({ _id: id });

    if (!exit) {
      return res
        .status(404)
        .json({ message: "Registro de Saída não encontrado!" });
    }

    await Exit.findByIdAndRemove(id);

    return res
      .status(200)
      .json({ message: "Registro de Saída removido com sucesso!" });
  }

  // updating a exit
  static async updateExit(req, res) {
    const id = req.params.id;

    const {
      bloodQuantity,
      bloodType,
      recipientName,
      exitType,
      exitNotes,
      destination,
    } = req.body;

    const updatedData = {};

    // check if exit exists
    const exit = await Exit.findOne({ _id: id });
    if (!exit) {
      return res
        .status(404)
        .json({ message: "Registro de Saída não encontrado!" });
    }

    //validations
    if (!bloodQuantity) {
      return res
        .status(422)
        .json({ message: "A quantidade de bolsas é obrigatória!" });
    } else {
      updatedData.bloodQuantity = bloodQuantity;
    }

    if (!bloodType) {
      return res
        .status(422)
        .json({ message: "O tipo sanguíneo é obrigatório!" });
    } else {
      updatedData.bloodType = bloodType;
    }

    if (!exitType) {
      return res.status(422).json({ message: "O motivo é obrigatório!" });
    } else {
      updatedData.exitType = exitType;
    }

    if (!destination) {
      return res
        .status(422)
        .json({ message: "O destino da Saída é obrigatório!" });
    } else {
      updatedData.destination = destination;
    }

    if (!recipientName) {
      return res
        .status(422)
        .json({ message: "O nome do receptor é obrigatório!" });
    } else {
      updatedData.recipientName = recipientName;
    }

    updatedData.exitNotes = exitNotes;

    try {
      await Exit.findByIdAndUpdate(id, updatedData);
      return res
        .status(200)
        .json({ message: "Registro de Saída atualizado com sucesso!" });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
};
