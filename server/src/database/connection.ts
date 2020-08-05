// Conexão com o banco de dados
import knex from 'knex';
import path from 'path'; // módulo que vem dentro do node que ajuda a lidar com os caminhos dos arquivos do projeto

const db = knex({
    client: 'sqlite3', // knex aceita varios tipos de db, tenho q definir o q vou usar
    connection: { // Defino onde está o arquivo do meu db
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true,
})

// __dirname retorno o diretório atual, que nesse caso é a pasta "database"
// Depois vai ser criado um arquivo 'database.sqlite' dentro do diretório
// "useNullAsDefault: true" é obrigatório no sqlite, pois ele não sabe o valor padrão que deve jogar
// caso exista algum campo não preenchido

export default db;