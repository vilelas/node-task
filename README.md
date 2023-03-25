# NodeTask
NodeTask é uma aplicação de lista de tarefas construída com Node.js e Express.js. Ele fornece endpoints HTTP RESTful para operações CRUD (criar, ler, atualizar e excluir) em tarefas, além de autenticação de usuário usando JWT (JSON Web Token).

## Endpoints
A seguir está a lista de todos os endpoints suportados pela API do NodeTask:

| Método | URL | Autenticação | Admin | Descrição |
| -------- | -------- | -------- | -------- | -------- |
POST	|``{{URL}}/api/auth/register``|	Não	|Não	|Cadastra um novo usuário no sistema
POST	|``{{URL}}/api/auth/login``	|Não	|Não|	Realiza o login do usuário e retorna um token
POST	|``{{URL}}/api/tarefa/new``|	Sim|	Não|	Cadastra uma nova tarefa
DELETE	|``{{URL}}/api/usuarios/:id``|	Sim|	Sim|	Exclui um usuário específico
DELETE	|```{{URL}}/api/tarefa/:id```|	Sim|	Sim	|Exclui uma tarefa específica
PUT	|``{{URL}}/api/usuarios/:id``	|Sim	|Sim	|Atualiza os dados de um usuário específico
PUT	|``{{URL}}/api/tarefas/:id``	|Sim	|Sim	|Atualiza uma tarefa específica
GET	|``{{URL}}/api/tarefa/:status``|	Sim	|Sim|	Retorna todas as tarefas com um determinado status
GET	|``{{URL}}/api/usuarios/buscar/:id``|	Sim|	Sim|	Retorna informações de um usuário específico **(admin apenas)**
GET	|``{{URL}}/api/usuarios/all``	|Sim|	Sim	|Retorna todos os usuáios cadastrados no sistema **(admin apenas)**
GET	|``{{URL}}/api/tarefa/info/admin``	|Sim	|Sim	|Retorna o total de tarefas criadas no sistema, o total de tarefas concluídas e o total de tarefas pendente no sistema **(admin apenas)**
OPTIONS	|``{{URL}}/api/auth/login``	|Não	|Não	| Retorna as opções disponíveis para a URL, permitindo que o cliente saiba quais os métodos HTTP são permitidos
PATCH	|``{{URL}}/api/usuarios/:id``	|Sim	|Sim	| Atualiza parcialmente as informações de um usuário específico
HEAD	|``{{URL}}/api/auth/login``	|Não	|Não	| Retorna apenas os cabeçalhos de uma solicitação, sem retornar o corpo da resposta.

A referência ``{{URL}}`` presente na tabela acima se refere ao URL do servidor local utilizado como exemplo, que é ``http://localhost:5000``. Essa referência é usada para simplificar a escrita dos exemplos e torná-los mais claros e concisos.

## Autenticação
Para autenticar na API, o usuário deve enviar um token JWT válido no cabeçalho de autorização da solicitação com o formato Bearer `token`. O token pode ser obtido fazendo login no sistema.

## Instalação e execução
Para executar a aplicação, siga os seguintes passos:

1. Clone o repositório do GitHub:

```
git clone https://github.com/vilelas/Node-Task.git
```

2. Instale as dependências do projeto:

```
cd Node-Task
npm i
```

3. Crie um arquivo .env na raiz do projeto e configure as seguintes variáveis de ambiente:

```
MONGO_URL=mongodb://[username]:[password]@[host]:[port]/[database]
SECRET=sua_hash_aleatoria
```

4. Inicie o servidor:

```
npm start
```

## Licença
Este projeto está licenciado sob a Licença MIT.
