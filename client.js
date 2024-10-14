const net = require("net"); // Módulo para criar o cliente de sockets
const readline = require("readline"); // Módulo para ler entrada do usuário via terminal

const rl = readline.createInterface({
  input: process.stdin, // Entrada do terminal
  output: process.stdout, // Saída do terminal
});

const formats = ["CSV", "JSON", "XML", "YAML", "TOML"]; // Formatos suportados

// Solicita dados ao usuário
const askForData = (format, callback) => {
  rl.question(`Digite o Nome: `, (nome) => {
    rl.question(`Digite o CPF: `, (cpf) => {
      rl.question(`Digite a Idade: `, (idade) => {
        rl.question(`Digite a Mensagem: `, (mensagem) => {
          const data = {
            // Cria objeto de dados
            Nome: nome,
            CPF: cpf,
            idade: parseInt(idade, 10), // Converte idade para número
            mensagem: mensagem,
          };
          callback(format, JSON.stringify(data)); // Chama callback com formato e dados
        });
      });
    });
  });
};

// Envia dados ao servidor
const sendData = (format, jsonData) => {
  const client = net.createConnection({ port: 8080 }, () => {
    client.write(`${format}:${jsonData}`); // Envia dados ao servidor
  });

  client.on("data", (data) => {
    console.log(data.toString()); // Exibe resposta do servidor
    client.end(); // Encerra a conexão
  });

  client.on("end", () => {
    console.log("Desconectado do servidor"); // Mensagem de desconexão
    if (formats.length > 0) {
      // Verifica se ainda há formatos para processar
      const nextFormat = formats.shift(); // Obtém próximo formato
      askForData(nextFormat, sendData); // Solicita dados para o próximo formato
    } else {
      rl.close(); // Fecha a interface de leitura
    }
  });
};

// Inicia o processo solicitando dados do primeiro formato
const firstFormat = formats.shift();
askForData(firstFormat, sendData);
