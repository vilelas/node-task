const app = require("./app");
const connect = require("./bdConnection");

const chalk = require("chalk");

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

connect();

app.listen(5000, () => {
  console.log(chalk.bgBlue("O servidor está rodando!"));
});
