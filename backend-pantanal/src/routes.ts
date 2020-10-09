import express from 'express';
import AnimalController from './controllers/AnimalController';
import ONGController from './controllers/ONGController';

const routes = express.Router();
const animalsController = new AnimalController();
const ongsController = new ONGController(); 

routes.get('/animals', animalsController.show) 

routes.post('/ongs', ongsController.create);
routes.get('/ongsShow', ongsController.show);
routes.get('/ong', ongsController.index);
routes.delete('/ong/:id', ongsController.delete);


export default routes;

/**
 * Seguindo o padrão SRP e SoC, cada classe fica responsável por determinada tarefa
 * e uma rota é responsável apenas por receber uma requisição, chamar outro arquivo
 * e devolver essa resposta, por isso existem os Controllers
 */