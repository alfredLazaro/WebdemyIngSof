import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import './Registro.css'
class Registro extends Component{
    constructor(props){
        super(props);
        this.state  ={
            campoNombre             : "", 
            campoApellido           : "", 
            campoCorreo             : "", 
            campoContraseña         : "", 
            campoConfirContraseña   : "", 

            errorVacioNombre        : false,
            errorCaraEspeciNombre   : false,
            maximoCaraNombre        : false,
            minimoCaraNombre        : false,
            cadVaciasNombre         : false,

            errorVacioApellido      : false,
            errorCaraEspeciApellido : false,
            maximoCaraApellido      : false,
            minimoCaraApellido      : false,
            cadVaciasApellido       : false,

            maximoCaraCorreo        : false,
            dominioFalCorreo        : false,
            correoExistente         : false,
            puntosContinuosCorreo   : false,
            minimoCaraCorreo        : false,
            cadVacioCorreo          : false,
            cadVaciasCorreo         : false,

            minimoCaraContrase      : false,
            cadVacioContrase        : false,
            cadContraseIdenticas    : false,
            almenosDosNumContrase   : false,
            confirmarContrase       : false,
            veriCorreo              : false,

            regisExitoso            : false,
            hayCorreo               :[],
            idUs                    :[],
        
        }
    
        this.nameChange          = this.nameChange.bind(this);
        this.validarRegistro     = this.validarRegistro.bind(this);
        this.firstNameChange     = this.firstNameChange.bind(this);
        this.correoChange        = this.correoChange.bind(this);
        this.passwordChange      = this.passwordChange.bind(this);
        this.passwordConfirChang = this.passwordConfirChang.bind(this);
        this.validarAllCampos    = this.validarAllCampos.bind(this);
        this.validarAllCampos    = this.validarAllCampos.bind(this);
        this.devolverValoresState= this.devolverValoresState.bind(this);

        this.validarNombre        = this.validarNombre.bind(this);
        this.validarApellido      = this.validarApellido.bind(this);
        this.validarCorreo        = this.validarCorreo.bind(this);
        this.validarConfirContrase= this.validarConfirContrase.bind(this);
        this.validarContrase      = this.validarContrase.bind(this); 
        this.esCorreo             = this.esCorreo.bind(this);
        this.mandarBD             = this.mandarBD.bind(this);

    }

    devolverValoresState(){
        this.setState({
            errorVacioNombre        : false,
            errorCaraEspeciNombre   : false,
            maximoCaraNombre        : false,
            minimoCaraNombre        : false,
            cadVaciasNombre         : false,

            errorVacioApellido      : false,
            errorCaraEspeciApellido : false,
            maximoCaraApellido      : false,
            minimoCaraApellido      : false,
            cadVaciasApellido       : false,

            maximoCaraCorreo        : false,
            dominioFalCorreo        : false,
            correoExistente         : false,
            puntosContinuosCorreo   : false,
            minimoCaraCorreo        : false,
            cadVacioCorreo          : false,
            cadVaciasCorreo         : false,

            minimoCaraContrase      : false,
            cadVacioContrase        : false,
            cadContraseIdenticas    : false,
            almenosDosNumContrase   : false,
            confirmarContrase       : false,
        
        });
    }

    passwordConfirChang(event){
        this.setState({campoConfirContraseña: event.target.value});
    }

    passwordChange(event){
        this.setState({campoContraseña: event.target.value});
    }

    correoChange(event){
        this.setState({campoCorreo: event.target.value});
    }
    nameChange(event){
        this.setState({campoNombre: event.target.value});      
    }
        
    firstNameChange(event){
        this.setState({campoApellido : event.target.value})
    }

    validarRegistro(event){
        var todoBienTodoCorrecto = false;
        todoBienTodoCorrecto = this.validarAllCampos();
        if(todoBienTodoCorrecto){
          this.mandarBD();
          this.setState({regisExitoso : true});
          //y presiona aceptar,donde es llevado a su perfil.
        }
    }
    mandarBD(){
        console.log("trata de mandar la BD");        
        try{
        fetch(`/api/cursos/register/${this.state.campoNombre,this.state.campoApellido,this.state.campoCorreo,this.state.campoContraseña}`); 
        console.log(this.state.hayCorreo);
        }
        catch(eer){
            console.log(eer);
            console.log('no manda');
        }
    }

