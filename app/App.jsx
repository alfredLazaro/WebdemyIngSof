import React, { Component } from "react";
import AppBar from "./components/appBarComponents/AppBar.jsx";
import Body from "./components/body-components/Body.jsx";
import Inicio from "./components/VistaInfoCurso/Inicio.jsx";
import NotFound from "./components/NotFound.jsx";
import VistaEst from "./components/paginaEstudiante/bodyEst.jsx";
import VistaTut from "./components/paginaTutor/bodyTutor.jsx";
import Registro from "./components/Registro/Registro.jsx";
import CreacionCurso from "./components/crearCurso/CreacionCurso.jsx";
import InicioDeSesion from "./components/InicioDeSesion/InicioDeSesion.jsx";
import RegistroTutor from "./components/RegistroTutor/RegistroTutor.jsx";

import { useParams } from "react-router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function VistaGeneral(props) {
  return (
    <Router>
      <AppBar
        showButtRegis={true}
        showButtLogin={true}
        showButtonUser={true}
        sesionIniciada={props.sesionIniciada}
        cerrarSesion={props.cerrarSesion}
        idenUsuario={props.idenUsuario}
      />
      <Body />
    </Router>
  );
}

function VistaCurso(props) {
  const params = useParams();

  return (
    <Router>
      <AppBar
        showButtRegis={true}
        showButtLogin={true}
        showButtonUser={true}
        sesionIniciada={props.sesionIniciada}
        idenUsuario={props.idenUsuario}
      />
      <Inicio id_curso={params.entrada} />
    </Router>
  );
}

function VistaEstudiante(props) {
  return (
    <Router>
      <AppBar
        showOptOthers={true}
        showButtonUser={true}
        sesionIniciada={props.sesionIniciada}
        cerrarSesion={props.cerrarSesion}
        idenUsuario={props.idenUsuario}
      />
      <VistaEst
        sesionIniciada={props.sesionIniciada}
        idenUsuario={props.idenUsuario}
        iniciarSesion={props.iniciarSesion}
      />
    </Router>
  );
}

function VistaTutor(props) {
  return (
    <Router>
      <AppBar
        showButtonUser={true}
        sesionIniciada={props.sesionIniciada}
        cerrarSesion={props.cerrarSesion}
        idenUsuario={props.idenUsuario}
      />
      <VistaTut 
        idenUsuario={props.idenUsuario} 
        redirCurso={props.redirCurso}
        redirNuevoC={props.redirNuevoC}
      />
    </Router>
  );
}

function VistaRegistro(props) {
  return (
    <Router>
      <AppBar
        sesionIniciada={props.sesionIniciada}
        idenUsuario={props.idenUsuario}
      />
      <Registro iniciarSesion={props.iniciarSesion}></Registro>
    </Router>
  );
}

function VistaLogin(props) {
  return (
    <Router>
      <AppBar
        showButtRegis={false}
        showButtLogin={false}
        showOptOthers={false}
        showButtonUser={false}
        sesionIniciada={props.sesionIniciada}
        idenUsuario={props.idenUsuario}
      />

      <InicioDeSesion iniciarSesion={props.iniciarSesion}></InicioDeSesion>
    </Router>
  );
}
function VistaRegistroTutor(props) {
  return (
    <Router>
      <AppBar
        showButtonUser={true}
        sesionIniciada={props.sesionIniciada}
        idenUsuario ={props.idenUsuario}
        cerrarSesion={props.cerrarSesion}
      />
      <RegistroTutor
         idenUsuario ={props.idenUsuario}
      ></RegistroTutor>
    </Router>
  );
}

