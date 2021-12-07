import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./CreacionCurso.css";
class CreacionCurso extends Component{
    constructor(props){
        super(props);
        this.state = {
            campEtq     : [],
            keywords: [],
            keyword: '',
            keyAv: 1,
            campNmC     : "",
            campDesc    : "",
            campReq     : "",
            campObj     : "",
            campImg     : "",
            campEtiq    : "",
            campDura    : "",
            errNmLa     :false,
            errNmCor    :false,
            errNmNul    :false,
            errDesNul   :false,
            errDesCor   :false,
            errObjLa    :false,
            errObjCor   :false,
            errObjNul   :false,

            errReqLa    :false,
            errReqNul   :false,
            errReqCor   :false,
            errImgSi    :false,
            errImgNul   :false,
            errEtiqNul  :false,
            errEtiqLar  :false,
            errDuraNul  :false,
            errDuraLet  :false,
            errDuraLar  :false
        }
        this.validarInicio = this.validarInicio.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.borrarKWord = this.borrarKWord.bind(this);
        this.nomChange           =this.nomChange.bind(this);
        this.captDesc            =this.captDesc.bind(this);
        this.captObj             =this.captObj.bind(this);
        this.capDura             =this.capDura.bind(this);
        this.captReq             =this.captReq.bind(this);
        this.captImg             =this.captImg.bind(this);
        this.captEtiq            =this.captEtiq.bind(this);
        this.devolverEstado      =this.devolverEstado.bind(this);
        this.validarCampos       =this.validarCampos.bind(this);
        this.validarNomC         =this.validarNomC.bind(this);
        this.validarDes          =this.validarDes.bind(this);
        this.validarObj          =this.validarObj.bind(this);
        this.validReq            =this.validReq.bind(this);
        this.validImg            =this.validImg.bind(this);
        this.validEtiq           =this.validEtiq.bind(this);
        this.validarCurso        =this.validarCurso.bind(this);
        
    }   
    validarInicio(){
        /*No valida por ahora, solo ingresa a la lista de keywords*/
        console.log(this.state.keyword);
        this.state.keywords.push(this.state.keyword); //Agrega a lista
        this.setState({keyword: ''})
        console.log(this.state.keywords);
        var camImg=this.state.keyword;
            if(camImg==""){
                this.setState({errEtiqNul:true});
            }else{
                if(camImg>15){
                    this.setState({errEtiqLar:true})
                }else{
                    
                }
            }
        this.forceUpdate() //grafica nuevos elementos

    }

    handleChange(event) {
        this.setState({keyword: event.target.value});  
        event.preventDefault();
    }

    borrarKWord(kword){
        var arr = this.state.keywords
        var i = arr.indexOf( kword );
 
        if ( i !== -1 ) {
            arr.splice( i, 1 );
        }

        this.setState({
            keywords: arr
        })
    }

        devolverEstado(){
            this.setState({
                errNmLa     :false,
            errNmCor    :false,
            errNmNul    :false,
            errDesNul   :false,
            errDesCor   :false,
            errObjLa    :false,
            errObjCor   :false,
            errObjNul   :false,

            errReqLa    :false,
            errReqNul   :false,
            errReqCor   :false,
            errImgSi    :false,
            errImgNul   :false
            });
        }
        nomChange(event){
            this.setState({campNmC: event.target.value});
        }

        captDesc(event){
            this.setState({campDesc:event.target.value});
        }

        captObj(event){
            this.setState({campObj:event.target.value});
        }

        capDura(event){
            this.setState({campDura:event.target.value});
        }
        captReq(event){
            this.setState({campReq:event.target.value});
        }

        captImg(event){
            this.setState({campImg:event.target.value});
        }

