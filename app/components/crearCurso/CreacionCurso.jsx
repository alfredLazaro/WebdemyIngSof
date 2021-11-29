import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./creacionCurso.css";
class CreacionCurso extends Component{

    render(){
        
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
                <div className='vistaColumnas'>
                    <div>
                        <p>Nombre de curso:</p>
                        <input  class="w3-input w3-border" name="email" type="text" placeholder="Inserte un nombre al curso" 
                                    /* value={this.state.campoCorreo} onChange={this.mailChange} */  />
                    </div>
                        <p>Descripcion:</p>
                        <input name="descripcion" type="text"  placeholder="Describa las caracteristicas del curso" />
                    <div>
                        <p>Objetivo:</p>
                        <input name="objetivo" type="text" placeholder="Describa las capacidades que tendra el estudiante" />
                    </div>
                    <div>
                        <p>Requisitos previos:</p>
                        <input name="requisitos" type="text" placeholder="Ingrese las habilidades o conocimientos previos para tomar el curso" />

                    </div>
                    
                </div>

                <div className='segColum'>{/* no se si esta clase sea muy necesaria */}
                        <div>
                            <input name="volver" type="button"  />
                        </div>
                        <div>
                            <p>Imagen:</p>
                            <input name="imagen" type="text" placeholder="Inserte url de la imagen"/>
                        </div>
                        <div>
                            <p>Palabras clave:</p>
                            <input type="text" placeholder="Inserte palabra clave"/>{/* no estoy seguro de esto */}
                            <input type="text" placeholder="Inserte palabra clave"/>
                        </div>
                </div>
            </div>
        </body>
        </html>
    }
}
export default withRouter(CreacionCurso);