function VistaCrearCurso(props) {
  return (
    <Router>
      <AppBar
        showButtonUser={true}
        sesionIniciada={props.sesionIniciada}
        cerrarSesion={props.cerrarSesion}
        idenUsuario={props.idenUsuario}
      />
      <CreacionCurso
        sesionIniciada={props.sesionIniciada}
        idenCurso={props.idenCurso}
        idenUsuario={props.idenUsuario}
      ></CreacionCurso>
    </Router>
  );
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(window.localStorage.getItem("state")) || {
      idUsuario: 0,
      estaSesionIni: false,
      idCurso: 0
    };

    this.sesionIniciada = this.sesionIniciada.bind(this);
    this.iniciarSesion = this.iniciarSesion.bind(this);
    this.cerrarSesion = this.cerrarSesion.bind(this);
    this.idenUsuario = this.idenUsuario.bind(this);
    this.idenCurso = this.idenCurso.bind(this);
    this.redirCurso = this.redirCurso.bind(this);
    this.redirNuevoC = this.redirNuevoC.bind(this);
  }

  setState(state) {
    window.localStorage.setItem("state", JSON.stringify(state));
    super.setState(state);
  }

  sesionIniciada(e) {
    console.log(this.state);
    return this.state.estaSesionIni;
  }

  idenUsuario(e) {
    return this.state.idUsuario;
  }

  idenCurso(e){
    return this.state.idCurso;
  }

  redirCurso(idenCurso){
    this.setState({
      idUsuario: this.state.idUsuario,
      estaSesionIni: this.state.estaSesionIni,
      idCurso: idenCurso
    });
    console.log(this.state)
  }

  redirNuevoC(e){
    this.setState({
      idUsuario: this.state.idUsuario,
      estaSesionIni: this.state.estaSesionIni,
      idCurso: 0
    });
    console.log(this.state)
  }

  iniciarSesion(idIniciado) {
    this.setState({
      idUsuario: idIniciado,
      estaSesionIni: true,
      idCurso: 0
    });
  }

  cerrarSesion() {
    //Prueba para paso de valores en funcion
    this.setState({
      idUsuario: 0,
      estaSesionIni: false,
      idCurso: 0
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <VistaGeneral
              sesionIniciada={this.sesionIniciada}
              cerrarSesion={this.cerrarSesion}
              idenUsuario={this.idenUsuario}
            />
          </Route>

          {/* path="/blog/:slug" */}
          <Route exact path="/Inicio/:entrada">
            <VistaCurso
              sesionIniciada={this.sesionIniciada}
              idenUsuario={this.idenUsuario}
            />
          </Route>

          <Route exact path="/estudiante">
            <VistaEstudiante
              sesionIniciada={this.sesionIniciada}
              cerrarSesion={this.cerrarSesion}
              idenUsuario={this.idenUsuario}
              iniciarSesion={this.iniciarSesion}
            />
          </Route>

          <Route exact path="/register">
            <VistaRegistro
              sesionIniciada={this.sesionIniciada}
              iniciarSesion={this.iniciarSesion}
              idenUsuario={this.idenUsuario}
            ></VistaRegistro>
          </Route>

          {/* esta de modificarPara que revisa, us y contra */}
          <Route exact path="/login">
            <VistaLogin
              sesionIniciada={this.sesionIniciada}
              iniciarSesion={this.iniciarSesion}
              idenUsuario={this.idenUsuario}
            />
          </Route>

          <Route exact path="/crearCurso">
            <VistaCrearCurso
              sesionIniciada={this.sesionIniciada}
              cerrarSesion={this.cerrarSesion}
              idenUsuario={this.idenUsuario}
              idenCurso={this.idenCurso}
            ></VistaCrearCurso>
          </Route>
          <Route exact path="/tutor">
            <VistaTutor
              sesionIniciada={this.sesionIniciada}
              cerrarSesion={this.cerrarSesion}
              idenUsuario={this.idenUsuario}
              redirCurso={this.redirCurso}
              redirNuevoC={this.redirNuevoC}
            />
          </Route>
          <Route exact path="/registertutor">
            <VistaRegistroTutor
              sesionIniciada={this.sesionIniciada}
              iniciarSesion={this.iniciarSesion}
              idenUsuario ={this.idenUsuario}
            ></VistaRegistroTutor>
          </Route>

          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
