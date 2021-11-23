/*
* El this.setState no asigna valores al primer intento, debes de hacer llamas de una vez para que realize
dicho cambio, si utiliza el componentdidMont() con la consulta previa, este si funciona,
si no va a usar el componentDidMount(), trate de hacer las funciones que necesite dentro del fech de la consulta.
*/

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Registro.css";
class Registro extends Component {
  constructor(props) {
    super(props);
    this.idddd = -1;
    this.idParaRedi = -1;
    this.state = {
      campoNombre: "",
      campoApellido: "",
      campoCorreo: "",
      campoContraseña: "",
      campoConfirContraseña: "",

      errorVacioNombre: false,
      errorCaraEspeciNombre: false,
      maximoCaraNombre: false,
      minimoCaraNombre: false,
      cadVaciasNombre: false,

      errorVacioApellido: false,
      errorCaraEspeciApellido: false,
      maximoCaraApellido: false,
      minimoCaraApellido: false,
      cadVaciasApellido: false,

      maximoCaraCorreo: false,
      dominioFalCorreo: false,
      correoExistente: false,
      puntosContinuosCorreo: false,
      minimoCaraCorreo: false,
      cadVacioCorreo: false,
      cadVaciasCorreo: false,
      errorCaraEspeciCorreo: false,

      minimoCaraContrase: false,
      cadVacioContrase: false,
      cadContraseIdenticas: false,
      almenosDosNumContrase: false,
      confirmarContrase: false,
      veriCorreo: false,

      regisExitoso: false,
      hayCorreo: [],
      idUs: -1,
    };

    this.nameChange = this.nameChange.bind(this);
    this.validarRegistro = this.validarRegistro.bind(this);
    this.firstNameChange = this.firstNameChange.bind(this);
    this.correoChange = this.correoChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.passwordConfirChang = this.passwordConfirChang.bind(this);
    this.validarAllCampos = this.validarAllCampos.bind(this);
    this.devolverValoresState = this.devolverValoresState.bind(this);

    this.validarNombre = this.validarNombre.bind(this);
    this.validarApellido = this.validarApellido.bind(this);
    this.validarCorreo = this.validarCorreo.bind(this);
    this.validarConfirContrase = this.validarConfirContrase.bind(this);
    this.validarContrase = this.validarContrase.bind(this);
    this.esCorreo = this.esCorreo.bind(this);
    this.mandarBD = this.mandarBD.bind(this);
    this.validarCorreo1 = this.validarCorreo1.bind(this);

    this.correoExiste = this.correoExiste.bind(this);
    this.mandarAsuVista = this.mandarAsuVista.bind(this);

    this.sacarId = this.sacarId.bind(this);
  }

  devolverValoresState() {
    this.setState({
      errorVacioNombre: false,
      errorCaraEspeciNombre: false,
      maximoCaraNombre: false,
      minimoCaraNombre: false,
      cadVaciasNombre: false,

      errorVacioApellido: false,
      errorCaraEspeciApellido: false,
      maximoCaraApellido: false,
      minimoCaraApellido: false,
      cadVaciasApellido: false,

      maximoCaraCorreo: false,
      dominioFalCorreo: false,
      correoExistente: false,
      puntosContinuosCorreo: false,
      minimoCaraCorreo: false,
      cadVacioCorreo: false,
      cadVaciasCorreo: false,

      minimoCaraContrase: false,
      cadVacioContrase: false,
      cadContraseIdenticas: false,
      almenosDosNumContrase: false,
      confirmarContrase: false,
    });
  }

  passwordConfirChang(event) {
    this.setState({ campoConfirContraseña: event.target.value });
  }

  passwordChange(event) {
    this.setState({ campoContraseña: event.target.value });
  }

  correoChange(event) {
    this.setState({ campoCorreo: event.target.value });
  }
  nameChange(event) {
    this.setState({ campoNombre: event.target.value });
  }

  firstNameChange(event) {
    this.setState({ campoApellido: event.target.value });
  }

  validarRegistro(event) {
    var todoBienTodoCorrecto = false;
    todoBienTodoCorrecto = this.validarAllCampos();
    if (todoBienTodoCorrecto) {
      this.mandarBD();
    }
  }

