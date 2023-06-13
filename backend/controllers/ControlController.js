const Control = require("../models/Control");

// helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class ControlController {
  // creating input or output
  static async control(req, res) {
    const {
      bloodQuantity,
      bloodType,
      additionalInfo,
      reason,
      bloodDestiny,
      receiver,
    } = req.body;

    //validations
    if (!bloodQuantity) {
      return res
        .status(422)
        .json({ message: "A quantidade de bolsas é obrigatória!" });
    }

    if (!reason) {
      return res.status(422).json({ message: "O motivo é obrigatório!" });
    }

    if (!bloodDestiny) {
      return res
        .status(422)
        .json({ message: "O destino da doação é obrigatório!" });
    }

    if (!receiver) {
      return res.status(422).json({ message: "O destinatário é obrigatório!" });
    }

    if (!bloodType) {
      return res
        .status(422)
        .json({ message: "A tipagem sanguínea é obrigatória!" });
    }

    //get a user
    const token = getToken(req);
    const user = await getUserByToken(token);

    // creating input or output
    const control = new Control({
      bloodQuantity: bloodQuantity,
      bloodType: bloodType,
      additionalInfo: additionalInfo,
      reason: reason,
      bloodDestiny: bloodDestiny,
      receiver: receiver,
      user: {
        _id: user._id,
        name: user.name,
      },
    });

    try {
      const newControl = await control.save();
      return res.status(201).json({
        message: "Registro de controle adionado com sucesso!",
        control: newControl,
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  //get all registered controls
  static async getAll(req, res) {
    const controls = await Control.find().sort("-createdAt");

    return res.status(200).json({
      controls,
    });
  }

  //get a specific control
  static async getControlById(req, res) {
    const id = req.params.id;

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      return res.status(422).json({ message: "ID inválido!" });
    }

    // check if control exists
    const control = await Control.findOne({ _id: id });

    if (!control) {
      return res.status(404).json({ message: "Registro não encontrada!" });
    }

    return res.status(200).json({ control: control });
  }

  //remove a control
  static async removeControlById(req, res) {
    const id = req.params.id;

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      return res.status(422).json({ message: "ID inválido!" });
    }

    // check if control exists
    const control = await Control.findOne({ _id: id });

    if (!control) {
      return res.status(404).json({ message: "Registro não encontrada!" });
    }

    await Control.findByIdAndRemove(id);

    return res.status(200).json({ message: "Registro removido com sucesso!" });
  }

  //updating a control
  static async updateControl(req, res) {
    const id = req.params.id;

    const {
      bloodQuantity,
      bloodType,
      additionalInfo,
      reason,
      bloodDestiny,
      receiver,
    } = req.body;

    const updatedData = {};

    // check if control exists
    const control = await Control.findOne({ _id: id });

    if (!control) {
      return res.status(404).json({ message: "Registro não encontrado!" });
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

    updatedData.additionalInfo = additionalInfo;

    if (!reason) {
      return res.status(422).json({ message: "O motivo é obrigatório!" });
    } else {
      updatedData.reason = reason;
    }

    if (!bloodDestiny) {
      return res
        .status(422)
        .json({ message: "O destino da doação é obrigatório!" });
    } else {
      updatedData.bloodDestiny = bloodDestiny;
    }

    if (!receiver) {
      return res.status(422).json({ message: "O destinatário é obrigatório!" });
    } else {
      updatedData.receiver = receiver;
    }

    try {
      await Control.findByIdAndUpdate(id, updatedData);

      return res
        .status(200)
        .json({ message: "Registro atualizado com sucesso!" });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
};