    validarAllCampos(){
        var res = false;
        this.devolverValoresState();
        var contrase = false;
        var confirCon= false;
        var firsName = false;
        var lastName = false;
        var emailVal = false;
        var contrase = this.validarContrase();
        var confirCon= this.validarConfirContrase();
        var firsName = this.validarApellido();
        var lastName = this.validarNombre();
        var emailVal = this.validarCorreo();        
        
        if(firsName && lastName && emailVal && contrase && confirCon){                
            res = true;
        }     
           
        return res;
    }

    validarConfirContrase(){
        var res = true;
        if(this.state.campoContraseña !== this.state.campoConfirContraseña){
            this.setState({cadContraseIdenticas : true});
            res = false;
        }
        return res;
    }

    almenos2num(cadTest){
        var res     = false;
        var cadNums = 0;
        for(var i = 0 ; i < cadTest.length ; i++){
            var letraNum = cadTest[i];
            if(/^[0-9]+$/.test(letraNum) ){
                cadNums++;
            }            
        }
        if(cadNums >= 2){
            res = true;
        }

        return res;
    }
    validarContrase(){
        var res = true;
        var llenadoContr = this.state.campoContraseña;
        if(llenadoContr != this.state.campoConfirContraseña){
            this.setState({cadContraseIdenticas : true});
            res = false;
        }
        if(llenadoContr.length == 0){
            this.setState({cadVacioContrase : true});
            res = false;
        }
        if(llenadoContr.length < 8){
            this.setState({minimoCaraContrase : true});
            res = false;
        }
        if(!this.almenos2num(llenadoContr)){
            this.setState({almenosDosNumContrase:true});
            res = false;

        }
        if(this.state.campoConfirContraseña.length === 0){
            this.setState({confirmarContrase:true});
            res = false;
        }
        return res;
    }

    correoExiste(){
        fetch(`/api/cursos/${this.state.campoCorreo}/USUARIO`)
        .then(res => res.json())
        .then(data => {
            this.setState({
              hayCorreo:data
            });
        });
        if(this.state.hayCorreo.length >= 0){    
           
            return false;            
        }
        
        return true;
    }

    validarCorreo(){
        var res = true;
        var llenadoCor = this.state.campoCorreo;
        if(llenadoCor.length >= 50){
            this.setState({maximoCaraCorreo:true});
            res = false;
        }
        
        if(llenadoCor.length <= 5){
            this.setState({minimoCaraCorreo:true});
            res = false;
        }
        
        if(llenadoCor.length == 0){
            this.setState({cadVacioCorreo:true});
            res = false;
        }
        
        if(!this.esCorreo(llenadoCor)){
            this.setState({dominioFalCorreo:true});
            res = false;
          
        }
        
        if(this.correoExiste(llenadoCor)){
            this.setState({correoExistente:true});
            //validar con la BD
            res = false;
        }
        
        /* var dosPuntosSeg = '';
        if(nombreLlenado.includes(dosPuntosSeg)){
            this.setState({puntosContinuosCorreo:true});
            res = false;
        } */
        
        if(llenadoCor.includes("  ")){
            this.setState({cadVaciasCorreo:true});
            res = false;
        }
        
        return res;
    }

    esCorreo(cadVericacion){
        var res = false;
        var numArro = 0;
        for(var i = 0 ; i< cadVericacion.length;i++){
            if(cadVericacion[i] == '@'){
                numArro++;
            }
        }
        if(numArro === 1){
            res = true;
        }else{
            this.setState({veriCorreo:true});
        }
        return res;           
    }

