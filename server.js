const net = require("net"); // Módulo para criar o servidor de sockets
const { stringify: csvStringify } = require("csv-stringify/sync"); // Para converter dados em CSV
const xml2js = require("xml2js"); // Para converter dados em XML
const yaml = require("js-yaml"); // Para converter dados em YAML
const toml = require("@iarna/toml"); // Para converter dados em TOML
const fs = require("fs"); // Para manipulação de arquivos
const path = require("path"); // Para manipulação de caminhos de arquivos

// Cria um servidor de sockets
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const message = data.toString(); // Converte os dados recebidos em string
    const format = message.substring(0, message.indexOf(":")); // Extrai o formato
    const content = message.substring(message.indexOf(":") + 1).trim(); // Extrai o conteúdo

    let parsedData;
    try {
      parsedData = JSON.parse(content); // Tenta analisar o conteúdo como JSON
    } catch (err) {
      console.log("Erro ao parsear JSON:", err); // Loga erro de parsing
      return socket.write("Erro: JSON inválido."); // Resposta de erro ao cliente
    }

    let response;
    switch (format) {
      case "CSV":
        const csvData = csvStringify([parsedData], { header: true }); // Converte dados para CSV
        fs.writeFileSync(
          path.join(__dirname, "files", `${format}.csv`),
          csvData,
          "utf8"
        ); // Salva em arquivo CSV
        response = `Dados salvos como CSV:\n${csvData}`; // Resposta ao cliente
        break;
      case "JSON":
        fs.writeFileSync(
          path.join(__dirname, "files", `${format}.json`),
          JSON.stringify(parsedData, null, 2),
          "utf8"
        ); // Salva em JSON
        response = `Dados salvos como JSON:\n${JSON.stringify(
          parsedData,
          null,
          2
        )}`; // Resposta ao cliente
        break;
      case "XML":
        const xmlData = new xml2js.Builder().buildObject(parsedData); // Converte dados para XML
        fs.writeFileSync(
          path.join(__dirname, "files", `${format}.xml`),
          xmlData,
          "utf8"
        ); // Salva em XML
        response = `Dados salvos como XML:\n${xmlData}`; // Resposta ao cliente
        break;
      case "YAML":
        const yamlData = yaml.dump(parsedData); // Converte dados para YAML
        fs.writeFileSync(
          path.join(__dirname, "files", `${format}.yml`),
          yamlData,
          "utf8"
        ); // Salva em YAML
        response = `Dados salvos como YAML:\n${yamlData}`; // Resposta ao cliente
        break;
      case "TOML":
        const tomlData = toml.stringify(parsedData); // Converte dados para TOML
        fs.writeFileSync(
          path.join(__dirname, "files", `${format}.toml`),
          tomlData,
          "utf8"
        ); // Salva em TOML
        response = `Dados salvos como TOML:\n${tomlData}`; // Resposta ao cliente
        break;
      default:
        return socket.write("Erro: Formato não suportado."); // Resposta de erro se formato não suportado
    }

    socket.write(response); // Envia a resposta ao cliente
  });
});

// Inicia o servidor na porta 8080
server.listen(8080, () => {
  console.log("Servidor rodando na porta 8080");
});
