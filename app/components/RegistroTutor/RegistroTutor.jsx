import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./RegistroTutor.css";
class RegistroTutor extends Component {
 constructor(props) {
   super(props);
 
   this.state = {
     idUs: this.props.idenUsuario(),
     texTrabActual: "",
     textTrabAnter: "",
     textTrabExtra: "",
     link: "",
 
     infoPersonal1: "Auto didacta",
     infoPersonal2: "Tecnico",
     infoPersonal3: "Grado",
     infoPersonal4: "Posgrado",
     infoPersonal5: "Maestría",
     infoPersonal6: "Doctorado",
 
     noSeleccionado: false,
     valorRadio: "",
 
     anteriorDebeRell: false,
     anteriorMaximo: false,
     anteriorMinimo: false,
     anteriorCaracEspe: false,
 
     actualDebeRell: false,
     actualMaximo: false,
     actualMinimo: false,
     actualCaraEspe: false,
 
     extraMaximo: false,
     extraMinimo: false,
     extraCaraEspe: false,
 
     linkMaximo: false,
     linkMinimo: false,
     linkAlmenosDo: false,
     debeSerLinkOurl: false,
     ocultarCampoLink: false,
     linkRegistrado: false,
     regisExitoso: false,
     linkRegistrado1: false,
     linkRegistrado2: false,
   };
   this.links = [];
   this.changeTrabActual = this.changeTrabActual.bind(this);
   this.changeTrabAnteri = this.changeTrabAnteri.bind(this);
   this.changeTrabExtra = this.changeTrabExtra.bind(this);
   this.mostrarFormInfoPersonal = this.mostrarFormInfoPersonal.bind(this);
   this.guardarLink = this.guardarLink.bind(this);
   this.changeLink = this.changeLink.bind(this);
   this.mostrarFormLinks = this.mostrarFormLinks.bind(this);
   this.validarAll = this.validarAll.bind(this);
   this.validarErrores = this.validarErrores.bind(this);
   this.validarCadenasTexto1 = this.validarCadenasTexto1.bind(this);
   this.validarCadenasTexto2 = this.validarCadenasTexto2.bind(this);
   this.validarCadenasTexto3 = this.validarCadenasTexto3.bind(this);
   this.changeRadio = this.changeRadio.bind(this);
   this.validarInfoPer = this.validarInfoPer.bind(this);
   this.linksVad = this.linksVad.bind(this);
   this.devolverValoresState1 = this.devolverValoresState1.bind(this);
 
   this.mandarAsuVistaTutor = this.mandarAsuVistaTutor.bind(this);
 }
 changeTrabActual(event) {
   this.setState({ texTrabActual: event.target.value });
 }
 changeTrabAnteri(event) {
   this.setState({ textTrabAnter: event.target.value });
 }
 changeTrabExtra(event) {
   this.setState({ textTrabExtra: event.target.value });
 }
 changeLink(event) {
   this.setState({ link: event.target.value });
 }
 
 devolverValoresState1() {
   this.setState({
     noSeleccionado: false,
 
     anteriorDebeRell: false,
     anteriorMaximo: false,
     anteriorMinimo: false,
     anteriorCaracEspe: false,
 
     actualDebeRell: false,
     actualMaximo: false,
     actualMinimo: false,
     actualCaraEspe: false,
 
     extraMaximo: false,
     extraMinimo: false,
     extraCaraEspe: false,
 
     linkMaximo: false,
     linkMinimo: false,
     linkAlmenosDo: false,
     debeSerLinkOurl: false,
   });
 }
 
