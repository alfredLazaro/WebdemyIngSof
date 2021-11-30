import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./RegistroTutor.css";
class RegistroTutor extends Component {
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
              <h2>  Informacion personal</h2>
            </form>
            <form
              id="formRegisLinks"
              class="w3-padding w3-right  w3-card-4 w3-white"
            >
              <h2>Links</h2>
            </form>
            <form
              id="formRegisTrab"
              class="w3-padding w3-center  w3-card-4 w3-white"
            >
              <h2>Trabajo</h2>
              <input type="text" />
              <input type="text" />
              <input type="text" />
            </form>
          </form>
        </body>
      </html>
    );
  }
}

export default withRouter(RegistroTutor);
