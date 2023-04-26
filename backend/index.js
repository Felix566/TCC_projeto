require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors({ credentials: true, origin: `${process.env.ORIGIN}` }));

app.use(express.static("public"));

// Routes
const UserRoutes = require("./routes/UserRoutes");
app.use("/users", UserRoutes);

app.listen(process.env.API_PORT, () => {
  console.log(`API rodando na porta ${process.env.API_PORT}`);
});
