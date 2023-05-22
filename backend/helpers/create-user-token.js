const jwt = require("jsonwebtoken");

const createUserToken = async (user, req, res) => {
  try {
    // create a token
    const token = jwt.sign(
      {
        name: user.name,
        id: user._id,
      },
      "mysecret"
    );

    // return token
    res.status(200).json({
      message: "Você está autenticado!",
      token: token,
      userId: user._id,
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar token" });
  }
};

module.exports = createUserToken;