 validarAll() {
   this.devolverValoresState1();
   var cadVali1 = this.validarCadenasTexto1();
   var cadVali2 = this.validarCadenasTexto2(this.state.texTrabActual);
   var cadVali3 = this.validarCadenasTexto3(this.state.textTrabExtra);
   var infoPer = this.validarInfoPer();
   var linksVad = this.linksVad();
 
   if (cadVali1 && cadVali2 && cadVali3 && infoPer && linksVad) {
     var data = {
       USUARIO_id_usuario: this.state.idUs,
       academicTraining: this.state.valorRadio,
       lastJob: this.state.textTrabAnter,
       currentJob: this.state.texTrabActual,
       extraJob: this.state.textTrabExtra,
       profileLink:
         this.links[0] +
         " " +
         this.links[1] +
         " " +
         this.links[2] +
         " " +
         this.links[3],
     };
 
     fetch("/api/cursos/registerTutor", {
       method: "POST",
       body: JSON.stringify(data),
       headers: {
         "Content-Type": "application/json",
       },
     })
       .then((res) => res.json())
 
       .catch((error) => console.error("Error:", error))
       .then((response) => {
         if (response.mensaj == "incorrecto MAL") {
         } else {
           this.setState({ regisExitoso: true });
         }
       });
     this.setState({ regisExitoso: true });
   }
 }
 linksVad() {
   var res = true;
   if (this.links.length < 2) {
     this.setState({ linkAlmenosDo: true });
     res = false;
   }
   return res;
 }
 validarInfoPer() {
   var res = true;
   if (this.state.valorRadio.length === 0) {
     this.setState({ noSeleccionado: true });
     res = false;
   }
   return res;
 }
 validarCadenasTexto1() {
   var res = true;
   var texto = this.state.textTrabAnter;
   if (texto.length == 0) {
     this.setState({ anteriorDebeRell: true });
     return false;
   }
   if (texto.length <= 16) {
     this.setState({ anteriorMinimo: true });
     res = false;
   }
   if (texto.length > 50) {
     this.setState({ anteriorMaximo: true });
     res = false;
   }
   if (/[^A-Za-z-ZñÑáéíóúÁÉÍÓÚ0-9\sd]/.test(texto)) {
     this.setState({ anteriorCaracEspe: true });
     res = false;
   }
   return res;
 }
 validarCadenasTexto2(texto) {
   var res = true;
   if (texto.length == 0) {
     this.setState({ actualDebeRell: true });
     return false;
   }
   if (texto.length <= 16) {
     this.setState({ actualMinimo: true });
     res = false;
   }
   if (texto.length > 50) {
     this.setState({ actualMaximo: true });
     res = false;
   }
   if (/[^A-Za-z-ZñÑáéíóúÁÉÍÓÚ0-9\sd]/.test(texto)) {
     this.setState({ actualCaraEspe: true });
     res = false;
   }
   return res;
 }
 validarCadenasTexto3(texto) {
   var res = true;
   if (texto.length > 0) {
     if (texto.length <= 16) {
       this.setState({ extraMinimo: true });
       res = false;
     }
     if (texto.length > 50) {
       this.setState({ extraMaximo: true });
       res = false;
     }
     if (/[^A-Za-z-ZñÑáéíóúÁÉÍÓÚ0-9\sd]/.test(texto)) {
       this.setState({ extraCaraEspe: true });
     }
   }
   return res;
 }
 changeRadio(event) {
   this.setState({ valorRadio: event.target.value });
   console.log(this.state.valorRadio + "sera");
 }
 mostrarFormInfoPersonal() {
   return (
     <div
       id="formRegisInfoPer"
       class="w3-padding w3-left  w3-card-4 w3-white"
       name="infoPersonal"
     >
       <h3> Información personal</h3>
 
       <div>
         <input
           className="inputs"
           type="radio"
           id="info1"
           name="drone"
           value={this.state.infoPersonal1}
           onChange={this.changeRadio}
         />
         <label for={this.state.infoPersonal1}>
           {this.state.infoPersonal1}
         </label>
       </div>
 
       <div>
         <input
           type="radio"
           id="info2"
           name="drone"
           value={this.state.infoPersonal2}
           onChange={this.changeRadio}
         />
         <label for={this.state.infoPersonal2}>
           {this.state.infoPersonal2}
         </label>
       </div>
 
       <div>
         <input
           type="radio"
           id="info3"
           name="drone"
           value={this.state.infoPersonal3}
           onChange={this.changeRadio}
         />
         <label for={this.state.infoPersonal3}>
           {this.state.infoPersonal3}
         </label>
       </div>
 
       <div>
         <input
           type="radio"
           id="info4"
           name="drone"
           value={this.state.infoPersonal4}
           onChange={this.changeRadio}
         />
         <label for={this.state.infoPersonal4}>
           {this.state.infoPersonal4}
         </label>
       </div>
       <div>
         <input
           type="radio"
           id="info5"
           name="drone"
           value={this.state.infoPersonal5}
           onChange={this.changeRadio}
         />
         <label for={this.state.infoPersonal5}>
           {this.state.infoPersonal5}
         </label>
       </div>
       <div>
         <input
           type="radio"
           id="info6"
           name="drone"
           value={this.state.infoPersonal6}
           onChange={this.changeRadio}
         />
         <label for={this.state.infoPersonal6}>
           {this.state.infoPersonal6}
         </label>
       </div>
       {this.state.noSeleccionado ? (
         <p className="alertas">Debe seleccionar un campo</p>
       ) : null}
     </div>
   );
 }
 mostrarFormLinks() {
   return (
     <div>
       <div
         id="formRegisLinks"
         class="w3-padding w3-right  w3-card-4 w3-white"
       >
         <h3>
           Link a información extra de github,linkedin o canal de YouTube
         </h3>
         <ul>
           {this.state.ocultarCampoLink ? null : (
             <div>
               <input
                 id="inputLink"
                 type="text"
                 placeholder="Link a su información extra"
                 value={this.state.link}
                 onChange={this.changeLink}
               />
               <div className="w3-button" onClick={this.guardarLink}>
                 <i className="fas fa-check-square" id="iconWorkRegis"></i>
               </div>
             </div>
           )}
         </ul>
         <div className="alertas" id="alertsLinks">
           {this.state.linkMaximo ? (
             <p>
               El número máximo de caracteres permitidos es de 3000 El número
             </p>
           ) : null}
           {this.state.linkMinimo ? <p>Mínimo de caracteres es de 5</p> : null}
           {this.state.linkAlmenosDo ? (
             <p>Debe llenar al menos dos links</p>
           ) : null}
           {this.state.debeSerLinkOurl ? <p>Debe ser un link o url</p> : null}
           {this.state.linkRegistrado ? (
             <p>link registrado exitosamente! agregue siguiente</p>
           ) : null}
           {this.state.linkRegistrado1 ? (
             <p>link registrado exitosamente!, si gusta agregue siguiente</p>
           ) : null}
 
           {this.state.linkRegistrado2 ? (
             <h4>Registro de links concluido!</h4>
           ) : null}
         </div>
       </div>
     </div>
   );
 }
 validarErrores() {
   var res = true;
   var exp =
     /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
 
   if (this.state.link.length < 5) {
     this.setState({ linkMinimo: true });
     res = false;
   }
   if (this.state.link >= 3001) {
     this.setState({ linkMaximo: true });
     res = false;
   }
   //revisar eso ojo!!
   var primer = exp.test(this.state.link);
   var segund = this.state.link.includes(".");
   if (primer || segund) {
     this.setState({ debeSerLinkOurl: false });
   } else {
     this.setState({ debeSerLinkOurl: true });
     res = false;
   }
   return res;
 }
 guardarLink() {
   this.setState({
     linkMaximo: false,
     linkMinimo: false,
     linkAlmenosDo: false,
     linkRegistrado: false,
     linkRegistrado1: false,
     linkRegistrado2: false,
   });
   var val = this.validarErrores();
   if (val) {
     if (this.links.length < 3) {
       if (this.links.length <= 0) {
         this.links.push(this.state.link);
         this.setState({ link: "" });
         this.setState({ linkRegistrado: true });
       } else {
         this.links.push(this.state.link);
         this.setState({ link: "" });
         this.setState({ linkRegistrado1: true });
       }
     } else {
       if (this.links.length == 3 ) {
         this.setState({ ocultarCampoLink: true });
         this.setState({ linkRegistrado2: true });
       }
     }
   }
 }
 mandarAsuVistaTutor() {
   this.props.history.push("/tutor");
   window.location.href = window.location.href;
 }
 
