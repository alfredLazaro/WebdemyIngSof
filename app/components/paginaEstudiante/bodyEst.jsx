import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './bodyEst.css'

class VistaEst extends Component{
    constructor(props){
        super(props);
        this.state = {
            usuario: props.id_usuario,
            cursos: []
        }
        this.fetchCourse = this.fetchCourse.bind(this);
        this.cortar = this.cortar.bind(this);
        this.refrescarPagina = this.refrescarPagina.bind(this);
        this.mostrar = this.mostrar.bind(this);
    
        this.nombreAbuscar = "";
    }

    componentDidMount(){
        this.fetchCourse();
    }

    fetchCourse(){
        fetch('/api/cursos/cursos') //Se cargan los datos de todos los cursos, para pruebas
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
        return filtracion;
    }

    refrescarPagina(){
        window.location.href = window.location.href;
    }

    mostrar(){
        console.log("Se muestra lista");
    }

    render() {
        return(
            <div className="fondoEst">
                <div>
                    <div className="w3-cell-row">
                        <div className="w3-container w3-cell w3-cell-middle buscador">
                            <button className="btnIconos">
                                <i className="fa fa-search w3-xxlarge" ></i>
                            </button>
                            
                            <input type="text" placeholder="Buscador de Cursos" className="inputPagEst"/>
                        </div>
                        
                        <div className="w3-container w3-cell w3-cell-middle txtOrden" >
                            <p id="txtOrdCursos"> Ordenar cursos </p> 
                        </div>

                        <div className="w3-container w3-cell w3-cell-middle iconoOrd">
                            <button className="btnIconos" onClick={this.mostrar}>
                                <i className="fa fa-bars w3-xxlarge" ></i>
                            </button>    
                        </div>
                    </div>
                    
                </div>
                <p id="textMisCursos"> Mis cursos: </p>
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
                                                    <img id="imagenCursoRed" src={`${process.env.PUBLIC_URL}/assets/imagenes/${curso.imagen}`}></img>
                                                </div>
                                                <div className="w3-container w3-cell w3-cell-middle infoCur">
                                                    <p className="tituloCurs">{curso.nombreCurso}</p>                  
                                                    <div>
                                                        <div className="w3-cell-row">
                                                            <div className="w3-cell">
                                                                Actualizacion: {this.cortar(curso.created_at) }
                                                            </div>
                                                            <div className="w3-cell">
                                                                Tutor: {curso.nomT} {curso.apellT}
                                                            </div>
                                                        </div>
                                                        <p> Objetivo curso </p>
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
export default VistaEst