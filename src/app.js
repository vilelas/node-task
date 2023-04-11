const express = require("express");
const app = express();

const authRoute = require("./routes/auth");
const usuariosRoute = require("./routes/usuario");
const tarefaRoute = require("./routes/tarefa");

app.use(express.json());

// Rotas
app.use("/api/auth", authRoute);
app.use("/api/usuarios", usuariosRoute);
app.use("/api/tarefas", tarefaRoute);

module.exports = app;
