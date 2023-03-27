const {
  verificarToken,
  verificarTokenEAutorizar,
  verificarTokenAdmin,
  verificarTokenETarefaDoUsuario,
} = require("../middlewares/verificarToken");

const Tarefa = require("../models/Tarefa");
const router = require("express").Router();

// Cadastrar nova tarefa

router.post("/new", verificarToken, async (req, res) => {
  const novaTarefa = new Tarefa(req.body);

  try {
    await novaTarefa.save();
    res.status(201).json({ mensagem: "Tarefa cadastrada com sucesso" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Atualizar tarefa

router.put("/:id", verificarTokenETarefaDoUsuario, async (req, res) => {
  try {
    await Tarefa.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ mensagem: "Dados atualizados com sucesso" });
  } catch (erro) {
    res.status(500).json({ mensagem: `${erro}` });
  }
});

// Excluir

router.delete("/:id", verificarTokenETarefaDoUsuario, async (req, res) => {
  try {
    await Tarefa.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensagem: "Tarefa excluída com sucesso" });
  } catch (erro) {
    res.status(500).json({ mensagem: `${erro}` });
  }
});

router.get("/info/admin", verificarTokenAdmin, async (req, res) => {
  try {
    const totalTarefas = await Tarefa.countDocuments();
    const tarefasFinalizadas = await Tarefa.countDocuments({
      finalizado: true,
    });
    const tarefasNaoFinalizadas = totalTarefas - tarefasFinalizadas;
    res.status(200).json({
      totalTarefas,
      tarefasFinalizadas,
      tarefasNaoFinalizadas,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar tarefas no banco de dados.",
      error: error.message,
    });
  }
});

module.exports = router;
