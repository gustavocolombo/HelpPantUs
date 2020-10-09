import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './styles.css';
import { Link } from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi';

interface ONGResponse{
  id:number;
  name:string;
  email:string;
  whatsapp: string;
  city: string;
  uf:string;
}

interface ONGId{
  id: number;
}

const ONGCadastrada = () => {
  const [ongs, setOngs] = useState<ONGResponse[]>([]);
  
  const [id, setId] = useState<ONGId[]>([]);

 useEffect(()=>{
    api.get('ongsShow').then(response=>{
      setOngs(response.data);
    })
 }, [ongs]);

  async function remover(id:number){ 
    await api.delete(`ong/${id}`);
    const ongsToDelete = ongs.filter(ongs => ongs.id === id);
    setId(ongsToDelete);
  }

  return (
   <div id="page-ong-cadastrada">
      <header>
        <Link to ="/">
          <FiArrowLeft/> 
          Voltar para a home
        </Link>
      </header>
     
     <div id="style-page">
      <ul className="items">
        {ongs.map(ong => (
          <div id="button-repeat">
            <li key={ong.id}>{ong.name} {ong.email} {ong.whatsapp} {ong.uf} {ong.city}</li>  
              <button type = "submit" onClick={()=>remover(ong.id)}>
                Remover ONG
              </button> 
          </div>
          ))}
      </ul>

    
     </div>
   </div>
  );
}

export default ONGCadastrada;