    validarApellido(){
        var res = true;        
        var nombreLlenado = this.state.campoApellido;
        if(nombreLlenado.length == 0){
            this.setState({errorVacioApellido:true});  
            var res = false;
        }
        if(/[^A-Za-z-ZñÑáéíóúÁÉÍÓÚ0-9\sd]/.test(nombreLlenado)){            
            this.setState({errorCaraEspeciApellido : true});
            var res = false;
        }
        if(nombreLlenado.length > 25){
            this.setState({maximoCaraApellido : true});
            var res = false;
        }
        if(nombreLlenado.length < 2){
            this.setState({minimoCaraApellido : true});
            var res = false;
        }
        if(nombreLlenado.includes("  ")){
            this.setState({cadVaciasApellido : true});
            var res = false;   
        }
        return res;
    }

    validarNombre(){
        var res = true;
        
        var nombreLlenado = this.state.campoNombre;
        if(nombreLlenado.length === 0){
            this.setState({errorVacioNombre:true});  
            var res = false;
        }
        if(/[^A-Za-z-ZñÑáéíóúÁÉÍÓÚ0-9\sd]/.test(nombreLlenado)){
            //no estamos validando el "/"
            this.setState({errorCaraEspeciNombre : true});
            var res = false;
        }
        if(nombreLlenado.length > 25){
            this.setState({maximoCaraNombre : true});
            var res = false;
        }
        if(nombreLlenado.length < 2){
            this.setState({minimoCaraNombre : true});
            var res = false;
        }
        if(nombreLlenado.includes("  ")){
            this.setState({cadVaciasNombre : true});
            var res = false;   
        }
        return res;

    }

    
    render(){
        return(
            <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
                <title>Document</title>
            </head>
            <body>
                <div id='formResgistro' class="w3-container w3-card-4 w3-light-grey "  onSubmit={this.validarRegistro}> 
                    <h1 id='TituloPrin' className="w3-center">Registrate en Wdemy</h1>
                    <div className="w3-row w3-section">
                        
                        <div id='campNomApe' className="w3-rest">
                            <i id='logNomApe' class="w3-xxlarge fa fa-user"></i>

                            <div className="contenierNomApe ">                            
                                <div className='alertsIzq'>
                                    <input id='campNombre' className="w3-input w3-border" name="first" type="text" placeholder="Nombre(s)"
                                        value={this.state.campoNombre} onChange={this.nameChange}
                                    />
                                    {this.state.errorVacioNombre?       <p>El campo nombre(s) no debe  estar vacio</p>                  : null }
                                    {this.state.errorCaraEspeciNombre?  <p>No debe  contener caracteres especiales</p>                  : null }
                                    {this.state.maximoCaraNombre?       <p>El nombre debe tener máximo 25 caracteres</p>                : null }
                                    {this.state.minimoCaraNombre?       <p>El nombre debe tener mínimamente 2 caracteres</p>            : null }
                                    {this.state.cadVaciasNombre?        <p>El nombre no debe contener cadenas de caracteres vacias</p>  : null }
                                    
                                </div>
                            
                                <div className='alertsDere'>
                                    <input id='campApelli' class="w3-input w3-border" name="last" type="text" placeholder="Apellidos" 
                                        value={this.state.campoApellido} onChange={this.firstNameChange}
                                    />
                                    {this.state.errorVacioApellido?        <p>El campo apellidos no debe estar vacio</p>                       : null }
                                    {this.state.errorCaraEspeciApellido?  <p>No debe  contener caracteres especiales</p>                      : null }
                                    {this.state.maximoCaraApellido?       <p>El apellido debe tener máximo 25 caracteres</p>                  : null }
                                    {this.state.minimoCaraApellido?       <p>Los apellidos deben tener mínimamente 6 caracteres</p>           : null }
                                    {this.state.cadVaciasApellido ?       <p>Los apellidos no debe contener cadenas de caracteres vacias</p>  : null }
                    
                                </div>
                            </div>
                        
                        </div>                 
                        <div id='campCorr' class="w3-row w3-section">
                            <i id='logoCorreo' class="w3-xxlarge fa fa-envelope-o"></i>
                            <div className="w3-rest">
                                <input id='campoCorreo'  class="w3-input w3-border" name="email" type="text" placeholder="correo" 
                                    value={this.state.campoCorreo} onChange={this.correoChange}
                                />
                            </div>

                            <div className='alersCorreo'>
                                {this.state.maximoCaraCorreo?     <p>El correo debe contener como maximo 50 caracteres.</p>       : null }
                                {this.state.dominioFalCorreo?     <p>El correo debe contener un dominio</p>                       : null }
                                {this.state.correoExistente?      <p>El correo que ingresó ya está registrado</p>                 : null }
                                {this.state.puntosContinuosCorreo?<p>El correo que ingresó tiene más de dos puntos continuos</p>  : null }
                                {this.state.minimoCaraCorreo?     <p>El correo que ingrese debe contener más de 5 caracteres</p>  : null }                            
                                {this.state.cadVacioCorreo?       <p>El campo correo no debe estar vacio</p>                      : null }
                                {this.state.cadVaciasCorreo?      <p>El correo no debe contener cadenas de caracteres vacias</p>  : null }   
                                {this.state.veriCorreo?            <p>Verifique su correo                                    </p> : null }                         
                            </div>

                    </div>
                    {/* {this.state.regisExitoso? <Exito></Exito> : null} */}

                        <div id='campContrasenias' >
                            <i id='iconCor' class="fa fa-lock"></i>
                                <div className="contenierNomApe" > 
                                <div className='alertsIzq'>                            
                                    <input id='campNombre'  class="w3-input w3-border" name="password" type="password" placeholder="contraseña" 
                                        value={this.state.campoContraseña} onChange={this.passwordChange}                            
                                    />
                                    {this.state.minimoCaraContrase?       <p>Debe tener por lo menos 8 caracteres</p>                 : null }
                                    {this.state.cadVacioContrase?         <p>El campo contraseña no debe estar vacio</p>              : null }
                                    {this.state.cadContraseIdenticas?     <p>Las contraseñas deben de ser idénticas</p>               : null }
                                    {this.state.almenosDosNumContrase?    <p>Debes introducir al menos 2 numeros en tu contraseña</p> : null }
                                    {this.state.confirmarContrase?        <p>Debe confirmar su contraseña</p>                         : null }
                                </div>
                                <div className='alertsDere'>
                                    <input id='campApelli'  class="w3-input w3-border" name="password" type="password" placeholder="confirmar contraseña"
                                        value={this.state.campoConfirContraseña} onChange={this.passwordConfirChang}                            
                                    />                            
                                    {this.state.confirmarContrase?            <p>Las contraseñas deben de ser idénticas</p>               : null }
                                </div> 
                            </div>
    
                        </div>
                        
                        </div>
                        <div>

                            <button className="w3-btn " id='botonRegis' onClick={this.validarRegistro}>
                                Registrarse
                            </button>
                            
                        </div>
                    
                        <div className='enlacePre' >
                            <p >¿ya tienes cuenta?</p>
                            <a id='enlace' href="/login">iniciar sesion</a>
                            
                        </div>

                    </div>                
                </body>
            </html>
            
        );
    }
}



export default withRouter(Registro);

class Exito extends Component {
    constructor(props){
        super(props);
        this.state={
            idUs:this.obtenerIdConCorreo(),
        };
        this.llevarAvistaDeEstudiante = this.llevarAvistaDeEstudiante.bind(this);
    }

    /* llevarAvistaDeEstudiante(){
        var idMandar = this.obtenerIdConCorreo();
        
    }

    obtenerIdConCorreo(){
        fetch(`/api/cursos/${this.state.campoCorreo}/USUARIOID`)
        .then(res => res.json())
        .then(data => {
            this.setState({
              idUs:data
            });
        });
        return idUs;                
    } */

    render() {    
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <p className='textoPopup'>Registro exitoso!</p>
           {/*  <Link className='linkInial' to={`/Inicio/${this.state.idUs}`} >                          */}
            <button className='btnOk' onClick={this.llevarAvistaDeEstudiante}>Aceptar</button>
            {/* </Link>  */}
          </div>
        </div>
      );
    }
}
