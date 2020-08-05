// Vou armazenar apenas a informação de se o usuário tentou entrar em contato
// com o professor
import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();

        table.integer('user_id') 
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE') 
            .onDelete('CASCADE');
        
        table.timestamp('created_at') // Vou armazenar quando a conexão foi criada
            .defaultTo(knex.raw('CURRENT_TIMESTAMP')) //O padrão vai ser a função CURRENT_TIMESTAMP, que retorna o horário
            // no momento que a conexão foi criada
            .notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('connections');
}
