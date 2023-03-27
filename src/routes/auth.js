const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = require("express").Router();
const Usuario = require("../models/Usuario");

// Cadastro

router.post("/register", async (req, res) => {
  const { nome, email, senha, confirma_senha, admin } = req.body;

  if (!nome || !email || !senha || !admin || !confirma_senha) {
    return res.status(422).json({ mensagem: "Dados ausentes" });
  }

  if (senha !== confirma_senha) {
    return res.status(422).json({ mensagem: "As senhas não conferem" });
  }

  // checando se o usuário existe
  const existe = await Usuario.findOne({ email: email });
  if (existe) {
    return res.status(422).json({ mensagem: "O e-mail já está em uso" });
  }

  // criando a senha do usuário

  const salt = await bcrypt.genSalt(12);
  const senhahash = await bcrypt.hash(senha, salt);

  const novoUsuario = new Usuario({
    nome,
    email,
    senha: senhahash,
    admin,
  });

  try {
    await novoUsuario.save();
    res.status(201).json({ mensagem: "Usuário criado com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensagem: "Erro no servidor" });
  }
});

// Login

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  // Validação de dados

  if (!email || !senha) {
    return res.status(422).json({ mensagem: "Credenciais inválidas" });
  }

  // checando se o usuário existe
  const usuario = await Usuario.findOne({ email: email });
  if (!usuario) {
    return res.status(404).json({ mensagem: "usuário não encontrado" });
  }

  // checando a senha do usuário
  const checkSenha = await bcrypt.compare(senha, usuario.senha);

  if (!checkSenha) {
    return res.status(422).json({ mensagem: "senha inválida" });
  }

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: usuario._id,
        admin: usuario.admin,
      },
      secret,
      { expiresIn: "1d" }
    );

    const { senha, ...info } = usuario._doc;
    //res.status(200).json({ ...info, token });

    res
      .status(200)
      .json({ mensagem: "login efetuado com sucesso!", cod: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensagem: "Erro no servidor!" });
  }
});

// Rota OPTIONS retorna as opções disponíveis para o recurso

router.options("/login", (req, res) => {
  res.header("Allow", "POST,OPTIONS").send();
});

// middleware para manipulação de solicitações HEAD

router.head("/login", (req, res) => {
  // define os cabeçalhos de resposta HTTP
  res.set({
    "Allow": "POST,OPTIONS",
    "Content-Length": "0"
  });
  res.status(200).end();
});

module.exports = router;
