# Sistema de Troca de Mensagens via Sockets

Este projeto é um sistema simples de troca de mensagens entre um cliente e um servidor utilizando sockets no Node.js. O servidor processa dados enviados pelo cliente em diferentes formatos (CSV, JSON, XML, YAML e TOML) e os salva em arquivos.

## Estrutura do Projeto

- server.js # Código do servidor
- client.js # Código do cliente
- files/ # Pasta onde os arquivos gerados são armazenados
- node_modules/ # Dependências do Node.js
- .gitignore # Arquivo para ignorar pastas desnecessárias no Git
- README.md # Documentação do projeto

## Tecnologias Utilizadas

- Node.js
- Módulo `net` para sockets
- Módulos para conversão de dados: `csv-stringify`, `xml2js`, `js-yaml`, `@iarna/toml`

## Como Rodar o Projeto

### Dentro da pasta raiz do projeto:

### 1. Instalar as Dependências

Primeiro, você precisa instalar as dependências do projeto. Na raiz do projeto, execute:

```bash
npm install
```

### 2. Iniciar o servidor

```bash
node server.js
```

### 3. Iniciar o cliente

```bash
node client.js
```
