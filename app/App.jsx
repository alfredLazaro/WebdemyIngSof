import React, { Component } from 'react';
import AppBar from './components/appBarComponents/AppBar.jsx';
import Body from './components/body-components/Body.jsx';
import Inicio from './components/VistaInfoCurso/Inicio.jsx';
import NotFound from './components/NotFound.jsx';
import VistaEst from './components/paginaEstudiante/bodyEst.jsx';
import Registro from './components/Registro/Registro.jsx';
import InicioDeSesion from './components/InicioDeSesion/InicioDeSesion.jsx';


import { useParams } from 'react-router';
  import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

function VistaGeneral(){
  return(
    <Router>
        <AppBar showOptOthers='false' showButtonUser='false'/>
        <Body
          
        />
      </Router>
  );

}

function VistaCurso(){
  const params = useParams();

 return(   
  <Router>
      <AppBar showOptOthers='false' showButtonUser='false'/>
      <Inicio id_curso = {params.entrada} />
  </Router>
  );

}

function VistaEstudiante(props){
  const params = useParams();
  return(
    <Router>
        <AppBar showButtRegis='false' showButtLogin='false'/>
        <VistaEst id_user = {params.idUser} sesionIniciada={props.sesionIniciada} cerrarSesion={props.cerrarSesion}/>
      </Router>
  );
}

function VistaRegistro(){
  return(
    <Router>      
        <AppBar showButtRegis='false' showButtLogin='false' showOptOthers='false' showButtonUser='false'/>
        <Registro>
        </Registro>
    </Router>
  );
}

function VistaLogin(){
  return(
    <Router>      
        <AppBar showButtRegis='false' showButtLogin='false' showOptOthers='false' showButtonUser='false'/>

        <InicioDeSesion>

        </InicioDeSesion>
        
    </Router>
  );

}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      idUsuario: -1,
      estaSesionIni: false
    };

    this.sesionIniciada = this.sesionIniciada.bind(this);
    this.iniciarSesion = this.iniciarSesion.bind(this);
    this.cerrarSesion = this.cerrarSesion.bind(this);
  }

  sesionIniciada(e) {
    return this.state.estaSesionIni;
  }

  iniciarSesion(idIniciado){
    this.setState({
      idUsuario: idIniciado,
      estaSesionIni: true
    });
  }

  cerrarSesion(valor) { //Prueba para paso de valores en funcion
    console.log("Se ejecuta cerrar sesion")
    console.log(valor)
    this.setState({
      estaSesionIni: valor,
    });
    console.log(this.state.estaSesionIni)
  }

  render(){
    return(
      <Router>
          <Switch>
              <Route exact path='/' >
                <VistaGeneral>
                  
                </VistaGeneral>
              </Route>
    
              {/* path="/blog/:slug" */}
              <Route exact path="/Inicio/:entrada">  
                <VistaCurso/>
              </Route>
  
              <Route exact path="/estudiante/:idUser">
                <VistaEstudiante sesionIniciada={this.sesionIniciada} cerrarSesion={this.cerrarSesion}/>
              </Route>
  
              <Route exact path="/register" >
               <VistaRegistro>
  
               </VistaRegistro>
              </Route>
  
            {/* esta de modificarPara que revisa, us y contra */}
              <Route exact path="/login">
  
                <VistaLogin/>
  
              </Route>
  
              <Route component={NotFound} /> 
  
          </Switch>
        </Router>
    );
  }
  
}


export default App;



