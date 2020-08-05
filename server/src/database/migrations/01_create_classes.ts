import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();
        
        // Criando relacionamento entre tabela um professor da tabela "users" e as matérias
        // da tabela classe
        table.integer('user_id') // inteiro user_id
            .notNullable()  // obrigatório
            .references('id') // que faz referência ao id
            .inTable('users') // da tabela "users"
            .onUpdate('CASCADE') // Se eu alterar qualquer informação ta tabela "users", automaticamente
            // as informações relacionadas na tabela "classes" também serão alteradas.
            .onDelete('CASCADE'); // Se o user for deletado da tabela "users", todas as informações
            // relacionadas que se encontram na tabela "classes" também serão deletadas
        
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('classes');
}
