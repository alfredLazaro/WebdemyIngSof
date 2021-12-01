import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './bodyEst.css'
import Popup from '../body-components/carrucel/Popup.jsx';

class VistaEst extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: "",
            usuario: props.idenUsuario(),
            cursos: [],
            showPopup: false,
            textPopup: ""
        }
        this.fetchCourseAlf = this.fetchCourseAlf.bind(this);
        this.fetchCourseFech = this.fetchCourseFech.bind(this);
        this.cortar = this.cortar.bind(this);
        this.refrescarPagina = this.refrescarPagina.bind(this);
        this.listOrd = this.listOrd.bind(this);
        this.ordAlf = this.ordAlf.bind(this);
        this.ordFecha = this.ordFecha.bind(this);
        this.pruebaBtn = this.pruebaBtn.bind(this);
        
        this.togglePopup = this.togglePopup.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handlePaste = this.handlePaste.bind(this);
        this.handleChar = this.handleChar.bind(this);
        this.buscarPalab = this.buscarPalab.bind(this);


        this.nombreAbuscar = "";
        this.numFiltrado = 0;
    }

    componentDidMount(){
        this.fetchCourseAlf();
    }

    fetchCourseAlf(){
        fetch(`/api/cursos/cursosEst/${this.state.usuario}`) //Se cargan los datos de todos los cursos, para pruebas
            .then(res => res.json())
            .then(data => {
                this.setState({cursos: data});
            });
    }

    fetchCourseFech(){
        fetch(`/api/cursos/cursosEstFech/${this.state.usuario}`) //Se cargan los datos de todos los cursos, para pruebas
            .then(res => res.json())
            .then(data => {
                this.setState({cursos: data});
            });
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
        return filtracion;
    }

    refrescarPagina(){
        window.location.href = window.location.href;
    }

    listOrd(){ //muestra lista desplegable
        console.log("Se muestra lista");
        var x = document.getElementById("listaOrden");
        if (x.className.indexOf("w3-show") == -1) { 
            x.className += " w3-show";
        } else {
            x.className = x.className.replace(" w3-show", "");
        }
    }

    buscarPalab(){
        this.forceUpdate();
        this.nombreAbuscar = this.state.value;
        console.log(this.nombreAbuscar);
    }

    ordAlf(){
        this.fetchCourseAlf();
    }

    ordFecha(){
        this.fetchCourseFech(); /* Ejemplo de funcionamiento */
    }

    pruebaBtn(){
        this.props.iniciarSesion(10);
        //this.props.cerrarSesion(!this.props.sesionIniciada());
        this.fetchCourseAlf();
        window.location.href = window.location.href;
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

    render() {
        return(
            <div className="fondoEst">
                <div>
                    <div className="w3-cell-row">
                        <div className="w3-container w3-cell w3-cell-middle buscador">
                            <button className="btnIconos w3-button" onClick={this.buscarPalab}>
                                <i className="fa fa-search w3-xxlarge" ></i>
                            </button>
                            
                            <input type="text" value={this.state.value} onChange={this.handleChange} onPaste={this.handlePaste} onKeyPress={this.handleChar} maxLength={16} placeholder="Buscador de Cursos" className="inputPagEst"/>
                        </div>
                        
                        <div className="w3-container w3-cell w3-cell-middle txtOrden" >
                            <p id="txtOrdCursos"> Ordenar cursos </p> 
                        </div>

                        <div className="w3-container w3-cell w3-cell-middle">
                            <button className="btnIconos w3-button" onClick={this.listOrd}>
                                <i className="fa fa-bars w3-xxlarge" ></i>
                            </button>
                            <div id="listaOrden" className="w3-dropdown-content w3-bar-block w3-border">
                                <button onClick={this.ordAlf} className="w3-bar-item w3-border opcionDropd">Alfabeticamente</button>
                                <button onClick={this.ordFecha} className="w3-bar-item w3-border opcionDropd">Por fecha creac.</button>
                                
                                {/*Eliminar Boton, solo esta para realizar pruebas de inicio de sesion*/}
                                <button onClick={this.pruebaBtn} className="w3-bar-item w3-border opcionDropd">Cambiar valor iniSes</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <p id="textMisCursos"> Mis cursos: </p>
                { this.props.sesionIniciada() ? 
                <div className="contCursosEst">
                    {
                        this.sacar().map(curso => {
                            return(
                            <div>
                                <button className="elementosLista" onClick={this.refrescarPagina}>
                                    <Link className='linkInial' to={`/Inicio/${curso.id_curso}`} > 
                                        <div key={curso.id_curso} className="linkCursoEst">
                                            <div className="w3-cell-row">
                                                <div className="w3-container w3-cell w3-cell-middle imagenCur">
                                                    <img id="imagenCursoCard" src={`${process.env.PUBLIC_URL}/assets/imagenes/${curso.imagen}`}></img>
                                                </div>
                                                <div className="w3-container w3-cell w3-cell-middle infoCur">
                                                    <p className="tituloCurs">{curso.nombreCurso}</p>                  
                                                    <div>
                                                        <div className="w3-cell-row">
                                                            <div className="w3-cell">
                                                                Actualizacion: {this.cortar(curso.created_at) }
                                                            </div>
                                                            <div className="w3-cell">
                                                                Tutor: {curso.tutorNombre} {curso.tutorApellido}
                                                            </div>
                                                        </div>
                                                        <p> {curso.litle_descripcion} </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link> 
                                </button>
                            </div>                  
                            )
                            })
                    }
                </div> : 
                <div>
                    <h1> Necesita iniciar sesion para acceder a esta vista </h1>
                </div>
                }
                {(this.numFiltrado === 0) && (this.props.sesionIniciada()) ? 
                    <div id="contNoEncont">
                        <h1> No existen coincidencias de cursos </h1>
                        <img id='imagenError' src={`${process.env.PUBLIC_URL}/assets/imagenes/error.png`}></img>  
                    </div> : null
                }
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
export default VistaEst;