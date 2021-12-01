import React, { Component } from 'react';

class Popup extends Component {
    render() {
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <p className='textoPopup'>{this.props.text}</p>
            <button className='btnOk' onClick={this.props.closePopup}>Aceptar</button>
          </div>
        </div>
      );
    }
}

export default Popup