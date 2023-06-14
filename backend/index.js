require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors({ credentials: true, origin: `${process.env.ORIGIN}` }));

app.use(express.static("public"));

// Routes
const UserRoutes = require("./routes/UserRoutes");
const BloodRoutes = require("./routes/BloodRoutes");
const EntryRoutes = require("./routes/EntryRoutes");
const ExitRoutes = require("./routes/ExitRoutes");
const ControlRoutes = require("./routes/ControlRoutes");

app.use("/users", UserRoutes);
app.use("/bloods", BloodRoutes);
app.use("/entries", EntryRoutes);
app.use("/exits", ExitRoutes);
app.use("/controls", ControlRoutes);

app.listen(process.env.API_PORT, () => {
  console.log(`API rodando na porta ${process.env.API_PORT}`);
});
