import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Popup from '../body-components/carrucel/Popup.jsx';
import './bodyTutor.css'

class VistaTutor extends Component{
    constructor(props){
        super(props);
        this.state = {
            cursos: []
        }
        this.fetchCourse = this.fetchCourse.bind(this);
        this.cortar = this.cortar.bind(this);
        this.sacar = this.sacar.bind(this);
    }

    componentDidMount() {
        this.fetchCourse();
        console.log(this.state.cursos);
    }
    
    fetchCourse() {
        fetch("/api/cursos/cursos")
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
                            <button className="w3-button btnIconos ">
                                <i className="material-icons fondIconos">add_box</i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="contCursosTutor">
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
                                                        </div>
                                                        <div className="w3-cell-row">
                                                            <div className="w3-container w3-cell w3-cell-middle">
                                                                Estado de Curso:
                                                            </div>
                                                            <div className="w3-container w3-cell w3-cell-middle">
                                                                <div className="circRojo"/>
                                                            </div>
                                                            <div className="w3-container w3-cell w3-cell-middle">
                                                                <button> Modificar </button>
                                                                <button> Eliminar </button>
                                                            </div>
                                                            
                                                        </div>
                                                        
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
                </div>
            </div>
        )
    }
}
export default VistaTutor;