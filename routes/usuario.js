const {
  verificarToken,
  verificarTokenEAutorizar,
  verificarTokenAdmin,
} = require("./verificarToken");

const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");
const router = require("express").Router();


// Atualizar dados parciais

router.patch("/:id", verificarTokenEAutorizar, async (req, res) => {
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

// Atualizar dados

router.put("/:id", verificarTokenEAutorizar, async (req, res) => {
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

router.delete("/:id", verificarTokenEAutorizar, async (req, res) => {
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
    res.status(500).json({ mensagem: `${erro}` });
  }
});

// Listar todos os usuários

router.get("/all", verificarTokenAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const usuarios = query
      ? await Usuario.find().sort({ _id: -1 }).limit(1)
      : await Usuario.find();
    res.status(200).json({ usuarios });
  } catch (erro) {
    res.status(500).json({ mensagem: `${erro}` });
  }
});

// Rota OPTIONS retorna as opções disponíveis para o recurso

router.options('/:id', (req, res) => {
  res.header('Allow', 'GET,PUT,PATCH,DELETE,OPTIONS').send();
});



module.exports = router;
