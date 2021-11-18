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
                    
                    <h3 className="letraDescrip">                        
                       <p> Esta pagina esta pensada para el aprendizaje de herramientas 
                        tecnológicas y fomentar el aprendizaje en todas las personas 
                        que deseen aprender bla bla BLASDAJOF ADA 
                        </p>
                    </h3>
                        
                </div>        
            </div>        
                <div className="introTit">            
                <div className="BodyPart">  
                        <div className="plataforma">
                            <p id="tituloCursPlat">Cursos en plataforma:</p>
                        </div> 
                </div>
           </div>
           <div className="BodyPart">
                <Carrusel 
 
                    />
           </div>
        </div>
       
    )
}

export default Body


