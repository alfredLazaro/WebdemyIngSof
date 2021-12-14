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

            respuestaDur:true,

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
            errDuraLar  :false,
            errEtiqNoHay:false,
            errEtiqNoper:false,

            idCurso: this.props.idenCurso(),
            idUsuario: this.props.idenUsuario(),
            idTutor: 0,
        }
        this.validarInicio = this.validarInicio.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.borrarKWord = this.borrarKWord.bind(this);
        this.nomChange           = this.nomChange.bind(this);
        this.captDesc            = this.captDesc.bind(this);
        this.captObj             = this.captObj.bind(this);
        this.capDura             = this.capDura.bind(this);
        this.captReq             = this.captReq.bind(this);
        this.captImg             = this.captImg.bind(this);
        this.captEtiq            = this.captEtiq.bind(this);
        this.devolverEstado      = this.devolverEstado.bind(this);
        this.validarCampos       = this.validarCampos.bind(this);
        this.validarNomC         = this.validarNomC.bind(this);
        this.validarDes          = this.validarDes.bind(this);
        this.validarObj          = this.validarObj.bind(this);
        this.validReq            = this.validReq.bind(this);
        this.validImg            = this.validImg.bind(this);
        this.volver              = this.volver.bind(this);
        this.validEtiq           = this.validEtiq.bind(this);
        this.validarCurso        = this.validarCurso.bind(this);
        this.fetchIdTutor        = this.fetchIdTutor.bind(this);
        this.handleChar          = this.handleChar.bind(this);
        this.fetchInfoCurso      = this.fetchInfoCurso.bind(this);
        this.fetchEtiquetas      = this.fetchEtiquetas.bind(this);
        this.addEtiqueta         = this.addEtiqueta.bind(this);
        this.deleteCursoEtiq     = this.deleteCursoEtiq.bind(this);
        this.deleteEtiquetas     = this.deleteEtiquetas.bind(this);
        this.onCharEtiq          = this.onCharEtiq.bind(this);
        this.handlePasteEtiq     = this.handlePasteEtiq.bind(this);

    }   
    validarInicio(){
        /*No valida por ahora, solo ingresa a la lista de keywords*/
        console.log(this.state.keyword);
        this.devolvEstadiEtiq();
        
        var camImg=this.state.keyword;
        console.log(camImg);
            if(camImg==""){
                this.setState({errEtiqNul:true});
            }else{
                if(camImg.length>15){
                    this.setState({errEtiqLar:true});
                }else{
                  var n;
                  var patron = /[-#+a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s]/;
                  var ok = true;
                  for(n=0;n<camImg.length && ok;n++){
                    var letra = camImg.charAt(n);

                    if(!patron.test(letra)){
                       ok = false;
                       this.setState({errEtiqNoper:true});
                    }
                  }
                  if(ok){
                    this.state.keywords.push(this.state.keyword); //Agrega a lista
                    this.setState({keyword: ''});
                    this.forceUpdate() //grafica nuevos elementos
                  }
                }
            }

    }

  devolvEstadiEtiq(){
    this.setState({
      errEtiqLar: false,
      errEtiqNul: false,
      errEtiqNoper: false,
    });
  }

  handleChange(event) {
    var camImg = event.target.value;
    var n;
    var patron = /[-#+a-zA-ZñÑáéíóúÁÉÍÓÚ0-9\s]/;
    var ok = true;
    for(n=0;n<camImg.length && ok;n++){
      var letra = camImg.charAt(n);
      if(!patron.test(letra)){
         ok = false;
      }
    }
    if(ok){
      this.setState({ value: event.target.value });
    }
    event.preventDefault();
  }

  handlePasteEtiq(event){
    console.log("Se pego");
    //event.preventDefault();
  }

  onCharEtiq(e){
    var tecla = e.charCode;
    if (tecla == 8 || tecla == 13) {
      return true;
    }
    if (tecla == 32){ //Borra espacios
      e.preventDefault();
      return false;
    }else{
      return true;
    }
  }

  borrarKWord(kword) {
    var arr = this.state.keywords;
    var i = arr.indexOf(kword);

    if (i !== -1) {
      arr.splice(i, 1);
    }

    this.setState({
      keywords: arr,
    });
  }

  devolverEstado() {
    this.setState({
      errNmLa: false,
      errNmCor: false,
      errNmNul: false,
      errDesNul: false,
      errDesCor: false,
      errObjLa: false,
      errObjCor: false,
      errObjNul: false,

      errReqLa: false,
      errReqNul: false,
      errReqCor: false,
      errImgSi: false,
      errImgNul: false,
      errEtiqNul: false,
      errEtiqLar: false,
      errDuraNul: false,
      errDuraLet: false,
      errDuraLar: false,
      errEtiqNoHay: false,
      errEtiqNoper: false,
    });
  }
  nomChange(event) {
    this.setState({ campNmC: event.target.value });
  }

  captDesc(event) {
    this.setState({ campDesc: event.target.value });
  }

  captObj(event) {
    this.setState({ campObj: event.target.value });
  }

  capDura(event) {
    this.setState({ campDura: event.target.value });
  }
  captReq(event) {
    this.setState({ campReq: event.target.value });
  }

  captImg(event) {
    this.setState({ campImg: event.target.value });
  }

  captEtiq(event) {
    this.setState({ campEtiq: event.target.value });
  }
  validarCampos() {
    var resp = true;
    this.devolverEstado();
    var v1 = this.validarNomC();
    var v2 = this.validarDes();
    var v3 = this.validarObj();
    var v4 = this.validReq();
    var v5 = this.validImg();
    var v6 = this.validDuraci();
    var v7 = this.validEtiq();
    if (v1 && v2 && v3 && v4 && v5 && v6 && v7) {
      resp = true;
    } else {
      resp = false;
    }
    return resp;
  }
  validarNomC() {
    var resp = true;
    var campoNom = this.state.campNmC;
    if (campoNom == "") {
      this.setState({ errNmNul: true });
      resp = false;
    } else {
      if (campoNom.length > 45) {
        this.setState({ errNmLa: true });
        resp = false;
      } else {
        if (campoNom.length < 3) {
          this.setState({ errNmCor: true });
          resp = false;
        } else {
        }
      }
    }
    return resp;
  }
  validarDes() {
    var resp = true;
    var campoDes = this.state.campDesc;
    if (campoDes == "") {
      this.setState({ errDesNul: true });
      resp = false;
    } else {
      if (campoDes.length < 20) {
        this.setState({ errDesCor: true });
        resp = false;
      } else {
        if (campoDes.length > 4095) {
        } else {
        }
      }
    }
    return resp;
  }
  validarObj() {
    var resp = true;
    var campoObj = this.state.campObj;
    if (campoObj == "") {
      this.setState({ errObjNul: true });
      resp = false;
    } else {
      if (campoObj.length > 127) {
        this.setState({ errObjLa: true });
        resp = false;
      } else {
        if (campoObj.length < 20) {
          this.setState({ errObjCor: true });
          resp = false;
        } else {
        }
      }
    }
    return resp;
  }

  validDuraci() {
    var resp = true;
    var campoDur = this.state.campDura;
    var patron = /[0-9\s]/;
    if (campoDur == "") {
      this.setState({ errDuraNul: true });
      resp = false;
    } else {
      if (campoDur.length > 3) {
        this.setState({ errDuraLar: true });
        resp = false;
      } else {
        /* if(/[^A-Za-z-ZñÑáéíóúÁÉÍÓÚ\sd]/.test(campoDur)){


                    }else{
                        this.setState({errDuraLet:true});
                        resp=false;
                    } */

        /* for(i=0;i<campoDur.length;i++){
                        console.log("entra al for")
                        if(patron.test(campoDur.charAt(i))){
                            console.log("entra al if")

                        }else{
                            console.log("puse algo mal")
                            this.setState({errDuraLet:true});

                        }
                    } */

        if (this.state.respuestaDur) {
        } else {
          this.setState({ errDuraLet: true });

          resp = false;
        }
      }
    }
    return resp;
  }

  handleChar(e) {
    this.devolverEstado();
    var tecla = e.charCode;
    var patron = /[0-9\s]/;
    var tecla_final = String.fromCharCode(tecla);
    if (patron.test(tecla_final)) {
      this.setState({ respuestaDur: true });
      this.setState({ errDuraLet: false });
    } else {
      /* this.setState({errDuraLet:true}); */

      console.log("no meti un numero");
      this.setState({ respuestaDur: false });
      console.log(this.state.respuestaDur);
    }
  }

  validReq() {
    var resp = true;
    var campRequis = this.state.campReq;
    if (campRequis == "") {
      this.setState({ errReqNul: true });
      resp = false;
    } else {
      if (campRequis.length > 250) {
        this.setState({ errReqLa: true });
        resp = false;
      } else {
        if (campRequis.length < 5) {
          this.setState({ errReqCor: true });
          resp = false;
        } else {
        }
      }
    }
    return resp;
  }

  validImg() {
    var resp = true;
    var camImg = this.state.campImg;
    var exp =
      /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
    if (camImg == "") {
      this.setState({ errImgNul: true });
      resp = false;
    } else {
      if (!exp.test(camImg)) {
        this.setState({
          errImgSi: true,
        }); /* no estoy seguro pero parece que funca */
      } else {
      }
    }
    return resp;
  }

  validEtiq() {
    var resp = true;
    var camEti = this.state.campEtiq;
    if (this.state.keywords.length == 0) {
      /* verificar si ya hay algun etiquete */
      this.setState({ errEtiqNoHay: true });

      resp = false;
    } else {
    }
    return resp;
  }

  validarCurso() {
    console.log("esta funcionando");
    var estaBien = this.validarCampos();
    var idCurso = 0;
    /* this.setState({creacionExitosa:true}); */
    console.log(estaBien);
    if (estaBien) {
      this.setState({ creacionExitosa: true });
      if(this.state.idCurso == 0){ //Creo curso desde cero
        try {
          var data = {
            idTutor: this.state.idTutor,
            nombreC: this.state.campNmC,
            image: this.state.campImg,
            description: this.state.campDesc,
            objetives: this.state.campObj,
            requirements: this.state.campReq,
            duration: this.state.campDura,
            tags: this.state.keywords,
          };
          fetch("/api/cursos/crearcurso", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
              idCurso = response.idCurso.id_curso; //No porque se salva asi
              
              if(idCurso != 0){//Comprueba que se guarde un id
                console.log("Se actualizo el id de Curso");
                var tags = this.state.keywords;
                for (var i = 0; i < tags.length; i++) {
                  this.addEtiqueta(tags[i], idCurso); //Agrega tags en caso de ser necesario
                }
              }
  
            });
        } catch (eer) {
          console.log(eer);
          console.log("No se envió el curso.");
        }
      }else{//Alterar datos en BD
        //Alterar datos en tabla curso
        try {
          var data = {
            TUTOR_id_tutor: this.state.idTutor,
            nombre: this.state.campNmC,
            imagen: this.state.campImg,
            descripcion: this.state.campDesc,
            litle_descripcion: this.state.campObj,
            requisitos: this.state.campReq,
            duracion: this.state.campDura,
            id_curso: this.state.idCurso
          };
          fetch("/api/cursos/crearcurso/updateCurso", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
        } catch (eer) {
          console.log(eer);
          console.log("No se envió el curso.");
        }
        //Eliminar vinculos a curso de etiquetas
        this.deleteCursoEtiq(this.state.idCurso);
        //Agregar nuevas etiquetas
        //Agregar nuevos vinculos de etiquetas
        var tags = this.state.keywords;
        for (var i = 0; i < tags.length; i++) {
          this.addEtiqueta(tags[i],this.state.idCurso); //Agrega tags en caso de ser necesario y enlace
        }
        //Eliminar etiquetas que no sean usadas (opc ?)
        this.deleteEtiquetas();
      }
    }
  }
  volver() {
    this.props.history.push("/tutor")
    window.location.href = window.location.href; 
  }
        componentDidMount(){
            this.fetchIdTutor(this.state.idUsuario);
            if(this.state.idCurso!=0){
                this.fetchInfoCurso(this.state.idCurso);
                this.fetchEtiquetas(this.state.idCurso);
            }
            this.forceUpdate();
        }
        fetchInfoCurso(idCurso){
            fetch(`/api/cursos/${idCurso}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    campNmC: data.nombre,
                    campDesc: data.descripcion,
                    campObj: data.litle_descripcion,
                    campImg: data.imagen,
                    campReq: data.requisitos,
                    campDura: data.duracion
                });
            });
        }
        fetchEtiquetas(idCurso){
            fetch(`/api/cursos/${idCurso}/etiquetas`)
            .then(res => res.json())
            .then(data => {
                data.map(keyword => {
                    this.state.keywords.push(keyword.nombre);
                })
            });
        }
        fetchIdTutor(idUsuario){
            fetch(`/api/cursos/idtutor/${idUsuario}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    idTutor: data.id_tutor
                });
            });
        }

        addEtiqueta(etiq, idCurs){
          try {
            var data = {
              etiqueta: etiq
            };
            fetch("/api/cursos/crearcurso/addEtiqueta", {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .catch((error) => console.error("Error:", error))
              .then((response) => {
                //Agrega a vinculo con el curso
                var datos = {
                  idEtiqueta: response.id_etiqueta,
                  idCurso: idCurs
                };
                fetch("/api/cursos/crearcurso/addCursoEtiq", {
                  method: "POST",
                  body: JSON.stringify(datos),
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                  .then((res) => res.json())
                  .catch((error) => console.error("Error:", error))
                  
              })
              
          } catch (eer) {
            console.log(eer);
          }
        }
        
        deleteCursoEtiq(idCurso){
          try {
              var data ={
                  idenCurso: idCurso
              };
              fetch(`/api/cursos/crearcurso/deleteCursoEtiq`,{
                  
                  method: 'DELETE',
                  body: JSON.stringify(data),
                  headers:{
                      'Content-Type': 'application/json'
                  }                
              })
          } catch (error) {
              console.log("Error al eliminar")
          }
        }
        deleteEtiquetas(){
          try {
            fetch(`/api/cursos/crearcurso/deleteEtiquetas`,{
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json'
                }                
            })
                .then(res => res.json())
                
          } catch (error) {
              console.log("Error al eliminar")
          }
        }
        
    render(){
        return(
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
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
          {this.state.creacionExitosa ? (
            <div className="popup">
              <div className="popup_inner">
                <p className="textoPopup">Curso Creado Correctamente</p>
                <button className="btnOk" onClick={this.volver}>
                  Aceptar
                </button>
              </div>
            </div>
          ) : null}
          <div id="fondoCursoCol">
            <div className="primFil">
              {this.state.idCurso == 0 ? (
                <h1> Crear Curso </h1>
              ) : (
                <h1> Modificar Curso </h1>
              )}
              <div className="encolumnar">
                <div className="alinearCamp">
                  <p className="unalineaNom">Nombre de curso:</p>
                  <textarea
                    name="nombreCurso"
                    id=""
                    cols="30"
                    rows="2"
                    placeholder="Inserte un nombre al curso"
                    value={this.state.campNmC}
                    onChange={this.nomChange}
                  ></textarea>{" "}
                  {/* Modificado para pruebas en campo value*/}
                </div>
                <div>
                  {this.state.errNmLa ? (
                    <p className="alertMsg">
                      El nombre no debe tener más de 45 caracteres
                    </p>
                  ) : null}
                  {this.state.errNmCor ? (
                    <p className="alertMsg">
                      Debe insertar más de 2 caracteres
                    </p>
                  ) : null}
                  {this.state.errNmNul ? (
                    <p className="alertMsg">El campo es obligatorio</p>
                  ) : null}
                </div>
              </div>

              <div className="encolumnarAre">
                <div className="alinearCamp">
                  <p className="nombrEtiquet">Descripción:</p>

                  <textarea
                    name="descrip"
                    cols="30"
                    rows="5"
                    placeholder="Describa las caracteristicas del curso"
                    value={this.state.campDesc}
                    onChange={this.captDesc}
                  ></textarea>
                </div>
                <div>
                  {this.state.errDesCor ? (
                    <p className="alertMsg">
                      Debe insertar más de 20 caracteres
                    </p>
                  ) : null}
                  {this.state.errDes ? (
                    <p className="alertMsg">
                      Debe insertar más de 20 caracteres
                    </p>
                  ) : null}
                  {this.state.errDesNul ? (
                    <p className="alertMsg">El campo es obligatorio</p>
                  ) : null}
                </div>
              </div>
              <div className="encolumnarAre">
                {" "}
                {/* El campo Objetivo no debe tener menos de 20 caracteres */}
                <div className="alinearCamp">
                  <p className="nombrEtiquetObj">Objetivo:</p>

                  <textarea
                    name="objetivo"
                    cols="30"
                    rows="5"
                    placeholder="Describa las caracteristicas del curso"
                    value={this.state.campObj}
                    onChange={this.captObj}
                  ></textarea>
                </div>
                <div>
                  {this.state.errObjCor ? (
                    <p className="alertMsg">
                      Debe insertar más de 20 caracteres
                    </p>
                  ) : null}
                  {this.state.errObjNul ? (
                    <p className="alertMsg">El campo es obligatorio</p>
                  ) : null}
                  {this.state.errObjLa ? (
                    <p className="alertMsg">
                      El campo Objetivo no debe tener más de 127 caracteres
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="encolumnarAre">
                <div className="alinearCamp">
                  <p className="unalinea">Requisitos previos:</p>
                  <textarea
                    name="requisitos"
                    id=""
                    cols="30"
                    rows="5"
                    placeholder="Ingrese las habilidades o conocimientos previos para tomar el curso"
                    value={this.state.campReq}
                    onChange={this.captReq}
                  ></textarea>
                </div>
                <div>
                  {this.state.errReqLa ? (
                    <p className="alertMsg">
                      Los requisitos no deben tener más de 250 caracteres
                    </p>
                  ) : null}
                  {this.state.errReqCor ? (
                    <p className="alertMsg">
                      Debe insertar más de 5 caracteres
                    </p>
                  ) : null}
                  {this.state.errReqNul ? (
                    <p className="alertMsg">El campo es obligatorio</p>
                  ) : null}
                </div>
              </div>

              <div className="encolumnarAre">
                <div className="alinearCamp">
                  <p className="alinDuracion">Duración:</p>
                  <input
                    name="duracion"
                    className="entrada"
                    type="text"
                    cols="4"
                    placeholder="cantidad de dias"
                    value={this.state.campDura}
                    onChange={this.capDura}
                    onKeyPress={this.handleChar}
                  />
                </div>
                <div>
                  {" "}
                  {/* ver si hay advertencia */}
                  {this.state.errDuraLar ? (
                    <p className="alertMsg">
                      La duración no debe tener más de 3 cifras
                    </p>
                  ) : null}
                  {this.state.errDuraLet ? (
                    <p className="alertMsg">Debe insertar un número entero positivo</p>
                  ) : null}
                  {this.state.errDuraNul ? (
                    <p className="alertMsg">El campo es obligatorio</p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="segColum">
              {/* no se si esta clase sea muy necesaria */}
              {/* boton para volver */}
              <div className="btnVolv">
                <button id="EstiloBnt" onClick={this.volver}>
                  volver
                </button>
              </div>

              <div className="encolumnar">
                <div className="alinearCamp">
                  <p className="alingImg">Insertar Imagen:</p>
                  <input
                    name="imagen"
                    className="entrada"
                    type="text"
                    placeholder="Inserte url de la imagen"
                    value={this.state.campImg}
                    onChange={this.captImg}
                  />
                </div>
                <div>
                  {this.state.errImgSi ? (
                    <p className="alertMsg">no es una url</p>
                  ) : null}
                  {this.state.errImgNul ? (
                    <p className="alertMsg">El campo es obligatorio</p>
                  ) : null}
                </div>
              </div>

              <div className="encolumnar">
                <div className="alinearCamp">
                  <p className="unaLin">Palabras clave::</p>
                  <input
                    type="text"
                    className="entrada"
                    placeholder="Inserte palabra clave"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                    onPaste={this.handlePasteEtiq}
                    onKeyPress={this.onCharEtiq}
                    /* value={this.state.campEtiq} onChange={this.captEtiq} */
                  />
                  {/* no estoy seguro de esto */}
                  <button
                    id="EstiloBnt"
                    className="posBtnG"
                    class="w3-button "
                    onClick={this.validarInicio}
                  >
                    Insertar
                  </button>
                </div>
                <div>
                  {this.state.errEtiqNul ? (
                    <p className="alertMsg">El campo es obligatorio</p>
                  ) : null}
                  {this.state.errEtiqLar ? (
                    <p className="alertMsg">
                      No debe tener más de 15 caracteres
                    </p>
                  ) : null}
                  {this.state.errEtiqNoper ? (
                    <p className="alertMsg">El caracter no es permitido</p>
                  ) : null}
                  {this.state.errEtiqNoHay ? (
                    <p className="alertMsg">Debe insertar palabra clave</p>
                  ) : null}
                </div>
              </div>

              <div className="encolumnar">
                {/* <div className='card'>
                                    <button className='btnCerrar'>x</button>
                                </div> */}
                {this.state.keywords.map((keyw) => {
                  return (
                    <div className="card" key={this.state.keyAv++}>
                      {keyw}
                      <button
                        className="btnCerrar"
                        onClick={() => this.borrarKWord(keyw)}
                      >
                        x
                      </button>
                    </div>
                  );
                })}
              </div>
              {/* <img src="https://i.blogs.es/594843/chrome/450_1000.jpg" alt="prueba" /> */}
              <div className="posBtnG">
                <button
                  id="EstiloBnt"
                  className="w3-button "
                  onClick={this.validarCurso}
                >
                  Guardar Curso
                </button>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}
export default withRouter(CreacionCurso);
