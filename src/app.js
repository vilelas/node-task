const express = require("express");
const app = express();

const auth = require("./routes/auth");
const usuarios = require("./routes/usuario");
const tarefas = require("./routes/tarefa");

app.use(express.json());

// Rotas
app.use("/api/auth", auth);
app.use("/api/usuarios", usuarios);
app.use("/api/tarefas", tarefas);

module.exports = app;
