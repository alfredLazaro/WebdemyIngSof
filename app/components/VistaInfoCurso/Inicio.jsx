import React, { Component } from "react";
import { withRouter } from "react-router-dom";


class Inicio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curso: props.id_curso,
            objCurso: {},
            modulos: [],
            fecha: "",
            nombreTut: "",
            etiquetas: []
        }
        this.cortarFecha = this.cortarFecha.bind(this);
        this.volver = this.volver.bind(this);
    }


    componentDidMount() {
        this.fetchCourse();
        this.fetchModules();
        this.fetchTags();
    }

    fetchCourse(){   /**/
        fetch(`/api/cursos/${this.state.curso}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    objCurso: data,
                    fecha: data.created_at,
                    nombreTut: data.nombres + " " + data.apellidos
                });
            });
    }

    fetchModules() {
        fetch(`/api/cursos/${this.state.curso}/modulos`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    modulos: data
                });
            });
        console.log(this.state.modulos);
    }

    fetchTags() {
        fetch(`/api/cursos/${this.state.curso}/etiquetas`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    etiquetas: data
                });
            });
    }

    cortarFecha(obj) {
        var text = JSON.stringify(obj);
        text = text.replace(/-/g, "/");
        return text.slice(1, 11);
    }

    volver() {
        history.back();
    }



    render() {
        return (
            <div className="fondoCurso">
                <div className="deDebajoDeBody">
                    <img id="imagenCurso" src={`${process.env.PUBLIC_URL}/assets/imagenes/${this.state.objCurso.imagen}`}></img>
                    
                    <div className="contenedor">
                        <div>
                            <div className="nombreCurso"> {this.state.objCurso.nombre} </div>
                        </div>
                        <div>
                            <button id="btnVolver" className="w3-button" onClick={this.volver}>
                                Volver
                            </button>
                        </div>
                    </div>
                </div>

                <div className="container-flulid">
                    <div className="contenedor">
                        <div>
                            <p className="tituloCursos">Descripcion del curso</p>
                            <div className='contenidoCaja'>
                                {this.state.objCurso.descripcion}
                            </div>

                            <p className="tituloCursos">Requisitos</p>
                            <div className='contenidoCaja'>
                                {this.state.objCurso.requisitos}
                            </div>

                            <p className="tituloCursos">Tutor del curso</p>
                            <div className='contenidoCaja'>
                                {this.state.nombreTut}
                                <br />
                                {this.state.objCurso.bibliografia}
                            </div>
                            <div className="infoCursos">
                                Duracion del curso: {this.state.objCurso.duracion} dias
                                <br />
                                Actualizacion: {this.cortarFecha(this.state.fecha)}
                            </div>
                            <div className="tituloCursos">Palabras Clave</div>
                            <div className="contEtiquetas">
                                <div>
                                    {
                                        this.state.etiquetas.map((etiqueta) => {
                                            return (
                                                <div className="etiqueta"> {etiqueta.nombre} </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="tituloCursos">Contenido del curso: </p>
                            <div className='contenidoCurso' >
                                <ul>
                                    {
                                        this.state.modulos.map((modulo) => {
                                            return (
                                                <div className="modulo"> {modulo.nombre} </div>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div >
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(Inicio);


