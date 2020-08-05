import Knex from 'knex';

// Sempre tenho que ter os métodos up e down
export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => { //Criação da tabela
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('users'); //Deleto a tabela
}

// Método up: defino como quero fazer alterações que quero subir para o banco
// Método down: Caso dê algum problema, o que eu quero fazer para voltar