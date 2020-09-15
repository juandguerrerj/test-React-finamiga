import React from 'react'
import Personaje from './Personaje'
import API from './Api'
import { FontAwesomeIcon } from  '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class PersonajeContainer extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            personajesrandom: [],
            arrayOfRandomsNumbers: setArrayNumbers(),
            busqueda: '',
            dataPersonajes: []
        }

        /*Obtiene un array de numeros*/ 
        function arrayOfNumbers(start, end) {
            let randomNumbers = [];
            for (let i = start; i <= end; i++) {
                randomNumbers.push(i);
            }
            return randomNumbers;
        }

        /* Numero aleatorio */
        function getRandomNumber(min, max){
            let result = Math.floor(Math.random() * (max - min + 1)) + min;
            return result;
        }

        /* Llena un array de numeros aleatorios sin repetir numero */
        function setArrayNumbers(){
            let numbersArray = arrayOfNumbers(1,50);
            let randomNum = [];
        
            for(let j = 0; j <= 21; j++){
                let randomIndex = getRandomNumber(0, numbersArray.length - 1);
                randomNum.push(numbersArray[randomIndex]);
                numbersArray.splice(randomIndex, 1);                
            }
            //this.setState({arrayOfRandomsNumbers: randomNum});
            return randomNum;
        }
    }

    async componentDidMount(){
        const api = new API()
        var personajes = [];
        var respongeJson;     

        //Cargar los personajes aleatorios
        for(var i = 0; i < this.state.arrayOfRandomsNumbers.length; i++){
            respongeJson = await api.getCharacter(this.state.arrayOfRandomsNumbers[i]);
            personajes.push(respongeJson);            
        } 
        
        this.setState({personajesrandom: personajes});

        //Para buscar el personaje
        this.setState({dataPersonajes:this.state.personajesrandom});
    }

    onChange=async e=>{
        e.persist();
        await this.setState({busqueda: e.target.value});
        console.log(this.state.busqueda);
        this.filtrarElementos();
    }

    filtrarElementos=()=>{
        var search = this.state.personajesrandom.filter(item=>{
            if(item.name.includes(this.state.busqueda) ||
               item.status.includes(this.state.busqueda) ||
               item.species.includes(this.state.busqueda) ||
               item.gender.includes(this.state.busqueda) 
            ){
                return item;
            }
        });
        this.setState({dataPersonajes:search});
        console.log(this.state.dataPersonajes);
    }

    render(){
                
        return (
            <div>
                <br/>
                <h2>Lista Aleatoria de Personajes: </h2>
                
                <div className="barraBusqueda">
                    <input
                    type="text"
                    placeholder="Buscar"
                    className="textField"
                    name="busqueda"
                    value={this.state.busqueda}
                    onChange={this.onChange}
                    />
                    <button type="button" className="btnBuscar"> 
                    {" "}
                    <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>  
            { 
                this.state.dataPersonajes.map((personajer) => <Personaje imagen={personajer.image}
                                                                       name={personajer.name} 
                                                                       estado={personajer.status}
                                                                       especie={personajer.species}
                                                                       genero={personajer.gender}
                                                                       origen={personajer.origin.name}
                                                                       key={personajer.id}
                                                                       />)  }
            </div> 
        ) 
    }
}

export default PersonajeContainer