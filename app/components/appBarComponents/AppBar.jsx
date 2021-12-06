import React, { Component } from 'react';
import 'w3-css/w3.css';
import {
    BrowserRouter as Router,
    withRouter,
    Link
  } from "react-router-dom";


class AppBar extends Component {
    
    
    constructor(props){
        super(props);
        this.state = {
            nombreUs: "",
            idUs: this.props.idenUsuario(),
            infoTutor: [],
            esTutor: false
        }
        //pueden reusar eso para que esos botones desaparezcan
        this.showButtonRegister = this.props.showButtRegis || false;
        this.showButtonLogin    = this.props.showButtLogin || false;
        this.showOptOthers      = this.props.showOptOthers || false;
        this.showButtonUser     = this.props.showButtonUser || false;
        //desaparecen o persisten los botones, esta en App.jsx lo llama y manda como parametro que lo
        //inabilite.
        this.fetchInfoTutor = this.fetchInfoTutor.bind(this);
        this.refrescar = this.refrescar.bind(this);
        this.openPagLogin=this.openPagLogin.bind(this);
        this.openPagRegister=this.openPagRegister.bind(this);   
        this.listUser = this.listUser.bind(this);
        this.cerrarSes = this.cerrarSes.bind(this);
        this.redirigirPagEst = this.redirigirPagEst.bind(this);
        this.redirigirPagTutor = this.redirigirPagTutor.bind(this);
        this.redirigirRegTutor = this.redirigirRegTutor.bind(this);
        
    }

    componentDidMount(){
        /*if(this.props.sesionIniciada()){
            fetch(`/api/cursos/${this.state.idUs}/info`) //Se cargan los datos de todos los cursos, para pruebas
            .then((res) => res.json())
            .then(data => {
                this.setState({nombreUs: data.nombres + " " + data.apellidos});
            });
        }*/
        this.fetchInfoTutor();
        console.log(this.state.esTutor);
    }

    fetchInfoTutor(){
        console.log(`/api/cursos/esTutor/${this.state.idUs}`)
        fetch(`/api/cursos/esTutor/${this.state.idUs}`)
        .then((res) => res.json())
        .then(data => {
            if(data.length>0){
                this.setState({esTutor: true});
            }
        });
    }

    refrescar(params) {
        this.props.history.push("/");
        window.location.href = window.location.href;
    }

    openPagRegister(){
        this.props.history.push("/register");
        window.location.href = window.location.href;           
    }
   
    openPagLogin(){
        this.props.history.push("/login");
        window.location.href = window.location.href;
    } 

    listUser(){ //muestra lista desplegable
        console.log("Se muestra lista");
        var x = document.getElementById("listaUser");
        if (x.className.indexOf("w3-show") == -1) { 
            x.className += " w3-show";
        } else {
            x.className = x.className.replace(" w3-show", "");
        }
    }

    cerrarSes(){
        /* Metodo para cerrar la sesion */
        this.props.cerrarSesion();
        this.props.history.push("/");
        window.location.href = window.location.href;
    }

    redirigirPagEst(){
        this.props.history.push("/estudiante");
        window.location.href = window.location.href;
    }

    redirigirPagTutor(){
        this.props.history.push("/tutor");
        window.location.href = window.location.href;
    }

    redirigirRegTutor(){
        /* Agregar redireccion a pagina registro */
        this.props.history.push("/registertutor")
        window.location.href = window.location.href;        
    }

    render(){ 
        
        return (
            <div className="appBar">
                <div className="w3-cell-row">
                    <div className="w3-container w3-cell w3-cell-middle pestanas">
                        <Link className='linkAppBar' to='/' onClick={this.refrescar}>
                            <p className='titulo' >Wdemy</p>
                        </Link>
                        { !this.showOptOthers? null :
                        <Link className='linkAppBar' to='/' onClick={this.refrescar}>
                            <p className='pestanaOp' >Otros Cursos</p>
                        </Link>
                        }
                    </div>
                    
                    <div className="w3-container w3-cell w3-cell-middle botones">
                       { (!this.showButtonRegister) || (this.props.sesionIniciada()) ? null :
                        <button id="ButtonRegister" className="w3-button" onClick={this.openPagRegister}>
                            Registrarse
                        </button>                        
                        }
                        {(!this.showButtonLogin) || (this.props.sesionIniciada()) ? null:
                        <button id="ButtonLogin" className="w3-button" onClick={this.openPagLogin}>
                             iniciar sesion
                        </button> 
                        }
                        {/*{(!this.props.sesionIniciada()) ? null:
                        <div className="w3-container w3-cell w3-cell-middle">
                            <p id="nombreUs"> {this.state.nombreUs} </p>
                        </div>
                        }*/}
                        {(!this.showButtonUser) || (!this.props.sesionIniciada()) ? null:
                        <div className="w3-container w3-cell w3-cell-middle">
                            <button className="btnIconAppBar w3-button" onClick={this.listUser}>
                                <i className="fa fa-user w3-xxlarge" ></i>
                            </button>
                            <div id="listaUser" className="w3-dropdown-content w3-bar-block w3-border">
                                <button onClick={this.cerrarSes} className="w3-bar-item w3-border opcionDropd">Cerrar Sesion</button>
                                <button onClick={this.redirigirPagEst} className="w3-bar-item w3-border opcionDropd">Pagina Estudiante</button>
                                { this.state.esTutor ? <button onClick={this.redirigirPagTutor} className="w3-bar-item w3-border opcionDropd">Pagina Tutor</button> : null}
                                { this.state.esTutor ? null : <button onClick={this.redirigirRegTutor} className="w3-bar-item w3-border opcionDropd">Convertirse Tutor</button>}
                            </div>
                        </div>
                        }
                        
                    </div>
                    
                </div>
            </div>
        )
    }          
}

export default withRouter(AppBar);