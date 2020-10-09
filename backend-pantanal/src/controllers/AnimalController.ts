import knex from '../database/connection';
import { Request, Response } from 'express';

class AnimalController{
  async show (request: Request, response: Response){ //utilizar a serialização dos itens, fica mais fácil de trabalhar no react e também pro usuário visitar a url da imagem
    const animals = await knex('animals').select('*');
  
    const serializedInfoAnimals = animals.map(animal => {
      return{
        id: animal.id,
        title: animal.title,
        image_url: `http://localhost:3333/uploads/${animal.image}`,
      }
    })
    //eu retorno as informações do usuário de uma forma diferente de uma forma primária, uma forma que ele gostaria de visualizar as coisas, por isso existe a serialização de dados em react
    return response.json(serializedInfoAnimals);  
  }
}
export default AnimalController;