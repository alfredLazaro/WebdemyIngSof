import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import './Registro.css'
class Registro extends Component{
    constructor(props){
        super(props);
        
    }
    
    render(){
        return(
            <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <title>Document</title>
            </head>
            <body>
                <form id='form' action="/action_page.php" className="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin">
                <h2 className="w3-center">Contact Us</h2>
                
                <div className="w3-row w3-section">
                    {/* <div className="w3-col"  > <i className = "w3-xxlarge fa fa-user"></i></div>                             */}
                    <div className="w3-rest">
                    <input id='prinPar' className="w3-input w3-border" name="first" type="text" placeholder="Nombre(s)" />
                    <input id='prinPar' class="w3-input w3-border" name="last" type="text" placeholder="Apellidos" />
                    
                    
                    </div> 
                
                    <div class="w3-row w3-section">
                    {/* <div class="w3-col" ><i class="w3-xxlarge fa fa-envelope-o"></i></div> */}
                        <div class="w3-rest">
                        <input id='prinPar'  class="w3-input w3-border" name="email" type="text" placeholder="@gmail.com" />
                        </div>
                    </div>

                    <div class="w3-row w3-section">
                    {/* <div class="w3-col" ><i class="w3-xxlarge fa fa-envelope-o"></i></div> */}
                        <div class="w3-rest">
                        <input id='prinPar'  class="w3-input w3-border" name="email" type="text" placeholder="contraseña" />
                        </div>
                    </div>

                    <div class="w3-row w3-section">
                    {/* <div class="w3-col" ><i class="w3-xxlarge fa fa-envelope-o"></i></div> */}
                        <div class="w3-rest">
                        <input id='prinPar'  class="w3-input w3-border" name="email" type="text" placeholder="confirmar contraseña" />
                        </div>
                    </div>

                </div>
                <button id='botonRegis' class="w3-button " >Registrase</button>
                </form>
                </body>
            </html>
            
        );
    }
}


export default withRouter(Registro);
