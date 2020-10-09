import knex from 'knex';

export async function up(knex: knex){
  return knex.schema.createTable('ong_animals', table => {
    table.increments('id').primary();
    table.integer('ong_id').notNullable().references('id').inTable('ongs')
    table.integer('animal_id').notNullable().references('id').inTable('animals')
  })
}

export async function down(knex: knex){
  return knex.schema.dropTable('ong_animals');
}