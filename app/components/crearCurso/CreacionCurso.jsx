import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./CreacionCurso.css";
class CreacionCurso extends Component{

    render(){
        return(
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link
            rel="stylesheet"
            href="https://www.w3schools.com/w3css/4/w3.css"
            />
            <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <script
            src="https://kit.fontawesome.com/a076d05399.js"
            crossorigin="anonymous"
            ></script>
            <title>Document</title>
        </head>

        <body>
            <div id='fondoCursoCol'>
                
                    <div className='primFil'>
                        <h1>CrearCurso</h1>
                        <div className='alinearCamp'>
                            <p className='unalinea'>Nombre de curso:</p>
                            {/* <input className='textoLinea'  name="nombreCurso" type="text" placeholder="Inserte un nombre al curso" 
                                     value={this.state.campoCorreo} onChange={this.mailChange}   /> */}
                            <textarea name="nombreCurso" id="" cols="30" rows="2" placeholder="Inserte un nombre al curso"></textarea>
                        </div>
                        <div className='alinearCamp'>
                            <p className='nombrEtiquet'>Descripcion:</p>
                            {/* <input className='textoArea' name="descripcion" type="text"  placeholder="Describa las caracteristicas del curso" /> */}
                            <textarea name="descrip"  cols="30" rows="5" placeholder="Describa las caracteristicas del curso"></textarea>
                        </div>
                            
                        <div className='alinearCamp'>
                            <p className='etiqObjet'>Objetivo:</p>
                            {/* <input className='textoArea' name="objetivo" type="text" placeholder="Describa las capacidades que tendra el estudiante" /> */}
                            <textarea name="objetivo" id="" cols="30" rows="5" placeholder="Describa las capacidades que tendra el estudiante"></textarea>
                        </div>

                        <div className='alinearCamp'>
                            <p className='unalinea'>Requisitos previos:</p>
                            {/* <input className='textoArea' name="requisitos" type="text" placeholder="Ingrese las habilidades o conocimientos previos para tomar el curso" /> */}
                            <textarea name="requisitos" id="" cols="30" rows="5" placeholder="Ingrese las habilidades o conocimientos previos para tomar el curso"></textarea>
                        </div>
                    </div>

                    <div className='segColum'>{/* no se si esta clase sea muy necesaria */}
                        {/* boton para volver */}
                        <button id='EstiloBnt'className='btnVolv'>volver</button>
                        <div className='alinearCamp'>
                            <p className='alingImg'>Insertar Imagen:</p>
                            <input name="imagen" type="text" placeholder="Inserte url de la imagen"/>
                        </div>
                        <div className='alinearCamp'>
                            <p className='unaLin'>Palabras clave:</p>
                            <input type="text" placeholder="Inserte palabra clave"/>{/* no estoy seguro de esto */}
                            <button  id='EstiloBnt' className='posBtnG' class="w3-button "  /* onClick={this.validarInicio} */ >Insertar</button>
                        </div>

                        <div className='posBtnG'>
                            <button  id='EstiloBnt'  class="w3-button "  /* onClick={this.validarInicio} */ >Guardar Curso</button>
                        </div>
                    </div>

                

                
            </div>
        </body>
        </html>
        );
    }
}
export default withRouter(CreacionCurso);