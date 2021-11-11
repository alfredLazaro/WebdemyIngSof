import React from 'react';

import AppBar from './components/appBarComponents/AppBar.jsx';
import Body from './components/body-components/Body.jsx';
import Inicio from './components/VistaInfoCurso/Inicio.jsx';
import NotFound from './components/NotFound.jsx';
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
        <AppBar 

        />
        <Body
          
        />
      </Router>
  );

}

function VistaCurso(){
  const params = useParams();

 return(   
  <Router>
      <AppBar/>
      <Inicio id_curso = {params.entrada} />
  </Router>
  );

}

function VistaRegistro(){
  return(
    <Router>      
        <AppBar showButtRegis='false' showButtLogin='false' />
        <Registro>
      </Registro>
    </Router>
  );
}

function VistaLogin(){
  return(
    <Router>      
        <AppBar showButtRegis='false' showButtLogin='false' />

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
              <VistaCurso>
                  
              </VistaCurso>
              
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



