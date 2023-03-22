const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usuariosRoute = require("./routes/usuario");
const tarefaRoute = require("./routes/tarefa");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Conectado com o banco de dados!");
  } catch (error) {
    console.log(error);
  }
};

connect();

app.use(express.json());

// Rotas
app.use("/api/auth", authRoute);
app.use("/api/usuarios", usuariosRoute);
app.use("/api/tarefa", tarefaRoute);

app.listen(5000, () => {
  console.log("O servidor está rodando!");
});
