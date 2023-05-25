const {
  verificarToken,
  verificarTokenEAutorizar,
  verificarTokenAdmin,
  verificarTokenETarefaDoUsuario,
} = require("../middlewares/verificarToken");

const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");
const router = require("express").Router();

// Atualizar dados

router.put("/atualizar/:id", verificarTokenEAutorizar, async (req, res) => {
  if (req.body.senha) {
    const salt = await bcrypt.genSalt(20);
    req.body.senha = await bcrypt.hash(req.body.senha, salt);
  }

  try {
    const atualizacaoUsuario = await Usuario.findByIdAndUpdate(
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

// Excluir usuário

router.delete("/excluir/:id", verificarTokenEAutorizar, async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensagem: "Usuário excluído com sucesso" });
  } catch (erro) {
    res.status(500).json({ mensagem: `${erro}` });
  }
});

// Buscar usuário

router.get("/buscar/:id", verificarTokenAdmin, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    const { senha, ...info } = usuario._doc;
    res.status(200).json({ info });
  } catch (erro) {
    res.status(404).json({ mensagem: `Usuário não encontrado` });
  }
});

// Listar todos os usuários

router.get("/admin/usuarios", verificarTokenAdmin, async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json({ usuarios });
  } catch (erro) {
    res.status(500).json({ mensagem: `${erro}` });
  }
});

module.exports = router;