  mandarBD() {
    console.log("trata de mandar la BD");
    try {
      var data = {
        first: this.state.campoNombre,
        last: this.state.campoApellido,
        email: this.state.campoCorreo,
        password: this.state.campoContraseña,
      };
      fetch("/api/cursos/register", {
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
    } catch (eer) {
      console.log(eer);
      console.log("no manda");
    }
  }

  validarAllCampos() {
    var res = false;
    this.devolverValoresState();
    var contrase = false;
    var confirCon = false;
    var firsName = false;
    var lastName = false;
    var emailVal = false;
    var contrase = this.validarContrase();
    var confirCon = this.validarConfirContrase();
    var firsName = this.validarApellido();
    var lastName = this.validarNombre();
    var emailVal = this.validarCorreo();

    if (firsName && lastName && emailVal && contrase && confirCon) {
      res = true;
    }

    return res;
  }

  validarConfirContrase() {
    var res = true;
    if (this.state.campoContraseña !== this.state.campoConfirContraseña) {
      this.setState({ cadContraseIdenticas: true });
      res = false;
    }
    return res;
  }

  almenos2num(cadTest) {
    var res = false;
    var cadNums = 0;
    for (var i = 0; i < cadTest.length; i++) {
      var letraNum = cadTest[i];
      if (/^[0-9]+$/.test(letraNum)) {
        cadNums++;
      }
    }
    if (cadNums >= 2) {
      res = true;
    }

    return res;
  }
  validarContrase() {
    var res = true;
    var llenadoContr = this.state.campoContraseña;
    if (llenadoContr.length == 0) {
        this.setState({ cadVacioContrase: true });
        return false;
      }
    if (llenadoContr != this.state.campoConfirContraseña) {
      this.setState({ cadContraseIdenticas: true });
      res = false;
    }
    if (llenadoContr.length < 8) {
      this.setState({ minimoCaraContrase: true });
      res = false;
    }
    if (!this.almenos2num(llenadoContr)) {
      this.setState({ almenosDosNumContrase: true });
      res = false;
    }
    if (this.state.campoConfirContraseña.length === 0) {
      this.setState({ confirmarContrase: true });
      res = false;
    }
    return res;
  }

  validarCorreo() {
    var res = true;
    var llenadoCor = this.state.campoCorreo;
    if (llenadoCor.length == 0) {
        this.setState({ cadVacioCorreo: true });
        return false;
      }
    if (llenadoCor.length >= 50) {
      this.setState({ maximoCaraCorreo: true });
      res = false;
    }

    if (llenadoCor.length <= 5) {
      this.setState({ minimoCaraCorreo: true });
      res = false;
    }    
    if (!this.esCorreo(llenadoCor)) {
      this.setState({ dominioFalCorreo: true });
      res = false;
    }
    if (this.correoExiste()) {
      console.log("poneFalso");
      res = false;
    }

    /* var dosPuntosSeg = '';
        if(nombreLlenado.includes(dosPuntosSeg)){
            this.setState({puntosContinuosCorreo:true});
            res = false;
        } */

    if (llenadoCor.includes(" ")) {
      this.setState({ cadVaciasCorreo: true });
      res = false;
    }
    if (/[^A-Za-z-ZñÑáéíóúÁÉÍÓÚ0-9@.\sd]/.test(llenadoCor)) {
      this.setState({ errorCaraEspeciCorreo: true });
      res = false;
    }
    return res;
  }

  correoExiste() {
    fetch(`/api/cursos/${this.state.campoCorreo}/usuario`)
      .then((res) => res.json())
      .then((data) => {
        if (data.correo.length == 0) {
          return true;
        } else {
          this.setState({ correoExistente: true });
          return false;
        }
      });
  }

  esCorreo(cadVericacion) {
    var res = false;
    var numArro = 0;
    for (var i = 0; i < cadVericacion.length; i++) {
      if (cadVericacion[i] == "@") {
        numArro++;
      }
    }
    if (numArro === 1) {
      res = true;
    } else {
      this.setState({ veriCorreo: true });
    }
    return res;
  }

  validarApellido() {
    var res = true;
    var nombreLlenado = this.state.campoApellido;
    if (nombreLlenado.length == 0) {
      this.setState({ errorVacioApellido: true });
      return false;
    }
    if (/[^A-Za-z-ZñÑáéíóúÁÉÍÓÚ0-9\sd]/.test(nombreLlenado)) {
      this.setState({ errorCaraEspeciApellido: true });
      var res = false;
    }
    if (nombreLlenado.length > 25) {
      this.setState({ maximoCaraApellido: true });
      var res = false;
    }
    if (nombreLlenado.length < 6) {
      this.setState({ minimoCaraApellido: true });
      var res = false;
    }
    if (nombreLlenado.includes("  ")) {
      this.setState({ cadVaciasApellido: true });
      var res = false;
    }
    return res;
  }

  validarNombre() {
    var res = true;

    var nombreLlenado = this.state.campoNombre;
    if (nombreLlenado.length === 0) {
      this.setState({ errorVacioNombre: true });
      return false;
    }
    if (/[^A-Za-z-ZñÑáéíóúÁÉÍÓÚ0-9\sd]/.test(nombreLlenado)) {
      //no estamos validando el "/"
      this.setState({ errorCaraEspeciNombre: true });
      var res = false;
    }
    if (nombreLlenado.length > 25) {
      this.setState({ maximoCaraNombre: true });
      var res = false;
    }
    if (nombreLlenado.length < 2) {
      this.setState({ minimoCaraNombre: true });
      var res = false;
    }
    if (nombreLlenado.includes("  ")) {
      this.setState({ cadVaciasNombre: true });
      var res = false;
    }
    return res;
  }

  sacarId() {
    var idddd = -1;
    fetch(`/api/cursos/${this.state.campoCorreo}/usuarioid`)
      .then((res) => res.json())
      .then((data) => {
        if (data.id_usuario > 1) {
          this.props.history.push(`/Estudiante/${data.id_usuario}`);
          window.location.href = window.location.href;
        } else {
          console.log("entra al else");
        }
      });

    this.idParaRedi = idddd;
    console.log(this.idParaRedi);
  }

  validarCorreo1() {
    console.log(this.state.hayCorreo);
    if (this.state.hayCorreo.length == 0) {
      return false;
    } else {
      return true;
    }
  }

  mandarAsuVista() {
    this.sacarId();
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
                <button className="btnOk" onClick={this.mandarAsuVista}>
                  Aceptar
                </button>
              </div>
            </div>
          ) : null}

          <div
            id="formResgistro"
            class="w3-container w3-card-4 w3-light-grey "
            onSubmit={this.validarRegistro}
          >
            <h1 id="TituloPrin" className="w3-  center">
              Regístrate en Wdemy
            </h1>
            <div className="w3-row w3-section">
              <div id="campNomApe" className="w3-rest">
                <i id="logNomApe" class="w3-xxlarge fa fa-user"></i>

                <div className="contenierNomApe ">
                  <div className="alertsIzq">
                    <input
                      id="campNombre"
                      className="w3-input w3-border"
                      name="first"
                      type="text"
                      placeholder="Nombre(s)"
                      value={this.state.campoNombre}
                      onChange={this.nameChange}
                    />
                    {this.state.errorVacioNombre ? (
                      <p>El campo nombre(s) no debe estar vacio</p>
                    ) : null}
                    {this.state.errorCaraEspeciNombre ? (
                      <p>No debe contener caracteres especiales</p>
                    ) : null}
                    {this.state.maximoCaraNombre ? (
                      <p>El nombre debe tener máximo 25 caracteres</p>
                    ) : null}
                    {this.state.minimoCaraNombre ? (
                      <p>El nombre debe tener mínimamente 2 caracteres</p>
                    ) : null}
                    {this.state.cadVaciasNombre ? (
                      <p>
                        El nombre no debe contener cadenas de caracteres vacias
                      </p>
                    ) : null}
                  </div>

                  <div className="alertsDere">
                    <input
                      id="campApelli"
                      class="w3-input w3-border"
                      name="last"
                      type="text"
                      placeholder="Apellidos"
                      value={this.state.campoApellido}
                      onChange={this.firstNameChange}
                    />
                    {this.state.errorVacioApellido ? (
                      <p>El campo apellidos no debe estar vacio</p>
                    ) : null}
                    {this.state.errorCaraEspeciApellido ? (
                      <p>No debe contener caracteres especiales</p>
                    ) : null}
                    {this.state.maximoCaraApellido ? (
                      <p>El apellido debe tener máximo 25 caracteres</p>
                    ) : null}
                    {this.state.minimoCaraApellido ? (
                      <p>Los apellidos deben tener mínimamente 6 caracteres</p>
                    ) : null}
                    {this.state.cadVaciasApellido ? (
                      <p>
                        Los apellidos no debe contener cadenas de caracteres
                        vacias
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div id="campCorr" class="w3-row w3-section">
                <i id="logoCorreo" class="w3-xxlarge fa fa-envelope-o"></i>
                <div className="w3-rest">
                  <input
                    id="campoCorreo"
                    class="w3-input w3-border"
                    name="email"
                    type="text"
                    placeholder="correo"
                    value={this.state.campoCorreo}
                    onChange={this.correoChange}
                  />
                </div>

                <div className="alersCorreo">
                  {this.state.maximoCaraCorreo ? (
                    <p>El correo debe contener como maximo 50 caracteres.</p>
                  ) : null}
                  {this.state.dominioFalCorreo ? (
                    <p>El correo debe contener un dominio</p>
                  ) : null}
                  {this.state.correoExistente ? (
                    <p>El correo que ingresó ya está registrado</p>
                  ) : null}
                  {this.state.puntosContinuosCorreo ? (
                    <p>
                      El correo que ingresó tiene más de dos puntos continuos
                    </p>
                  ) : null}
                  {this.state.minimoCaraCorreo ? (
                    <p>
                      El correo que ingrese debe contener más de 5 caracteres
                    </p>
                  ) : null}
                  {this.state.cadVacioCorreo ? (
                    <p>El campo correo no debe estar vacio</p>
                  ) : null}
                  {this.state.cadVaciasCorreo ? (
                    <p>
                      El correo no debe contener cadenas de caracteres vacias
                    </p>
                  ) : null}
                  {this.state.veriCorreo ? <p>Verifique su correo </p> : null}
                  {this.state.errorCaraEspeciCorreo ? (
                    <p>
                      Solo debe contener (a-z),(A-Z),una @ y puntos no seguidos
                    </p>
                  ) : null}
                </div>
              </div>

              <div id="campContrasenias">
                <i id="iconCor" class="fa fa-lock"></i>
                <div className="contenierNomApe">
                  <div className="alertsIzq">
                    <input
                      id="campNombre"
                      class="w3-input w3-border"
                      name="password"
                      type="password"
                      placeholder="contraseña"
                      value={this.state.campoContraseña}
                      onChange={this.passwordChange}
                    />
                    {this.state.minimoCaraContrase ? (
                      <p>Debe tener por lo menos 8 caracteres</p>
                    ) : null}
                    {this.state.cadVacioContrase ? (
                      <p>El campo contraseña no debe estar vacio</p>
                    ) : null}
                    {this.state.cadContraseIdenticas ? (
                      <p>Las contraseñas deben de ser idénticas</p>
                    ) : null}
                    {this.state.almenosDosNumContrase ? (
                      <p>
                        Debes introducir al menos 2 numeros en tu contraseña
                      </p>
                    ) : null}
                    {this.state.confirmarContrase ? (
                      <p>Debe confirmar su contraseña</p>
                    ) : null}
                  </div>
                  <div className="alertsDere">
                    <input
                      id="campApelli"
                      class="w3-input w3-border"
                      name="password"
                      type="password"
                      placeholder="confirmar contraseña"
                      value={this.state.campoConfirContraseña}
                      onChange={this.passwordConfirChang}
                    />
                    {this.state.confirmarContrase ? (
                      <p>Las contraseñas deben de ser idénticas</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                className="w3-btn "
                id="botonRegis"
                onClick={this.validarRegistro}
              >
                Registrarse
              </button>
            </div>

            <div className="enlacePre">
              <p>¿ya tienes cuenta?</p>
              <a id="enlace" href="/login">
                iniciar sesion
              </a>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

export default withRouter(Registro);