 render() {
   return (
     <html lang="en">
       <head>
         <meta name="viewport" content="width=device-width, initial-scale=1" />
         <link
           rel="stylesheet"
           href="https://www.w3schools.com/w3css/4/w3.css"
         />
         <link
           rel="stylesheet"
           href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
         />
         <link
           rel="stylesheet"
           href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
           integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
           crossorigin="anonymous"
         />
         <script
           src="https://kit.fontawesome.com/a076d05399.js"
           crossorigin="anonymous"
         ></script>
         <title>Document</title>
       </head>
       <body>
         {this.state.regisExitoso ? (
           <div className="popup">
             <div className="popup_inner">
               <p className="textoPopup">Registro exitoso!</p>
               <button className="btnOk" onClick={this.mandarAsuVistaTutor}>
                 Aceptar
               </button>
             </div>
           </div>
         ) : null}
         <div
           id="formResgistroTutor"
           class="w3-container w3-card-4 w3-light-grey"
         >
           <h1 id="titulo" class="w3-center">
             Se un tutor de Wdemy
           </h1>
           {this.mostrarFormInfoPersonal()}
           {this.mostrarFormLinks()}
           <form
             id="formRegisTrab"
             class="w3-padding w3-center  w3-card-4 w3-white"
           >
             <h3>Trabajo</h3>
             <ul>
               <i class="fas fa-briefcase" id="iconWorkRegis"></i>
               <input
                 id="inputTrabajo"
                 type="text"
                 placeholder="Trabajo anterior"
                 value={this.state.textTrabAnter}
                 onChange={this.changeTrabAnteri}
               />
             </ul>
             <div className="alertas">
               {this.state.anteriorDebeRell ? (
                 <p>Debe rellenar este campo.</p>
               ) : null}
               {this.state.anteriorMaximo ? (
                 <p>El texto debe ser menor a 50 caracteres.</p>
               ) : null}
               {this.state.anteriorMinimo ? (
                 <p>El texto debe contener más de 15 caracteres .</p>
               ) : null}
 
               {this.state.extraCaraEspe ? (
                 <p>No se aceptan caracteres especiales.</p>
               ) : null}
             </div>
             <ul>
               <i class="fas fa-building" id="iconWorkRegis"></i>
               <input
                 id="inputTrabajo"
                 type="text"
                 placeholder="Trabajo actual "
                 value={this.state.texTrabActual}
                 onChange={this.changeTrabActual}
               />
             </ul>
             <div className="alertas">
               {this.state.actualDebeRell ? (
                 <p>Debe rellenar este campo.</p>
               ) : null}
               {this.state.actualMaximo ? (
                 <p>El texto debe ser menor a 50 caracteres.</p>
               ) : null}
               {this.state.actualMinimo ? (
                 <p>El texto debe contener más de 15 caracteres .</p>
               ) : null}
               {this.state.anteriorCaracEspe ? (
                 <p>No se aceptan caracteres especiales.</p>
               ) : null}
             </div>
             <ul>
               <i class="fas fa-briefcase" id="iconWorkRegis"></i>
               <input
                 id="inputTrabajo"
                 type="text"
                 placeholder="Trabajo extra( si lo hubiera)"
                 value={this.state.textTrabExtra}
                 onChange={this.changeTrabExtra}
               />
             </ul>
             <div className="alertas">
               {this.state.extraMaximo ? (
                 <p>El texto debe ser menor a 50 caracteres.</p>
               ) : null}
               {this.state.extraMinimo ? (
                 <p>El texto debe contener más de 15 caracteres .</p>
               ) : null}
               {this.state.extraCaraEspe ? (
                 <p>No se aceptan caracteres especiales.</p>
               ) : null}
             </div>
           </form>
           <button
             className="w3-button"
             id="btnRegistroTutor"
             onClick={this.validarAll}
           >
             Registrarse
           </button>
         </div>
       </body>
     </html>
   );
 }
}
 
export default withRouter(RegistroTutor);