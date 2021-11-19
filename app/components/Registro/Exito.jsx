import React, { Component } from 'react';

class Exito extends Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <p className='textoPopup'>Registro exitoso!</p>
            <button className='btnOk' onClick={this.props.closePopup}>Aceptar</button>
          </div>
        </div>
      );
    }
}

export default Exito;