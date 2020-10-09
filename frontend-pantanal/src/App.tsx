import React from 'react';
import {BrowserRouter, Route } from 'react-router-dom';
import CreateONG from './pages/CreateONG';
import ONGCadastrada from './pages/ONGCadastrada';
import Home from './pages/Home';

import GlobalStyle from './styles/global';
import  {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Por padrão o path que o Route interpreta ou vai, é o /, então por isso temos que colocar o exact nas Route e também
 * colocar o path correto para que o usuário acesse uma página diferente a cada rota
 */

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
      <ToastContainer/>
        <Route component = {Home} path = "/" exact = {true}/>
        <Route component = {CreateONG} path='/ong' exact = {true}/>
        <Route component = {ONGCadastrada} path='/ong-cadastrada' exact = {true}/>
      </BrowserRouter>
      <GlobalStyle/>
    </>
  );
}

export default App;
