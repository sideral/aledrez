ClaseLogin.prototype = new ClaseVentana();

function ClaseLogin(){
	this.cargarComponente = Login_cargarComponente;
	
	this.abrir = Login_abrir;

	this.validar = Login_validar;
	this.entrar = Login_entrar;
	
	this.dispararError = Login_dispararError;
	
	this.mensajeError = "";
	this.loggedIn = false;

	this.onlogin = new Evento();

}

function Login_cargarComponente(){
	var login = this.crearVentana(
		"Aledrez remoto", 1,
		"width: 25%; height: 45%; left: 35%; top: 25%"
	);
	
	if(menu){
		var mLog = menu.addItem("Internet");
		mLog.addItem("Entrar","abrir",this);	
	}	
}

function Login_abrir(){
	if(this.loggedIn == true){
		alert("Ya estás conectado");
		return;
	}
	
	this.ventana.abrir("./Dialogos/login.html");
	this.capturar();
	
	if(this.ventana.frame.src != this.ventana.url || this.ventana != "" )
		this.ventana.frame.src = this.ventana.url;

	this.mensajeError = "";
}

function Login_dispararError(razon){
	var mensaje;
	switch(razon){
		case "nick":
			mensaje = "Ya hay un usuario con ese nick. Intenta ser más original.";
			break;
		case "error":
			mensaje = "No se puede establecer la conexion.";
			break;
	}
	
	this.mensajeError = mensaje;
	this.ventana.frame.src = this.ventana.url;
	
}

function Login_validar(noAcceso){
	if(noAcceso == ''){
		this.entrar();
    }
    else{
        this.dispararError(noAcceso);
    }
}

function Login_entrar(){
	this.cerrar();
	this.loggedIn = true;
	
	partida.terminar();
	tablero.desactivar();
	
	if(relojes)	
		relojes.cerrar();

	if(mensaje)
		mensaje.cerrar();
	
	if(lista)
		lista.cerrar();
	
	this.onlogin.fire();
}