const mongoose = require("mongoose");

const esquemaTarefa = new mongoose.Schema(
  {
    usuarioId: { type: String, required: true },
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    finalizado: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tarefa", esquemaTarefa);
