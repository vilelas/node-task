const app = require("./app");
const connect = require("./bdConnection");

const chalk = require("chalk");

connect();

app.listen(5000, () => {
  console.log(chalk.bgBlue("O servidor está rodando!"));
});
