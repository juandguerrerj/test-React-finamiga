import React from 'react';
import './App.css';
import PersonajeContainer from './PersonajeContainer';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Contactos from './Contactos'
import Inicio from './Inicio';

//
function App() {
  
  return (
    <BrowserRouter>
      <div className="App">      
        <h1>Test React Finamiga</h1>       
        
        <hr />
        <br />

        <div>
          <Link to="/" className="links">
            Inicio
          </Link>
          <Link to="/personajes" className="links">
              Personajes
          </Link>
          <Link to="/contactos" className="links">
            Contactos
          </Link>
        </div>

        <Switch>
          <Route path="/personajes">
            <PersonajeContainer name="Personaje"/>
          </Route>
          <Route path="/contactos">
            <Contactos></Contactos>
          </Route>
          <Route path="/" exact>
            <Inicio></Inicio>
          </Route>                    
        </Switch>
         

      </div>
    </BrowserRouter>
    
  );
}


export default App;
