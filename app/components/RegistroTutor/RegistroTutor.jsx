import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./RegistroTutor.css";
class RegistroTutor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texTrabActual: "",
      textTrabAnter: "",
      textTrabExtra: "",
      link: "",

      infoPersonal1: "Auto didacta",
      infoPersonal2: "Tecnico",
      infoPersonal3: "Grado",
      infoPersonal4: "Posgrado",
      infoPersonal5: "Maestria",
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

  validarAll() {
    var cadVali1 = this.validarCadenasTexto1();
    var cadVali2 = this.validarCadenasTexto2(this.state.texTrabActual);
    var cadVali3 = this.validarCadenasTexto3(this.state.textTrabExtra);
    var infoPer = this.validarInfoPer();
    var linksVad = this.linksVad();
    if (cadVali1 && cadVali2 && cadVali3 && infoPer) {
      console.log("todas");
    }
  }
  linksVad() {
    if (this.links.length === 0) {
      this.setState({linkAlmenosDo:true});
    }
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
            id="huey"
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
            id="dewey"
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
            id="louie"
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
            id="louie"
            name="drone"
            value={this.state.infoPersonal3}
            onChange={this.changeRadio}
          />
          <label for={this.state.infoPersonal4}>
            {this.state.infoPersonal4}
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="louie"
            name="drone"
            value={this.state.infoPersonal3}
            onChange={this.changeRadio}
          />
          <label for={this.state.infoPersonal5}>
            {this.state.infoPersonal5}
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="louie"
            name="drone"
            value={this.state.infoPersonal3}
            onChange={this.changeRadio}
          />
          <label for={this.state.infoPersonal6}>
            {this.state.infoPersonal6}
          </label>
        </div>
        {this.state.noSeleccionado ? (
          <p className="alertas">Debe selecionar un campo</p>
        ) : null}
      </div>
    );
  }
  mostrarFormLinks() {
    return (
      <div>
        <form
          id="formRegisLinks"
          class="w3-padding w3-right  w3-card-4 w3-white"
        >
          <h3>Links</h3>
          <ul>
            {this.state.ocultarCampoLink ? null : (
              <div>
                <input
                  id="inputLink"
                  type="text"
                  placeholder="                                                                           Link a su informacion extra"
                  value={this.state.link}
                  onChange={this.changeLink}
                />
                <div className="w3-button">
                  <i
                    className="fas fa-check-square"
                    id="iconWorkRegis"
                    onClick={this.guardarLink}
                  ></i>
                </div>
              </div>
            )}
          </ul>
          <div className="alertas">
            {this.state.linkMaximo ? (
              <p>
                El número máximo de caracteres permitidos es de 3000 El número
              </p>
            ) : null}
            {this.state.linkMinimo ? (
              <p>
                mínimo de caracteres es de 5 Debe llenar con su información al
              </p>
            ) : null}
            {this.state.linkAlmenosDo ? <p>Debe llenar almenos dos campos</p> : null}
            {this.state.debeSerLinkOurl ? <p>Debe ser un link o url</p> : null}
          </div>
        </form>
      </div>
    );
  }
  validarErrores() {
    var res = true;
    var exp =
      /(\b(((https?|ftp|file|):\/\/)|www[.])[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/;

    if (this.state.link.length < 6) {
      this.setState({ linkMinimo: true });
      res = false;
    }
    if (this.state.link >= 3001) {
      this.setState({ linkMaximo: true });
      res = false;
    }
    //revisar eso ojo!!
    if (exp.test(this.state.link) || !this.state.link.includes(".")) {
      this.setState({ debeSerLinkOurl: true });
      res = false;
    }
    return res;
  }
  guardarLink() {
    var val = this.validarErrores();
    if (val) {
      if (this.links.length <= 4) {
        if (this.links.length <= 0) {
          this.links.push(this.state.link);
          this.setState({ link: "" });
          this.setState({ linkAlmenosDo: true });
        } else {
          this.links.push(this.state.link);
          this.setState({ link: "" });
          this.setState({ linkAlmenosDo: false });
        }
      }
      if (this.links.length == 4) {
        this.setState({ ocultarCampoLink: true });
      }
    }
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
          <div
            id="formResgistroTutor"
            class="w3-container w3-card-4 w3-light-grey"
          >
            <h1 class="w3-center">Se un tutor de Wdemy</h1>
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
                  placeholder="            Trabajo anterior"
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
                <i class="fas fa-laptop-house" id="iconWorkRegis"></i>
                <input
                  id="inputTrabajo"
                  type="text"
                  placeholder="            Trabajo actual "
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
                  placeholder="            Trabajo extra( si lo hubiera)"
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
