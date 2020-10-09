import knex from  'knex';

export async function up(knex: knex){
  return knex.schema.createTable('animals', table => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('title').notNullable();
  })
}

export async function down(knex: knex){
  return knex.schema.dropTable('animals');
}