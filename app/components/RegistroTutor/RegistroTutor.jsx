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
    this.validarErrores = this.validarErrores().bind(this);
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
    let cadVali = validarCadenasTexto();
    let infoPer = validarInfoPer();
    if (cadVali && linkVali && infoPer) {
      //mandamos ala BD
    }
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
          <input type="radio" id="huey" name="drone" value="huey" />
          <label for="huey">{this.state.infoPersonal1}</label>
        </div>

        <div>
          <input type="radio" id="dewey" name="drone" value="dewey" />
          <label for="dewey">{this.state.infoPersonal2}</label>
        </div>

        <div>
          <input type="radio" id="louie" name="drone" value="louie" />
          <label for="louie">{this.state.infoPersonal3}</label>
        </div>

        <div>
          <input type="radio" id="louie" name="drone" value="louie" />
          <label for="louie">{this.state.infoPersonal4}</label>
        </div>
        <div>
          <input type="radio" id="louie" name="drone" value="louie" />
          <label for="louie">{this.state.infoPersonal5}</label>
        </div>
        <div>
          <input type="radio" id="louie" name="drone" value="louie" />
          <label for="louie">{this.state.infoPersonal6}</label>
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
            {this.state.linkAlmenosDo ? <p> almenos dos campos</p> : null}
            {this.state.debeSerLinkOurl ? <p>Debe ser un link o url</p> : null}
          </div>
        </form>
      </div>
    );
  }
  validarErrores() {
    res = true;
    var exp =
      /(\b(((https?|ftp|file|):\/\/)|www[.])[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/;
      console.log("valida0")
    if (this.state.link.length < 6) {
      this.setState({ linkMinimo: true });
      res = false;
      console.log("valida1")
    }
    if (this.state.link >= 3001) {
      this.setState({ linkMaximo: true });
      res = false;
      console.log("valida2")
    }
    if (!exp.test(this.state.link) || !this.state.link.includes(".")) {
      this.setState({debeSerLinkOurl :true});
      console.log("valida3")
    }
    return res;
  }
  guardarLink() {
    val = validarErrores();
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
          <form
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
            <button className="w3-button" id="btnRegistroTutor">
              Registrarse
            </button>
          </form>
        </body>
      </html>
    );
  }
}

export default withRouter(RegistroTutor);
