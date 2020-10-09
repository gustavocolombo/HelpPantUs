import React from 'react';
import { Title, Logo, SubLogo, Links, Span, Strong, Centered, ImagePantanal, Space } from './styles';
import capivara from '../../assets/capivara_home.svg';
import pantanal from '../../assets/pantanal.svg';  
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const Home: React.FC = () => {
  return (
   <>
     <Centered>
      <Title>HelPantUs</Title>

        <header>
          <img src = {capivara} alt ="pantanal" width={200} height={150}/>
        </header>

        <ImagePantanal>
          <header>
              <img src = {pantanal} alt ="pantanal" width={500} height={400}/>
          </header>
        </ImagePantanal>
        
     </Centered>
   
     <main>
        <Logo>
          A plataforma para cadastro de ONG's<br/> que ajudam o Pantanal.
        </Logo>

        <SubLogo>Aqui ONG's fazem seu cadastro de forma gratuita para ter mais visibilidade<br/>
          na ajuda aos animais e combate a queimadas, podendo receber doações.
        </SubLogo>

        <Space>
          <Link to = "ong">
            <Links>
              <Span>
                <FiArrowRight/>
              </Span>
                <Strong>Venha cadastrar sua ONG!</Strong>
              </Links>
          </Link>

          <Link to = "ong-cadastrada">
            <Links>
              <Span>
                <FiArrowRight/>
              </Span>
                <Strong>ONG já cadastrada? Confira!</Strong>
            </Links>
          </Link>
        </Space>
     </main>
   </>
  );
}

export default Home;