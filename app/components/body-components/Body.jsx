import React, { Component } from 'react';
import Carrusel from './carrucel/Carrusel.jsx';


const Body =()=>{
    


    return (
        
        <div className="fondo">
            <div className="BodyPart" >
                <div className='vistaDescrip'>
                    {<h5>esto debe desaparecer</h5>}
                </div>
                <div className="descripcion">
                    <p> 
                        Esta pagina esta pensada para el aprendizaje de herramientas 
                        tecnológicas y fomentar el aprendizaje en todas las personas 
                        que deseen aprender   
                    </p>
                </div>        
            </div>        
                <div className="introTit">            
                    <div>  
                            <div className="plataforma">
                                <p id="tituloCursPlat">Cursos en plataforma:</p>
                            </div> 
                    </div>
                </div>
           <div>
                <Carrusel 
 
                    />
           </div>
        </div>
       
    )
}

export default Body


