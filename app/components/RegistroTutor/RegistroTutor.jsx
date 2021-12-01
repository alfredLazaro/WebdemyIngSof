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
            </form>
            <ul>mensaje de error</ul>
            <form
              id="formRegisLinks"
              class="w3-padding w3-right  w3-card-4 w3-white"
            >
              <h3>Links</h3>
              <ul>
                <input
                  type="text"
                  value={this.state.link1}
                />
              </ul>
              <ul>mensaje de error</ul>
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
              <ul>mensaje de error</ul>
              <ul>
                <input
                  id="inputTrabajo"
                  type="text"
                  placeholder="            Trabajo actual "
                  value={this.state.texTrabActual}
                  onChange={this.changeTrabActual}
                />
              </ul>
              <ul>
                <h10>Debe rellenar este campo El texto debe ser menor a 50 caracteres</h10>
              </ul>
              <ul>El texto debe ser menor a 50 caracteres</ul>
              <ul> El texto debe contener más de 15 caracteres </ul>
              <ul> No se aceptan caracteres especiales.</ul>
              <ul>
                <input
                  id="inputTrabajo"
                  type="text"
                  placeholder="            Trabajo extra( si lo hubiera)"
                  value={this.state.textTrabExtra}
                  onChange={this.changeTrabExtra}
                />
              </ul>
              <ul>mensaje de error</ul>
            </form>
            <ul>mensaje de error</ul>
            <button id="btnRegistroTutor">Registrarse</button>
          </form>
        </body>
      </html>
    );
  }
}

export default withRouter(RegistroTutor);
