import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import './styles.css';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Map, TileLayer, Marker} from 'react-leaflet';
import api from '../../services/api';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Estados são usados quando se deseja armazenar informações no front-end, e como já tenho as tabelas prontas eu preciso apenas criar o estado
 * de cada coluna da tabela da ONG com seus respectivos tipos, e quando se cria Estados com variáveis nova, por exemplo, precisa se criar interfaces
 * para esses esses estados,como é utilizado no Estado pra armazenar animais, ele precisa de uma interface de animais que também é um array 
 */


interface IBGEUFResponse{
  sigla: string;
}

interface IBGECityResponse{
  nome: string;
}

interface Animal {
  id : number;
  title: string;
  image_url: string;
}

const CreateONG = () => {

  const [animals, setAnimals] = useState<Array<Animal>>([]);
  const [selectedUfs, setSelectedUfs] = useState('0');
  const [ufs, setUfs] = useState<Array<string>>([])
  const [cities, setCities] = useState<Array<string>>([]);
  const [selectedCity,setSelectedCity] = useState('0');
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]); 
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]); 

  const [formData, setFormData] = useState({ 
    name : '',
    email : '',
    whatsapp: ''
});

  const [selectedAnimals, setSelectedAnimals] = useState<number[]>([]);
  
  const history = useHistory();

/**
 * Um useEffect é um tipo de react hook e é utilizado quando quero realizar uma ação quando o componente for montado em tela, depois da renderização.
 * Ele tem uma arrow function que determina oque será feito na execução e quantas vezes será executado ou persistido em tela está no array que o método 
 * contém, na última parte, se não tiver nada ele será montado uma vez apenas
 */

