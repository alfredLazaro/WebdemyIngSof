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
      link1: "",
      link2: "",
      link3: "",
      link4: "",

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
    };
    this.changeTrabActual = this.changeTrabActual.bind(this);
    this.changeTrabAnteri = this.changeTrabAnteri.bind(this);
    this.changeTrabExtra = this.changeTrabExtra.bind(this);
  }
  changeTrabActual() {}
  changeTrabAnteri() {}
  changeTrabExtra() {}

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
            <form
              id="formRegisInfoPer"
              class="w3-padding w3-left  w3-card-4 w3-white"
            >
              <h3> Informacion personal</h3>
              <ul>
                <input type="checkbox" />
              </ul>
              <ul>
                <input type="checkbox" />
              </ul>
              <ul>
                <input type="checkbox" />
              </ul>
              <ul>
                <input type="checkbox" />
              </ul>
              <ul>
                <input type="checkbox" />
              </ul>
              <ul>
                <input type="checkbox" />
              </ul>
              <div className="alertas">
                {this.state.noSeleccionado ? (
                  <p>Debe seleccionar  un campo</p>
                ) : null}
              </div>
            </form>
            <form
              id="formRegisLinks"
              class="w3-padding w3-right  w3-card-4 w3-white"
            >
              <h3>Links</h3>
              <ul>
                <input type="text" value={this.state.link1} />
              </ul>
              <div className="alertas">
                {this.state.linkMaximo ? (
                  <p>
                    El número máximo de caracteres permitidos es de 3000 El
                    número
                  </p>
                ) : null}
                {this.state.linkMinimo ? (
                  <p>
                    mínimo de caracteres es de 5 Debe llenar con su información
                    al
                  </p>
                ) : null}
                {this.state.linkAlmenosDo ? <p> almenos dos campos</p> : null}
              </div>
            </form>
            <form
              id="formRegisTrab"
              class="w3-padding w3-center  w3-card-4 w3-white"
            >
              <h3>Trabajo</h3>
              <ul>
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
            <button id="btnRegistroTutor">Registrarse</button>
          </form>
        </body>
      </html>
    );
  }
}

export default withRouter(RegistroTutor);
