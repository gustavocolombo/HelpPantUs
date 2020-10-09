import express from 'express';
import routes from './routes';
import path from 'path';
import cors from 'cors';

const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

server.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
//essa rota acima serve servir os arquivos de forma estática, além do usuário poder visitar essa url, também serve pra testar se o seed foi bem sucedido

server.listen(3333, ()=>{
  console.log("Server started on 3333");
})