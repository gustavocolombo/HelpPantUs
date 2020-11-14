import React from 'react';

import pantanal from '../../assets/pantanal.svg';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '../Home/styles.css';

function Home(){
  return(
    <div id="page-content">
      <div className="content-wrapper">
        
        <img src={pantanal} alt="logo"/>
        
        <main>
          <span>A plataforma para cadastro de ONG's que ajudam o Pantanal.</span>
          <p>Aqui ONG's fazem seu cadastro de forma gratuita para ter mais visibilidade
          na ajuda aos animais e combate a queimadas.</p>
        </main>

        <Link to="/ong" className="create-ong">
          <FiArrowRight size={20} color="#fff"/>
          <p>Venha se cadastrar</p>
        </Link>

        <Link to = "ong-cadastrada" className="ong-cadastrada">
          <FiArrowRight size={20} color="#fff"/>
          <strong>ONG já cadastrada? Confira!</strong>
        </Link>

      </div>
    </div>
  )
}
export default Home;