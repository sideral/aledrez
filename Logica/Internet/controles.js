ClaseControlRemoto.prototype = new ClaseVentana();

function ClaseControlRemoto(){
	this.cargarComponente = ControlRemoto_cargarComponente;
	
	//Métodos
	this.abrir = ControlRemoto_abrir;	
	
	//Métodos remotos
	this.llamarThread = null;
	this.getNick = null;
	this.mostrarUsuarios = null;
	this.mostrarTableros = null;
	this.enviarMensaje = null;
	this.abrirTablero = null;
	this.penetrarTablero = null;
	this.ingresoOponente = null;
	this.enviarMovimiento = null;
	
	//Estados
	this.esperandoInicio = false;
	
	//Objetos
	this.proceso = null;

	//Eventos
	this.onload = new Evento();
	this.ondesconectar = new Evento();
	this.ontimeout = new Evento();

	login.onlogin.add(this,"abrir");
}

function ControlRemoto_cargarComponente(){
	var control = this.crearVentana(
		"Controles", 0,
		"width:100%; height:50; top:4%; left:0",
		"",
		true
	);
}

function ControlRemoto_abrir(){
	this.ventana.abrir("http://" + HOST + "/controles.php");
}
