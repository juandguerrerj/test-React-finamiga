import React from 'react';

const Personaje = ({ imagen, name, estado, especie, genero, origen }) => 
    <div>
        <ul>
            <li> <strong> Imagen: </strong> <img src={imagen} alt="personaje"/>
                 ,<strong>Nombre: </strong> {name} 
                 ,<strong> Estado: </strong> {estado} 
                 ,<strong> Especie: </strong> {especie} 
                 ,<strong> Género: </strong> {genero}
                 ,<strong> Origen: </strong> {origen}
            </li>
        </ul>        
    </div> 

export default Personaje