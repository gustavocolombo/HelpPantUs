import knex from '../database/connection';
import { Request, Response } from 'express';

class ONGController{

  async show(request: Request, response: Response){
    const ong = await knex('ongs').select('*')

    if(!ong){
      return response.status(404).json({message: "Erro: Não há ONG cadastrada ainda :/"})
    }

    return response.json(ong); 
  }

  async index(request: Request, response: Response){
    //como se o body para criar e os params é algo rota, obrigatório, vou filtrar a partir da query params
    const { city, uf, animals } = request.query;

    const animalsParsedOnRequest = String(animals)
    .split(',')
    .map(animal => Number(animal.trim())); //o trim tira o espaçamento na hora de vir da requisição, a direita ou a esquerda

    //agora preciso fazer o join dentro da ONG pra saber qual animal ela cuida
   const ongs =  await knex('ongs')
    .join('ong_animals', 'ongs.id', '=', 'ong_animals.ong_id')
    .whereIn('ong_animals.animal_id', animalsParsedOnRequest) //o whereIn serve para listar a ocorrência de pelo menos um que está havendo na listagem , MODIFIQUEI AQUI
    .where('city', String(city))
    .where('uf', String(uf))
    .distinct() //serve pra listar ongs distintas, sem isso a listagem ficaria confusa
    .select('ongs.*');

    return response.json(ongs);
  }

  async delete (request: Request, response: Response){
    const { id } = request.params;
    
    const ongs = await knex('ongs').select('*').where('id', id);

    if(!ongs){
      return response.status(404).json({message: "Erro: Ainda não há ONGs cadastradas :/"});
    }
    
    const ongToRemove = ongs.findIndex(ong => ong == id)  
      // ongs.splice(ongToRemove,1);

      const ongremovida = await knex('ongs').delete('id').where('id',id);

      return response.json(ongremovida);

  }

  async create (request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf, 
      animals    
    } = request.body;
  
    const trx = await knex.transaction();
    
    const ong = {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    }

    const ongIdInserted = await trx('ongs').insert(ong); //agora é preciso fazer o relacionamento com a tabela de animais, inserir dentro da tabela pivot cada um dos animais que a ong cuida
  
    //como é um array de animais percorre com um map. Quando o método insert do knex é invocado, ele retorna o id do registro recém inserido, por isso, podemos pegar o id do registro inserido
    
    const ong_id = ongIdInserted[0];

    const ongAndAnimal = animals.map((animal_id:number) => {
      return{
        animal_id,
        ong_id //coluna da tabela pivot
      }
    })
  
    await trx('ong_animals').insert(ongAndAnimal);
  
    await trx.commit();
    //é necessário fazer um commit aqui por estou fazendo mais de uma inserção no banco de dados, então caso uma dê errado, preciso que 
    //a outra também pare. 
  
    return response.json({
      id: ong_id,
      ...ong
    });
  }
}
export default ONGController;