        captEtiq(event){
            this.setState({campEtiq:event.target.value});
        }
        validarCampos(){
            var resp = true;
            this.devolverEstado();
            this.validarNomC();
            this.validarDes();
            this.validarObj();
            this.validReq();
            this.validImg();
            this.validDuraci();
            return resp;
        }
        validarNomC(){
            var resp = true;
            var campoNom=this.state.campNmC;
            if(campoNom==""){
                this.setState({errNmNul:true});
                resp=false;
            }else{
                if(campoNom.length>45){
                    this.setState({errNmLa:true});
                }else{
                    if(campoNom.length<3){
                        this.setState({errNmCor:true});
                    }else{}
                }
            }
            return resp;
        }
        validarDes(){
            var resp=true;
            var campoDes=this.state.campDesc;
            if(campoDes==""){
                this.setState({errDesNul:true});
            }else{
                if(campoDes.length<20){
                    this.setState({errDesCor:true});
                }else{}
            }
            return resp;
        }
        validarObj(){
            var resp=true;
            var campoObj=this.state.campObj;
            if(campoObj==""){
                this.setState({errObjNul:true});
            }else{
                if(campoObj.length>127){
                    this.setState({errObjLa:true});
                }else{
                    if(campoObj.length<20){
                        this.setState({errObjCor:true});
                    }else{}
                }
            }
            return resp;
        }

        validDuraci(){
            var resp=true;
            var campoDur=this.state.campDura;
            if(campoDur==""){
                this.setState({errDuraNul:true});
            }else{
                if(campoDur.length>4){
                this.setState({errDuraLar:true});
                }else{
                    if(/[^A-Za-z-ZñÑáéíóúÁÉÍÓÚ\sd]/.test(campoDur)){
                        /* this.setState({errDuraLet:true}); */

                    }else{
                        this.setState({errDuraLet:true});
                    }
                }
            }
            return true;
        }
        validReq(){
            var resp=true;
            var campRequis=this.state.campReq;
            if(campRequis==""){
                this.setState({errReqNul:true});
            }else{
                if(campRequis.length>250){
                    this.setState({errReqLa:true});
                }else{
                    if(campRequis.length<5){
                        this.setState({errReqCor:true});
                    }else{}
                }
            }
            return resp;
        }