/**
 * Por que em determinados momentos usar api.get e axios.get: Por que api.get está configurado pra pegar apenas o endereço
 * de http://localhost/3333 e suas rotas get
 */

 /**
  * As funções que recebem eventos como parametro é quando seu estado muda, ou seja, além da variável do estado ser alterada, ela precisa ser captada por algum lugar
  * seja pelo clique ou pela escrita do usuário, então há vários elementos que podemos colocar em ChangeEvent <>,porque são os elementos HTML que poderão ser mudados
  */

  /**
   * Usei o toastfy, uma lib do react para notificações, ela é bastante utilizada nos novos sites que utilizam react e também é uma forma mais bonita de mostrar uma 
   * notificação em vez de um alert, e na função onde ela está presente eu envio o usuário de volta a home quando ele acaba de enviar todos os dados cadastrais dele
   */

   /**
    * Não se pode alterar o estado do Estado de forma direta, por exemplo, não se pode pegar a variável do estado e fazer por exemplo var.push, pois assim eu to mudando 
    * de forma direta o meu estado, por isso existe o setState, que no caso é o setNomeVar, que ele ou adiciona uma variável normalmente : setNomeVar(info), ou faz uso 
    * do spread operator, que é pra manter as informações já contidas no Estado setNomeVar([...info, new])
    */

  useEffect(()=>{
    api.get('animals').then(response =>{
      setAnimals(response.data);
    })
  }, []);

  useEffect(()=>{
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response =>{
      const ufInitials = response.data.map(uf=> uf.sigla);

      setUfs(ufInitials);
    })
  }, []);


  useEffect(()=>{
      axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUfs}/municipios`).then(response =>{
        const cityNames = response.data.map(city => city.nome );

        setCities(cityNames);
    })
  },[selectedUfs]);


  function toSelectUF(event: ChangeEvent<HTMLSelectElement>){
    const uf = event.target.value;

    setSelectedUfs(uf);
  }; 


  function toSelectCity(event: ChangeEvent<HTMLSelectElement>){
    const city = event.target.value;

    setSelectedCity(city);
  };

  function toInputChange(event: ChangeEvent<HTMLInputElement>){
    const { name, value } = event.target;

    setFormData({ ...formData,[name]:value });
  }

  function userMapClick(event: LeafletMouseEvent){
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng
    ]);
  }; 

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(position =>{
      const {latitude, longitude} = position.coords;

      setInitialPosition([latitude, longitude]);
    })
  }, []);

  function toSelectAnimal(id:number){
    const alreadySelected = selectedAnimals.findIndex(animal => animal === id);

    if(alreadySelected >=0){
      const filteredAnimals = selectedAnimals.filter(animal => animal !== id);
      setSelectedAnimals(filteredAnimals);
    }else{
      setSelectedAnimals([ ...selectedAnimals, id]);
    }

  };

  function notify(){
    toast.success('ONG cadastrada com sucesso!');
    history.push('/');
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();
      
    const{name, email, whatsapp} = formData;
      const uf = selectedUfs;
      const city = selectedCity;
      const [latitude, longitude] = selectedPosition;
      const animals = selectedAnimals;

      const data = {
        name, email, latitude, longitude, city, uf , animals, whatsapp
      }
    
      await api.post('ongs', data);

      console.log(data);

      notify();
  }
/**
 * O Link em vez da tag tradicional _a_ é usado para que quando o usuário navegue entre as páginas de react, apenas a página que 
 * ele selecionou, no caso escolheu voltar ou avançar seja carregada, em vez da aplicação toda, como aconteceria com a tag a
 */

// A função de handlesubmit poderia também ser enviada no botão
// FiArrowLeft é um ícone da importação da lib react icons que pode ser usada em forma de componentes 
//toFill e toFill-group são estilizações feitas no arquivo css 

/**
 * Já o componente do map, consultando a documentação do leaflet (api de geolocalização usada, em exemplos simples),temos um exemplo como este
 * mas no caso fiz para que o zoom inicial do mapa fosse 15, ele começasse na initialPosition e um onClick, que quando clicasse ele chamaria a função
 * de marcar um ponto no mapa. O TyleLayer do mapa é o estilo do mapa, importado no index.html
 */

  return (
   <div id="page-create-ong">
     <header>
      <Link to ="/">
         <FiArrowLeft/> 
         Voltar para a home
      </Link>
       
     </header>

     <form onSubmit = {handleSubmit}>
       <h1>Cadastro da ONG</h1>

       <fieldset>
         <legend>
          <h2>Preencha a seguir com seus dados</h2>
         </legend>  
            
         <div className="toFill">
            <label htmlFor = "name">Nome da entidade</label>
            <input type ="text" name="name" id="name" onChange={toInputChange}
              />
         </div>

         
          <div className="toFill">
            <label htmlFor = "email">E-mail</label>
            <input type ="email" name="email" id="email" onChange={toInputChange}/>
          </div>
          
          <div className="toFill">
            <label htmlFor = "whatsapp">WhatsApp</label> 
            <legend>
              <span id ="whats"> Preecha com seu WhatsApp ou com um telefone para contato</span>
            </legend>
            <input type ="text" name="whatsapp" id="whatsapp" onChange={toInputChange} />
          </div>

       </fieldset>

       <fieldset>
         <legend>
          <h2>Onde você atua?</h2>
          <span>Selecione um endereço no mapa</span>
         </legend>
         
        <Map center= {initialPosition} zoom={15} onclick={userMapClick}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position= {selectedPosition} />
        </Map>

         <div className="toFill-group">
           <div className="toFill">
             <label htmlFor = "uf">Estado (UF)</label>
             <select name="uf" id="uf" value={selectedUfs} onChange={toSelectUF}>
               <option value="0">Selecione um estado</option>
               {ufs.map(uf => 
                  <option key ={uf} value={uf}>{uf}</option>
                )}
             </select>
           </div>
           <div className="toFill">
             <label htmlFor = "city">Cidade</label>
             <select name="city" value ={selectedCity} onChange={toSelectCity} id="city">
               <option value="0">Selecione uma cidade</option>
                {cities.map(city => 
                    <option key ={city} value={city}>{city}</option>
                  )}
             </select>
           </div>
         </div>

       </fieldset>

       <fieldset>
         <legend>
          <h2>Animais para cuidado</h2>
          <span>Selecione um ou mais animais que você oferece suporte</span>
         </legend>
        
        <ul className="items">
          {animals.map(animal => (<li key={animal.id} onClick={()=>toSelectAnimal(animal.id)}
            className = {selectedAnimals.includes(animal.id)? 'selected': ''}>
              <img src = {animal.image_url} alt={animal.title}/>
              <span>{animal.title}</span>
            </li>
          ))}
        </ul>
       </fieldset> 
    
       <button type="submit" >
         Cadastrar ONG
       </button>

     </form>
   </div>
  )
  /**
   * Caso eu colocasse a função de notify dentro do submit, ele sobrescreveria a função primária do submit que é enviar os dados
   * Nesse último map eu percorro todos os meus animais pra verificar id é o de um animal já selecionado, por isso é selectedAnimals.includes,
   * que retorna true ou false, isso deve ser feito para apenas um ser selecionado de cada vez, mas a lógica para selecionar e tirar a seleção 
   * do mesmo é feita em selectedAnimals
   */
}

export default CreateONG;