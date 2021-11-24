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

function VistaGeneral(props){
  return(
    <Router>
        <AppBar showButtRegis={true} showButtLogin={true} showOptOthers={false} showButtonUser={false} sesionIniciada={props.sesionIniciada}/>
        <Body/>
      </Router>
  );

}

function VistaCurso(props){
  const params = useParams();

 return(   
  <Router>
      <AppBar showOptOthers={false} showButtonUser={false} showButtRegis={true} showButtLogin={true} sesionIniciada={props.sesionIniciada} />
      <Inicio id_curso = {params.entrada} />
  </Router>
  );

}

function VistaEstudiante(props){
  return(
    <Router>
        <AppBar showButtRegis={false} showButtLogin={false} showOptOthers={true} showButtonUser={true} sesionIniciada={props.sesionIniciada} cerrarSesion={props.cerrarSesion}/>
        <VistaEst sesionIniciada={props.sesionIniciada} idenUsuario={props.idenUsuario} iniciarSesion={props.iniciarSesion}/>
      </Router>
  );
}

function VistaRegistro(props){
  return(
    <Router>      
        <AppBar showButtRegis={false} showButtLogin={false} showOptOthers={false} showButtonUser={false} sesionIniciada={props.sesionIniciada}/>
        <Registro iniciarSesion={props.iniciarSesion}  >
        </Registro>
    </Router>
  );
}

function VistaLogin(props){
  return(
    <Router>      
        <AppBar showButtRegis={false} showButtLogin={false} showOptOthers={false} showButtonUser={false} sesionIniciada={props.sesionIniciada} />

        <InicioDeSesion iniciarSesion={props.iniciarSesion}>

        </InicioDeSesion>
        
    </Router>
  );

}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(window.localStorage.getItem('state')) || { 
      idUsuario: 0,
      estaSesionIni: false
    };

    this.sesionIniciada = this.sesionIniciada.bind(this);
    this.iniciarSesion = this.iniciarSesion.bind(this);
    this.cerrarSesion = this.cerrarSesion.bind(this);
    this.idenUsuario = this.idenUsuario.bind(this);
  }

  setState(state) {
    window.localStorage.setItem('state', JSON.stringify(state));
    super.setState(state);
  }

  sesionIniciada(e) {
    console.log(this.state)
    return this.state.estaSesionIni;
  }

  idenUsuario(e){
    return this.state.idUsuario;
  }

  iniciarSesion(idIniciado){
    this.setState({
      idUsuario: idIniciado,
      estaSesionIni: true
    });
  }

  cerrarSesion() { //Prueba para paso de valores en funcion
    return this.setState({ 
      idUsuario: 0,
      estaSesionIni: false
    });
  }

  render(){
    return(
      <Router>
          <Switch>
              <Route exact path='/' >
                <VistaGeneral sesionIniciada={this.sesionIniciada}/>
                  
              </Route>
    
              {/* path="/blog/:slug" */}
              <Route exact path="/Inicio/:entrada">  
                <VistaCurso sesionIniciada={this.sesionIniciada }/>
              </Route>
  
              <Route exact path="/estudiante">
                <VistaEstudiante sesionIniciada={this.sesionIniciada} cerrarSesion={this.cerrarSesion} idenUsuario={this.idenUsuario} iniciarSesion={this.iniciarSesion}/>
              </Route>
  
              <Route exact path="/register" >
               <VistaRegistro sesionIniciada={this.sesionIniciada} iniciarSesion={this.iniciarSesion} >
  
               </VistaRegistro>
              </Route>
  
            {/* esta de modificarPara que revisa, us y contra */}
              <Route exact path="/login">
  
                <VistaLogin sesionIniciada={this.sesionIniciada} iniciarSesion={this.iniciarSesion} />
  
              </Route>
  
              <Route component={NotFound} /> 
  
          </Switch>
        </Router>
    );
  }
  
}


export default App;



