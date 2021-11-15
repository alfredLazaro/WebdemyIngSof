import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import './inicioSesion.css'
class InicioDeSesion extends Component{
     constructor(props){
        super(props);
        this.state={
            campoCorreo     :"",
            campoContra     :"",
            vacioContra     :false,
            vacioCorr       :false,
            errorContraseña :false,
            errorCorreo     :false
        }
        this.validarInicio =this.validarInicio.bind(this);
         this.mailChange          = this.mailChange.bind(this);
        this.contraChange          = this.contraChange.bind(this); 
        this.validarAllCampos      = this.validarAllCampos.bind(this);
        this.validarCorreo         = this.validarCorreo.bind(this);
        this.validarContra         = this.validarContra.bind(this);
        this.devolverValoresState  = this.devolverValoresState.bind(this);
    } 
    
    mailChange(event){
        this.setState({campoCorreo: event.target.value});
    }
    contraChange(event){
        this.setState({campoContra: event.target.value});
    }
    devolverValoresState(){
        this.setState({
            vacioContra     :false,
            vacioCorr       :false,
            errorContraseña :false,
            errorCorreo     :false
        });
    }
    validarAllCampos(){
        var res = false;
         this.devolverValoresState();
        this.validarCorreo();
        this.validarContra(); 
        return res;
    }

    validarCorreo(){
        var res = true;
        var estadoCor = this.state.campoCorreo;
        if(estadoCor==""){
            this.setState({vacioCorr:true});
            res =false;
        }else{}
        return res;
    }
    validarContra(){
        var res = true;
        var estadoCont = this.state.campoContra;
        if(estadoCont==""){
            this.setState({vacioContra:true});
            res =false;
        }else{}
        return res;
    }
    /**
    validarIniciSecion(event){
        var todoBienTodoCorrecto = this.validarAllCampos();
        //se hace la consulta en aqui
        
        if(todoBienTodoCorrecto){
            // se comprueba la base de datos
        }else{
            
        }

    } */
   
    validarInicio(event){
        var estaBien=this.validarAllCampos();
        if(estaBien){
            /**capturar de la BD */
        }else{
            this.setState({vacioContra:true});
            this.setState({vacioCorr:true});
        }
    }

    render(){
        return(
           
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <title>Wdemy</title>
            </head>
            <body>
                 
                 <div id='form'   className="w3-container w3-card-4 w3-light-grey" onSubmit={this.validarInicio}>
                    <div className="w3-row w3-section" className="w3-center">
                        
                        <h1 className="w3-center">Bienvenido a Wdemy</h1>
                        
                        <div >
                            <div  class="w3-rest" >
                            <i id='iconCor' class="w3-email"></i>
                            <i id='iconCor' class="w3-email"></i>
                            <i id='iconCor' class="w3-email"></i>
                            <i id='iconCor' class="w3-email"></i>
                                <svg id='iconCor' xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path d="M20 4H6c-1.103 0-2 .897-2 2v5h2V8l6.4 4.8a1.001 1.001 0 0 0 1.2 0L20 8v9h-8v2h8c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-7 6.75L6.666 6h12.668L13 10.75z"/><path d="M2 12h7v2H2zm2 3h6v2H4zm3 3h4v2H7z"/></svg>
                                <div >
                                    <input  id='prinPar'  class="w3-input w3-border" name="email" type="text" placeholder="correo electronico" 
                                    value={this.state.campoCorreo} onChange={this.mailChange}  
                                    />
                                </div>
                                
                            </div>
                            
                            <div className="alertas">
                                {this.state.errorCorreo?    <p>correo electronico incorrecto</p>    : null} 
                                {this.state.vacioCorr? <p>correo electronico incorrecto</p>         :null }
                            </div>
                                
                        </div>
                        
                        <br />
                        <div >
                            <div>
                            <i id='iconCor' class="w3-email"></i>
                            <i id='iconCor' class="w3-email"></i>
                            <i id='iconCor' class="w3-email"></i>
                            <i id='iconCor' class="w3-email"></i>
                                <i id='iconCor' class="fa fa-lock"></i>
                                
                                <input id='prinPar'  class="w3-input w3-border" name="campoContra" type="Password" placeholder="contraseña" 
                                value={this.state.campoContra} onChange={this.contraChanche} 
                                />
                            </div>
                            

                            <div className="alertas">
                                {this.state.errorContraseña?    <p>la contraseña es incorrecta</p>        :null} 
                                {this.state.vacioContra?        <p>la contraseña es incorrecta</p>        :null}
                            </div>
                                
                        </div>
                        
                        <br />
                        <button  id='btnIni'  class="w3-button "  onClick={this.validarInicio} >Iniciar Sesion</button>
                        <br />
                        
                        <div  className="enlaceComp" >
                        <p id="letra" >¿aun no tienes cuenta?</p>
                            <a id='enlace' href="/register">registrarse</a>
                        </div>
                    </div>
                        
                 </div>
                 
            </body>
            </html>
            
        );
    }
}


export default withRouter(InicioDeSesion);