const jwt = require("jsonwebtoken");

const verificarToken = (req, res, proximo) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (erro, usuario) => {
      if (erro) res.status(403).json({ mensagem: "Token inválido" });
      req.usuario = usuario;
      proximo();
    });
  } else {
    return res.status(401).json({ mensagem: "Você não está autenticado" });
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

module.exports = { verificarToken, verificarTokenEAutorizar, verificarTokenAdmin };
