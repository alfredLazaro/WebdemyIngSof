import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import './inicioSesion.css'
const bcrypt = require('bcryptjs');
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
        this.setState({campoCorreo: event.target.value.toLowerCase()});
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
        var res = true;
         this.devolverValoresState();
        this.validarCorreo();
        this.validarContra();
        return res;
    }

    validarCorreo(){
        var res = true; //esta variable res no me confio 
        var estadoCor = this.state.campoCorreo;
        if(estadoCor==""){
            this.setState({vacioCorr:true});
            this.setState({vacioContra:true}); //este es bug de que deberian mostrarse ambos
            res =false;
        }else{}
        return res;
    }
    validarContra(){
        var res = true;
        var estadoCont = this.state.campoContra;
        if(estadoCont==""){
            this.setState({vacioContra:true});
            this.setState({vacioCorr:true});  //este es bug de que deberian mostrarse ambos x2
            res =false;
        }else{}
        return res;
    }


    validarInicio(event){
        var estaBien=this.validarAllCampos();
        console.log(estaBien);
        if(estaBien){
            try {
                var data ={
                    user: this.state.campoCorreo,
                    pass: this.state.campoContra
                };
                fetch(`/api/cursos/login`,{
                    
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{
                        'Content-Type': 'application/json'
                    }                
                })
                    .then(res => res.json())
                    .then(dato =>{ 
                        console.log(dato.contra)
                        console.log(this.state.campoContra);

                        if(dato.mensaj=='correcto' ){
                            console.log("buen inicio");
                            this.props.history.push('/Estudiante/');
                            this.props.iniciarSesion(dato.id_usuario);
                            window.location.href = window.location.href;
                        }else{
                            console.log("ALGO MAL");
                            this.setState({vacioContra:true});
                            this.setState({vacioCorr:true});
                        }
                    }
                  )
                  
            } catch (error) {

            }

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

                        <h1 className="w3-center" className="titulForm">Bienvenido a Wdemy</h1>

                        <div >
                            <div  class="w3-rest" >
                            {/* <i id='iconCor' class="w3-email"></i>
                            <i id='iconCor' class="w3-email"></i>
                             <i id='iconCor' class="w3-email"></i>
                            <i id='iconCor' class="w3-email"></i>  */}
                                <i id='iconCor' class="fa fa-envelope"></i>
                                <div >
                                    <input  id='prinPar'  class="w3-input w3-border" name="email" type="text" placeholder="correo electronico"
                                    value={this.state.campoCorreo} onChange={this.mailChange}
                                    />
                                </div>

                            </div>

                            <div className="alertas">
                                {this.state.errorCorreo?    <p>Correo electrónico incorrecto</p>    : null}
                                {this.state.vacioCorr? <p>Correo electrónico incorrecto</p>         :null }
                            </div>

                        </div>

                        <br />
                        <div >
                            <div>
                             {/* <i id='iconCor' class="w3-email"></i>
                            <i id='iconCor' class="w3-email"></i>
                            <i id='iconCor' class="w3-email"></i>
                            <i id='iconCor' class="w3-email"></i>  */}
                                <i id='iconCor' class="fa fa-lock"></i>

                                <input id='prinPar'  class="w3-input w3-border" name="campoContra" type="Password" placeholder="contraseña"
                                value={this.state.campoContra} onChange={this.contraChange}
                                />
                            </div>


                            <div className="alertas">
                                {this.state.errorContraseña?    <p>La contraseña es incorrecta</p>        :null}
                                {this.state.vacioContra?        <p>La contraseña es incorrecta</p>        :null}
                            </div>

                        </div>

                        <br />
                        <button  id='btnIni'  class="w3-button "  onClick={this.validarInicio} >Iniciar Sesión</button>
                        <br />

                        <div  className="enlaceComp" >
                            <p >¿aun no tienes cuenta?</p>
                            <a className='enlaceIni' href="/register">registrarse</a>
                        </div>
                    </div>

                 </div>

            </body>
            </html>

        );
    }
}


export default withRouter(InicioDeSesion);
