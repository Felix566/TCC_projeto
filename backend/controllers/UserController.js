const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// helpers
const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const getUserById = require("../helpers/get-user-by-token");
const { imageUpload } = require("../helpers/image-upload");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, phone, password, confirmpassword } = req.body;

    //validations
    if (!name) {
      return res.status(422).json({ message: "O nome é obrigatório!" });
    }

    if (!email) {
      return res.status(422).json({ message: "O email é obrigatório!" });
    }

    if (!phone) {
      return res.status(422).json({ message: "O telefone é obrigatório!" });
    }

    if (!password) {
      return res.status(422).json({ message: "A senha é obrigatória!" });
    }

    if (!confirmpassword) {
      return res
        .status(422)
        .json({ message: "A confirmação de senha é obrigatória!" });
    }

    if (password !== confirmpassword) {
      return res.status(422).json({
        message: "A senha e a confirmação de senha precisam ser iguais!",
      });
    }

    // check if user exists
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ message: "Email já cadastrado!" });
    }

    // create a password
    const salt = await bcrypt.genSalt(12);
    const passwordhash = await bcrypt.hash(password, salt);

    // create a user
    const user = new User({
      name: name,
      email: email,
      phone: phone,
      password: passwordhash,
    });

    try {
      const newUser = await user.save();

      await createUserToken(newUser, req, res);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getAll(req, res) {
    const users = await User.find().sort("-createdAt");

    return res.status(200).json({
      users: users,
    });
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ message: "O email é obrigatório!" });
    }

    if (!password) {
      return res.status(422).json({ message: "A senha é obrigatória!" });
    }

    // check if user exists
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(422).json({
        message: "Não há usuário cadastrado com esse email!",
      });
    }

    //check if password match with db password
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({
        message: "Senha incorreta!!",
      });
    }

    await createUserToken(user, req, res);
  }

  static async checkUser(req, res) {
    let currentUser;

    console.log(req.headers.authorization);

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, "mysecret");

      currentUser = await User.findById(decoded.id);

      currentUser.password = undefined;
    } else {
      currentUser = null;
    }

    return res.status(200).send(currentUser);
  }

  static async getUserById(req, res) {
    const id = req.params.id;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(422).json({
        message: "Usuário não encontrado!",
      });
    }

    return res.status(200).json({ user });
  }

  static async editUser(req, res) {
    const id = req.params.id;

    // check if user exists
    const token = getToken(req);
    const user = await getUserById(token);

    const { name, email, phone, password, confirmpassword } = req.body;

    let image = "";

    if (req.file) {
      image = req.file.filename;
    }

    //validations
    if (!name) {
      return res.status(422).json({ message: "O nome é obrigatório!" });
    }

    user.name = name;

    if (!email) {
      return res.status(422).json({ message: "O email é obrigatório!" });
    }

    // check if has already taken
    const userExists = await User.findOne({ email: email });

    if (user.email !== email && userExists) {
      return res.status(422).json({
        message: "Email já está em uso, tente outro!",
      });
    }

    user.email = email;

    if (image) {
      const imageName = req.file.filename;
      user.image = imageName;
    }

    if (!phone) {
      return res.status(422).json({ message: "O telefone é obrigatório!" });
    }

    user.phone = phone;

    if (password != confirmpassword) {
      return res.status(422).json({ message: "As senhas não conferem!" });
    } else if (password === confirmpassword && password != null) {
      // creating password
      const salt = await bcrypt.genSalt(12);
      const passwordhash = await bcrypt.hash(password, salt);

      user.password = passwordhash;
    }

    try {
      // returns user updated data
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      );

      return res.status(200).json({
        message: "Usuário atualizado com sucesso!",
        data: updatedUser,
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async deleteUser(req, res) {
    const id = req.params.id;

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      return res.status(422).json({ message: "ID inválido!" });
    }

    // check if user exists
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    await User.findByIdAndRemove(id);

    return res.status(200).json({ message: "Usuário removido com sucesso!" });
  }
};
