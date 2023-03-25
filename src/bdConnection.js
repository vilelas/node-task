const dotenv = require("dotenv");
dotenv.config();
const chalk = require("chalk");
const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(chalk.bgGreen("Conectado com o banco de dados!"));
  } catch (error) {
    console.log(chalk.bgRed(error));
  }
};

module.exports = connect;
