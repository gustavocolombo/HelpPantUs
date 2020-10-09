import Knex from 'knex';
import knex from 'knex';

export async function up(knex: Knex){
  return knex.schema.createTable('ongs', table => {
    table.increments('id').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.decimal('latitude').notNullable();
    table.decimal('longitude').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  })
}

export async function down(knex: knex){
  return knex.schema.dropTable('ongs');
}