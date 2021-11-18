import React from 'react';
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

function VistaEstudiante(){
  return(
    <Router>
        <AppBar showButtRegis='false' showButtLogin='false'/>
        <VistaEst/>
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


function App() {
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

            <Route exact path="/estudiante">
              <VistaEstudiante/>
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


export default App;