        validImg(){
            var camImg=this.state.campImg;
            var exp =
      /(\b(((https?|ftp|file|):\/\/)|www[.])[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/;
            if(camImg==""){
                this.setState({errImgNul:true});
            }else{
                
            }
        }

        validEtiq(){
            var camEti=this.state.campEtiq;
            if(camEti==""){     /* verificar si ya hay algun etiquete */
                this.setState({errEtiqNul:true});
            }else{}
        }

        validarCurso(){
            var estaBien=this.validarCampos();
        }
    render(){
        return(
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link
            rel="stylesheet"
            href="https://www.w3schools.com/w3css/4/w3.css"
            />
            <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <script
            src="https://kit.fontawesome.com/a076d05399.js"
            crossorigin="anonymous"
            ></script>
            <title>Document</title>
        </head>

        <body>
            <div id='fondoCursoCol'>
                
                    <div className='primFil'>
                        <h1>CrearCurso</h1>
                        <div className='encolumnar'>
                           <div className='alinearCamp'>
                            <p className='unalineaNom'>Nombre de curso:</p>
                            <textarea name="nombreCurso" id="" cols="30" rows="2" placeholder="Inserte un nombre al curso"
                                value={this.state.campoNombreC} onChange={this.nomChange}
                            ></textarea>
                            
                            </div>
                            <div >
                                {this.state.errNmLa?    <p className='alertMsg'>El nombre no debe tener más de 45 caracteres</p>    : null} 
                                {this.state.errNmCor?    <p className='alertMsg'>Debe insertar más de 2 caracteres</p>    : null} 
                                {this.state.errNmNul?    <p className='alertMsg'>El campo es obligatorio</p>    : null}
                            </div> 
                        </div>
                        
                        <div className='encolumnarAre'>
                            <div className='alinearCamp'>
                                <p className='nombrEtiquet'>Descripcion:</p>
                            
                                <textarea name="descrip"  cols="30" rows="5" placeholder="Describa las caracteristicas del curso"
                                    value={this.state.campDesc} onChange={this.captDesc}
                                ></textarea>
                            
                            </div>
                                <div >
                                    {this.state.errDesCor?    <p className='alertMsg'>Debe insertar más de 20 caracteres</p>    : null} 
                                    {this.state.errDesNul?    <p className='alertMsg'>El campo es obligatorio</p>    : null}
                                </div>
                        </div>
                        <div className='encolumnarAre'>   {/* El campo Objetivo no debe tener menos de 20 caracteres */}
                            <div className='alinearCamp'>
                                <p className='nombrEtiquetObj'>Objetivo:</p>
                            
                                <textarea name="objetivo"  cols="30" rows="5" placeholder="Describa las caracteristicas del curso"
                                    value={this.state.campObj} onChange={this.captObj}
                                ></textarea>
                            
                            </div>
                                <div >
                                    {this.state.errObjCor?    <p className='alertMsg'>Debe insertar más de 20 caracteres</p>    : null} 
                                    {this.state.errObjNul?    <p className='alertMsg'>El campo es obligatorio</p>    : null}
                                    {this.state.errObjLa?    <p className='alertMsg'>El campo Objetivo no debe tener más de 127 caracteres</p>    : null}
                                </div>
                        </div>

                        <div className='encolumnarAre'>
                            <div className='alinearCamp'>
                                <p className='unalinea'>Requisitos previos:</p>
                                <textarea name="requisitos" id="" cols="30" rows="5" placeholder="Ingrese las habilidades o conocimientos previos para tomar el curso"
                                    value={this.state.campReq} onChange={this.captReq}
                                ></textarea>
                            </div>
                            <div >
                                    {this.state.errReqLa?    <p className='alertMsg'>Los requisitos no deben tener más de 250 caracteres</p>    : null} 
                                    {this.state.errReqCor?    <p className='alertMsg'>Debe insertar más de 5 caracteres</p>    : null} 
                                    {this.state.errReqNul?    <p className='alertMsg'>El campo es obligatorio</p>    : null}
                                </div>
                        </div>

                        <div className='encolumnarAre'>
                            <div className='alinearCamp'>
                                <p className='alinDuracion'>Duracion:</p>
                                <input name="duracion" type="text" cols="4" placeholder="cantidad de dias"
                                value={this.state.campDura} onChange={this.capDura}
                                />
                            </div>
                            <div> {/* ver si hay advertencia */}
                            {this.state.errDuraLar?    <p className='alertMsg'>El nombre no debe tener más de 4 cifras</p>    : null} 
                                {this.state.errDuraLet?    <p className='alertMsg'>Debe insertar un numero</p>    : null} 
                                {this.state.errDuraNul?    <p className='alertMsg'>El campo es obligatorio</p>    : null}
                            </div>
                        </div>
                    </div>

                    <div className='segColum'>{/* no se si esta clase sea muy necesaria */}
                        {/* boton para volver */}
                        <div className='btnVolv'>
                            <button id='EstiloBnt'>volver</button>
                        </div>
                        
                        <div className='encolumnar'>
                            <div className='alinearCamp'>
                                <p className='alingImg'>Insertar Imagen:</p>
                                <input name="imagen" type="text" placeholder="Inserte url de la imagen"
                                    value={this.state.campImg}   onChange={this.captImg}
                                />
                            </div>
                                <div >
                                    {this.state.errImgSi?    <p className='alertMsg'>no es una url</p>    : null} 
                                
                                    {this.state.errImgNul?    <p className='alertMsg'>El campo es obligatorio</p>    : null}
                                </div>
                        </div>
                        
                        <div className='encolumnar'>
                            <div className='alinearCamp'>
                                <p className='unaLin'>Palabras clave:</p>
                                <input type="text" placeholder="Inserte palabra clave"
                                    value={this.state.keyword} onChange={this.handleChange} 
                                    /* value={this.state.campEtiq} onChange={this.captEtiq} */
                                />{/* no estoy seguro de esto */}
                                <button  id='EstiloBnt' className='posBtnG' class="w3-button "  onClick={this.validarInicio} >Insertar</button>
                            </div>
                            <div>
                                {this.state.errEtiqNul? <p className='alertMsg'>El campo es obligatorio</p> :null}
                                {this.state.errEtiqLar? <p className='alertMsg'>No debe tener más de 15 caracteres</p>:null}
                            </div>
                        </div>
                        
                        <div className='encolumnar'>
                            {/* <div className='card'>
                                    <button className='btnCerrar'>x</button>
                                </div> */}
                            {
                                this.state.keywords.map(keyw => {
                                    return(
                                        <div className='card' key = {this.state.keyAv++}>
                                            {keyw}
                                            <button className='btnCerrar' onClick={() => this.borrarKWord(keyw)} >x</button>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className='posBtnG'>
                            <button  id='EstiloBnt'  className="w3-button "  onClick={this.validarCurso} >Guardar Curso</button>
                        </div>
                    </div>

                

                
            </div>
        </body>
        </html>
        );
    }
}
export default withRouter(CreacionCurso);