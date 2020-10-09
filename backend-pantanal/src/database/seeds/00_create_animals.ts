import knex from 'knex';

/**
 * seeds são configurações ou dados prévios que uma determinada tabela do meu banco vai ter
 * no caso é a tabela de animais que vai ter os svgs e seus respectivos títulos
 */

export async function seed(knex: knex){
  await knex('animals').insert([
    { title: "Anta", image: "anta.svg" },
    { title: "Camaleão", image: "camaleao.svg"},
    { title: "Macaco", image: "macaco.svg"},
    { title: "Onça", image: "onca.svg"},
    { title: "Bicho Preguiça", image: "preguica.svg"},
    { title: "Tartaruga", image: "tartaruga.svg"},
    { title: "Tamanduá", image: "tamandua.svg"},
    { title: "Tucano", image: "tucano.svg"},
    { title: "Veado-Catingueiro", image: "veado.svg"}
  ])
}