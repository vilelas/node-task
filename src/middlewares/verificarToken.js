const jwt = require("jsonwebtoken");
const Tarefa = require("../models/Tarefa");

const verificarToken = (req, res, proximo) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Acesso negado!" });

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    proximo();
  } catch (err) {
    res.status(400).json({ msg: "O Token é inválido!" });
  }
};

const verificarTokenEAutorizar = (req, res, proximo) => {
  verificarToken(req, res, () => {
    if (req.usuario.id === req.params.id || req.usuario.admin) {
      proximo();
    } else {
      res.status(403).json({
        mensagem: "Você não está autorizado para acessar essa página",
      });
    }
  });
};

const verificarTokenAdmin = (req, res, proximo) => {
  verificarToken(req, res, () => {
    if (req.usuario.admin) {
      proximo();
    } else {
      res.status(403).json({
        mensagem: "Você não está autorizado para acessar essa página",
      });
    }
  });
};

const verificarTokenETarefaDoUsuario = async (req, res, proximo) => {
  verificarToken(req, res, async () => {
    try {
      const tarefa = await Tarefa.findById(req.params.id);
      if (tarefa.usuarioId === req.usuario.id || req.usuario.admin) {
        proximo();
      } else {
        res.status(403).json({
          mensagem: "Você não está autorizado para acessar essa página",
        });
      }
    } catch (erro) {
      res.status(500).json({ mensagem: `${erro}` });
    }
  });
};

module.exports = {
  verificarToken,
  verificarTokenEAutorizar,
  verificarTokenAdmin,
  verificarTokenETarefaDoUsuario,
};
