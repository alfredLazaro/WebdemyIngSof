import React, { Component } from 'react';
import Popup from './Popup.jsx';
import {
  Link, withRouter
} from "react-router-dom";

class Filtro extends Component {
  constructor(props){
    super(props);
    this.state = {value: "" ,noHayElement:false,cursos:[], textPopup: ""};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.handleChar = this.handleChar.bind(this);
    this.nombreAbuscar="";
    this.sacar=this.sacar.bind(this);
    this.cortar=this.cortar.bind(this);
    this.numActual= 0;
    this.showPopup= false;
    this.numSig   = 4;
    this.flechaIqzClickada = this.flechaIqzClickada.bind(this);
    this.flechaDereClickada = this.flechaDereClickada.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
 
    this.estadoBotDere = false;
    this.estadoBotIzq  = false;
    this.elemtVacio = false;    

    this.refrescarPagina = this.refrescarPagina.bind(this);
    this.numFiltrado  = 0;
    this.numFiltrado2 = 0;

  }

  
  componentDidMount(){
    this.fetchCourse();
  }

  fetchCourse(){
    fetch('/api/cursos/cursos')
        .then(res => res.json())
        .then(data => {
            this.setState({cursos:data});
        });
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});  
    event.preventDefault();
  }

  handlePaste(event){
    event.preventDefault();
    this.setState({textPopup: "No se permite pegar texto en el campo"})
    this.togglePopup();
    console.log("se intento pegar");
    return false;
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  handleChar(e){
    var tecla = e.charCode;
    //Tecla de retroceso para borrar, siempre la permite
    if(this.state.showPopup){
      e.preventDefault();
      return false;
    }
    if (tecla == 8 || tecla == 13) {
       return true; 
    }
    if (tecla == 32){ //Borra espacios
      e.preventDefault();
      return false;
    }else{
      var patron = /[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s]/;
      var tecla_final = String.fromCharCode(tecla);
      
      if(patron.test(tecla_final)){
        return true;
      }else{

        if(e.fromCharCode != typeof undefined){
          e.preventDefault();
          console.log("No se agrega nada");
          this.setState({textPopup: "El campo solo puede ser llenado con letras y números"})
          this.togglePopup();
          return false;
        }
        e.preventDefault();
        console.log("No se agrega nada");
        //this.togglePopupChar();
        this.setState({textPopup: "El campo solo puede ser llenado con letras y números"})
        this.togglePopup();
        return false;
      }  
    }
  }

  handleSubmit(event) { 
    event.preventDefault();
    this.forceUpdate();
    this.nombreAbuscar = this.state.value;
    this.numActual = 0;
    this.numSig = 4;
  }

  cortar(obj){
    let text = JSON.stringify(obj);
    return text.slice(1,11);
  }

  sacar() {
    
    var filtracion0= this.state.cursos.filter(curso =>curso.nombreEtiqueta.includes(this.nombreAbuscar) ||
    this.nombreAbuscar === "" );

    let hash = {};
    var filtracion = filtracion0.filter(curso=>hash[curso.id_curso]? false : hash[curso.id_curso]=true);

    this.numFiltrado = filtracion.length;

    if(filtracion.length > this.numSig){
      var aRecor = filtracion.slice();
      var filtracion2 = aRecor.slice(this.numActual,this.numSig);
    }else{
      /* console.log('entra'); */
      var aRecor = filtracion.slice();
      var filtracion2 = aRecor.slice(this.numActual,filtracion.length);
      
    }
    if(filtracion.length <= 4){
      //ningun boton esta activo
      this.estadoBotDere = false;
      this.estadoBotIzq = false; 
      //this.setState({dere:false,izq:false});
      /* console.log('ambos botones estan bloqueados');
      console.log(this.estadoBotDere+"  "+this.estadoBotIzq); */
    }else{
    
    if(this.numActual == 0 && this.numFiltrado > 4){
      //se muestra solo el boton de la derecha 
      this.estadoBotDere = true;
      this.estadoBotIzq = false;  
      //this.setState({dere:true,izq:false});
      /* console.log('el boton dere habilitado, izq bloqueado entra!');
      console.log(this.estadoBotDere+"  "+this.estadoBotIzq); */
      //funca
    }else{
        

      }
    }
    /* if(this.numFiltrado===0){
      this.setState({noHayElement:true});
    }else{
      this.setState({noHayElement:false});
    }  */

    this.numFiltrado2 = filtracion2.length;
    return filtracion2;
  }
  
  flechaIqzClickada(){
    
    if(this.numActual > 0 ){
      this.numSig = this.numActual;
      this.numActual = this.numActual-4;
      /* console.log('esta al numActual') */
    }else{
      /* console.log('qie aras aqui111') */
    }

    if(this.numFiltrado > this.numSig && this.numActual >= 4){
      //ambos botones estan activos y prendidos 
      //ojo solo debemos mostrar 4 elementos en la pantalla
      this.estadoBotDere = true;
      this.estadoBotIzq = true;
      //this.setState({dere:true,izq:true});
      /* console.log("ambos estan predidos");
      console.log(this.estadoBotDere+"  "+this.estadoBotIzq); */
    }else{
      
        this.estadoBotDere = true;
        this.estadoBotIzq = false;  
    }
    this.forceUpdate();
  }

  flechaDereClickada(){
    if(this.numSig === this.numFiltrado){
      //this.setState({dere:false});
      this.forceUpdate();
    }else{
      if(this.numSig+4 < this.numFiltrado){       
        this.numActual = this.numSig;
        this.numSig +=4; 
      }else{
        this.numActual = this.numSig;
        this.numSig =  this.numFiltrado;
    }
  }

  if(this.numFiltrado > this.numSig && this.numActual >= 4){
    //ambos botones estan activos y prendidos 
    //ojo solo debemos mostrar 4 elementos en la pantalla
    this.estadoBotDere = true;
    this.estadoBotIzq = true;
    //this.setState({dere:true,izq:true});
    /* console.log("ambos estan predidos");
    console.log(this.estadoBotDere+"  "+this.estadoBotIzq); */
  }else{
    if(this.numSig >=4 || this.numSig === this.numFiltrado  ){
      //este esta de cosiderar,revisar funcionalidad.
      //es boton izquierda encendio
      this.estadoBotIzq =true;
      this.estadoBotDere = false;
      //this.setState({dere:false,izq:true});
      /* console.log('el boton izq esta habilitado, la dere esta bloqueada');
      console.log(this.estadoBotDere+"  "+this.estadoBotIzq); */
    }
  }
   this.forceUpdate();
  }

 refrescarPagina(){
    window.location.href = window.location.href;
 }

  render() {
    return (
      <div>
        
        <form className='filtro' onSubmit={this.handleSubmit} >
            <label>
              Filtro de Cursos:
              <input   type="text"  value={this.state.value} onChange={this.handleChange} onPaste={this.handlePaste} onKeyPress={this.handleChar} maxLength={16} />
              
            </label>
          </form>

        <div className="carruPrincial" >
          <div className="carruIzq">
            {this.estadoBotIzq ? <button className="Bt-Flecha1" onClick={this.flechaIqzClickada}>
            </button> :null}
            
            </div>
            
            <div className="carruMedio">
              <ul>
              {
              this.sacar().map(curso => {
                return(
                  <div id="elementosDelCarrusel" >
                    <button className="elementos-carrusel" onClick={this.refrescarPagina}>
                    <Link className='linkInial' to={`/Inicio/${curso.id_curso}`} > 
                        <div key={curso.id_curso} className="linkCurso">
                            <h3>{curso.nombreCurso}</h3>                  
                            <img id="imagenCursoRed" src={`${process.env.PUBLIC_URL}/assets/imagenes/${curso.imagen}`}></img>
                            <div className="curseDescription">
                              Actualizacion: {this.cortar(curso.created_at) }
                              <br />
                              Inscritos: { curso.inscritos }
                              <br />
                              Tutor: {curso.nomT} {curso.apellT}
                            </div>
                        </div>
                        </Link> 
                        </button>
                  </div>                  
                  )
                })
              }
              </ul>
              {this.numFiltrado === 0 ? 
                <div id="contenedorNoEnc">
                    <h1 > <img src={`${process.env.PUBLIC_URL}/assets/imagenes/imagenDeNoEncontrado.png`}></img>  
                     ¡Ups! No hay cursos disponibles 
                    </h1>
                </div> : null
              }  
           </div>

          <div className="carruDere">
            {this.estadoBotDere ?  <button className="Bt-Flecha" onClick={this.flechaDereClickada}>            
            </button> : null}
            
          </div>
        </div>
        {this.state.showPopup ? 
                <Popup
                  text= {this.state.textPopup}
                  closePopup={this.togglePopup.bind(this)}
                />
                : null
              }
      </div>
      
    )
  }

}

//export default class Carrusel extends Component {
function Carrusel(params) {
  
  return (
        <main role="main">
          <Filtro />
         
        </main>
        
    );
  
}
export default withRouter(Carrusel);
