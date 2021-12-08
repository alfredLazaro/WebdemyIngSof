import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Popup from '../body-components/carrucel/Popup.jsx';
import './bodyTutor.css'

class VistaTutor extends Component{
    constructor(props){
        super(props);
        this.state = {
            cursos: [],
            usuario: props.idenUsuario(),
            textPopup: ""
        }
        this.fetchCourse = this.fetchCourse.bind(this);
        this.cortar = this.cortar.bind(this);
        this.sacar = this.sacar.bind(this);
        this.refrescarPagina = this.refrescarPagina.bind(this);
        this.borrarCurso = this.borrarCurso.bind(this);
        this.modificar = this.modificar.bind(this);
        this.nuevoCurso = this.nuevoCurso.bind(this);
        this.deleteEtiquetas = this.deleteEtiquetas.bind(this);
        this.deleteModulos = this.deleteModulos.bind(this);
        this.deleteUsuarios = this.deleteUsuarios.bind(this);
        this.deleteCurso = this.deleteCurso.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.togglePopupAct = this.togglePopupAct.bind(this);

        this.showPopup = false;
    }

    componentDidMount() {
        this.fetchCourse();
    }
    
    fetchCourse() {
        fetch(`/api/cursos/creadosTutor/${this.state.usuario}`)
          .then((res) => res.json())
          .then((data) => {
            this.setState({ cursos: data });
          });
    }

    sacar(){
        let hash = {};
        var filtracion = this.state.cursos.filter(curso=>hash[curso.id_curso]? false : hash[curso.id_curso]=true);
        this.numFiltrado = filtracion.length;
        return filtracion;
    }

    cortar(obj){
        let text = JSON.stringify(obj);
        return text.slice(1,11);
    }

    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup,
        });
    }

    togglePopupAct() {
        this.setState({
          showPopup: !this.state.showPopup,
        });
        window.location.href = window.location.href;
    }

    refrescarPagina(){
        window.location.href = window.location.href;
    }

    borrarCurso(idCurso){
        
        /*var listCursos = this.state.cursos;
        listCursos = listCursos.filter(function(curso) {
            return curso.id_curso !== idCurso; 
        });
        this.setState({
            cursos: listCursos
        });*/

        this.deleteEtiquetas(idCurso);
        this.deleteModulos(idCurso);
        this.deleteUsuarios(idCurso);
        this.deleteCurso(idCurso);
        this.fetchCourse();

        this.setState({
            textPopup: "Se elimino correctamente el curso",
        });
        this.togglePopup();

        
    }

    deleteEtiquetas(idCurso){
        try {
            var data ={
                idenCurso: idCurso
            };
            fetch(`/api/cursos/deleteCurso/etiquetas`,{
                
                method: 'DELETE',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }                
            })
                .then(res => res.json())
                .then(dato =>{ 
                    console.log(dato)
                }
              )
              
        } catch (error) {
            console.log("Error al eliminar")
        }
    }

    deleteModulos(idCurso){
        try {
            var data ={
                idenCurso: idCurso
            };
            fetch(`/api/cursos/deleteCurso/modulos`,{
                
                method: 'DELETE',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }                
            })
                .then(res => res.json())
                .then(dato =>{ 
                    console.log(dato)
                }
              )
              
        } catch (error) {
            console.log("Error al eliminar")
        }
    }

    deleteUsuarios(idCurso){
        try {
            var data ={
                idenCurso: idCurso
            };
            fetch(`/api/cursos/deleteCurso/usuarios`,{
                
                method: 'DELETE',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }                
            })
                .then(res => res.json())
                .then(dato =>{ 
                    console.log(dato)
                }
              )
              
        } catch (error) {
            console.log("Error al eliminar")
        }
    }
    deleteCurso(idCurso){
        try {
            var data ={
                idenCurso: idCurso
            };
            fetch(`/api/cursos/deleteCurso`,{
                
                method: 'DELETE',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }                
            })
                .then(res => res.json())
                .then(dato =>{ 
                    console.log(dato)
                }
              )
              
        } catch (error) {
            console.log("Error al eliminar")
        }
    }


    modificar(idCurso){
        this.props.redirCurso(idCurso);
        this.props.history.push("/crearCurso");
        window.location.href = window.location.href;
    }

    nuevoCurso(){
        this.props.redirNuevoC();
        this.props.history.push("/crearCurso");
        window.location.href = window.location.href;
    }

    render() {
        return(
            <div className="fondoTut">
                <div>
                    <div className="w3-cell-row">
                        <div className="w3-container w3-cell w3-cell-middle seccTitulo">
                            <p id="textMisCursos"> Cursos creados: </p>
                        </div>
                        <div className="w3-container w3-cell w3-cell-middle seccNotaNuevo">
                            <p id="txtOrdCursos"> Nuevo curso </p>
                        </div>
                        <div className="w3-container w3-cell w3-cell-middle">
                            <button className="w3-button btnIconos" onClick={this.nuevoCurso}>
                                <i className="material-icons fondIconos">add_box</i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="contCursosTutor">
                {
                        this.sacar().map(curso => {
                            return(
                            <div key={curso.id_curso} className="cardCurso">
                                <button className="elementosLista" onClick={this.refrescarPagina}>
                                    <Link className='linkInial' to={`/Inicio/${curso.id_curso}`} > {/* Cambiar redireccion a creacion de curso con el id del curso, como dato global*/}
                                        <div className="linkCursoEst">
                                            <div className="w3-cell-row">
                                                <div className="w3-container w3-cell w3-cell-middle imagenCurTutor">
                                                    <img id="imagenCursoCardTutor" src={`${curso.imagen}`}></img>
                                                </div>
                                                <div className="w3-container w3-cell w3-cell-middle infoCurTutor">
                                                        <div className="w3-cell-row">
                                                            <div className="w3-container w3-cell">
                                                                <p className="tituloCursTutor">{curso.nombre}</p> 
                                                            </div>
                                                        </div>
                                                        <div className="w3-cell-row">
                                                            <div className="w3-container w3-cell">
                                                                Actualizacion: {this.cortar(curso.created_at) }
                                                            </div>
                                                        </div>
                                                        <div className="w3-cell-row">
                                                            <div className="w3-container w3-cell ">
                                                                {curso.state===1 ? <div>Estado de Curso: Publico</div> : <div>Estado de Curso: Oculto</div>}
                                                            </div>
                                                            <div className="w3-container w3-cell ">
                                                                {curso.state===1 ? <div className="circVerde"/> : <div className="circRojo"/>}
                                                            </div>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link> 
                                </button>
                                <div className="botonesCurso">
                                    <button className="btnModificar" onClick={() => this.modificar(curso.id_curso)}> Modificar </button>
                                    <button className="btnEliminar" onClick={() => this.borrarCurso(curso.id_curso)}> Eliminar </button>
                                </div>
                            </div>                  
                            )
                            })
                    }
                </div>
                {(this.state.cursos.length === 0) ? 
                    <div id="contNoEncont">
                        <h1> Aun no tienes curso creados </h1>
                        <img id='imagenError' src={`/assets/imagenes/vacio.png`}></img>  
                    </div> : null
                }
                {this.state.showPopup ? (
                <Popup
                    text={this.state.textPopup}
                    closePopup={this.togglePopupAct.bind(this)}
                />
                ) : null}
            </div>
        )
    }
}
export default withRouter(VistaTutor);