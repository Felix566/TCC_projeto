const Entry = require("../models/Entry");

// helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class EntryController {
  // creating entrie
  static async createInput(req, res) {
    const {
      bloodQuantity,
      bloodType,
      donorName,
      entryType,
      entryNotes,
      destination,
    } = req.body;

    //validations
    if (!bloodQuantity) {
      return res
        .status(422)
        .json({ message: "A quantidade de bolsas é obrigatória!" });
    }

    if (!entryType) {
      return res.status(422).json({ message: "O motivo é obrigatório!" });
    }

    if (!destination) {
      return res
        .status(422)
        .json({ message: "O destino da doação é obrigatório!" });
    }

    if (!donorName) {
      return res
        .status(422)
        .json({ message: "O nome do doador é obrigatório!" });
    }

    if (!bloodType) {
      return res
        .status(422)
        .json({ message: "A tipagem sanguínea é obrigatória!" });
    }

    //get a user
    const token = getToken(req);
    const user = await getUserByToken(token);

    // creating a entrie
    const entry = new Entry({
      bloodQuantity: bloodQuantity,
      donorName: donorName,
      bloodType: bloodType,
      entryType: entryType,
      entryNotes: entryNotes,
      destination: destination,
      user: {
        _id: user._id,
        name: user.name,
      },
    });

    try {
      const newEntry = await entry.save();
      return res.status(201).json({
        message: "Registro de entrada criada com sucesso!",
        entry: newEntry,
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  // get all entries
  static async getEntries(req, res) {
    const entries = await Entry.find().sort("-createdAt");

    return res.status(200).json({
      entries,
    });
  }

  // get a especific entrie
  static async getEntrieById(req, res) {
    const id = req.params.id;

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      return res.status(422).json({ message: "ID inválido!" });
    }

    // check if entry exists
    const entry = await Entry.findOne({ _id: id });

    if (!entry) {
      return res
        .status(404)
        .json({ message: "Registro de Entrada não encontrado!" });
    }

    return res.status(200).json({ entry: entry });
  }

  // remove a entrie
  static async removeEntrieById(req, res) {
    const id = req.params.id;

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      return res.status(422).json({ message: "ID inválido!" });
    }

    // check if entry exists
    const entry = await Entry.findOne({ _id: id });

    if (!entry) {
      return res
        .status(404)
        .json({ message: "Registro de Entrada não encontrado!" });
    }

    await Entry.findByIdAndRemove(id);

    return res
      .status(200)
      .json({ message: "Registro de Entrada removido com sucesso!" });
  }

  // updating a entrie
  static async updateEntrie(req, res) {
    const id = req.params.id;

    const {
      bloodQuantity,
      bloodType,
      donorName,
      entryType,
      entryNotes,
      destination,
    } = req.body;

    const updatedData = {};

    // check if entry exists
    const entry = await Entry.findOne({ _id: id });
    if (!entry) {
      return res
        .status(404)
        .json({ message: "Registro de Entrada não encontrado!" });
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

    if (!donorName) {
      return res
        .status(422)
        .json({ message: "O nome do doador é obrigatório!" });
    } else {
      updatedData.donorName = donorName;
    }

    if (!destination) {
      return res
        .status(422)
        .json({ message: "O destino da Entrada é obrigatório!" });
    } else {
      updatedData.destination = destination;
    }

    if (!entryType) {
      return res.status(422).json({ message: "O motivo é obrigatório!" });
    } else {
      updatedData.entryType = entryType;
    }

    updatedData.entryNotes = entryNotes;

    try {
      await Entry.findByIdAndUpdate(id, updatedData);
      return res
        .status(200)
        .json({ message: "Registro de Entrada atualizado com sucesso!" });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
};
