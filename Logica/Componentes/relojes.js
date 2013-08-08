ClaseRelojes.prototype = new ClaseVentana();

function ClaseRelojes(){
	//Campos
	this.tiempoFuera = false;

	//Métodos
	this.cargarComponente = Relojes_cargarComponente;
	
	this.intercambiar = Relojes_intercambiar;
	this.resetear = Relojes_resetear;
	this.empezar = Relojes_empezar;
	this.detener = Relojes_detener;
	this.setTiempoInicial = Relojes_setTiempoInicial;
	this.setTipo = Relojes_setTipo;
	this.getStamp = Relojes_getStamp;
	this.afinar = Relojes_afinar;

	//Eventos
	this.timeover = new Evento();

	//Handlers
	this.timeoverHandler = Relojes_timeoverHandler;

	this.prueba = function(){alert("capt")}


	//Objetos
	this.timerBlanco = null;
	this.timerNegro = null;
	
	//Registro eventos
	cargador.onload.add(this,"abrir");
	tablero.onmoverpieza.add(this,"intercambiar");
	partida.onterminar.add(this,"detener");
	partida.onempezar.add(this,"empezar");
	partida.onpreparar.add(this,"resetear");

}

function Relojes_cargarComponente(){

	var paquete = this.crearVentana(
		"Relojes", 1,
		"width:20%;height:15%;top:18%;left:5%"
	);

	paquete.contenido.style.textAlign = "center";
	
	var tW = create("control:timer",paquete.contenido);
	var tB = create("control:timer",paquete.contenido);
	
	tW.color = BLANCO;
	tB.color = NEGRO;
	
	tW.tipo = "down";
	tB.tipo = "down";

	tW.ontimeover = relojes.timeoverHandler;
	tB.ontimeover = relojes.timeoverHandler;
	
	with(tW.style){
		fontSize = "20px";
		color = "black";
		fontFamily = "courier new";
		fontWeight = "bold";
	}
	with(tB.style){
		fontSize = "20px";
		color = "black";
		fontFamily = "courier new";
		fontWeight = "bold";
	}
	
	paquete.style.textAlign = "center";
	
	this.timerBlanco = tW;
	this.timerNegro = tB;
	
	this.setTiempoInicial(0,1,0,0);
}

function Relojes_empezar(){
	if(partida.colorTurno == BLANCO)
		this.timerBlanco.start();
	else
		this.timerNegro.start();
}

function Relojes_intercambiar(){
	if(this.timerNegro.active){
		this.timerNegro.stop();
		this.timerBlanco.start();
	}
	else{
		this.timerNegro.start();
		this.timerBlanco.stop();
	}	
}

function Relojes_resetear(){
	this.timerNegro.reset();
	this.timerBlanco.reset();
	this.tiempoFuera = false;
}

function Relojes_detener(){
	this.timerNegro.stop();
	this.timerBlanco.stop();
}


function Relojes_setTiempoInicial(h,m,s,i){
	this.timerBlanco.setup(h,m,s,i);
	this.timerNegro.setup(h,m,s,i);	
}

function Relojes_timeoverHandler(evento){
	var color = evento.srcElement.color;
	
	partida.terminar(color);
	//tablero.desactivar();
	
	if(mensaje)
		mensaje.mostrar("Se acabó el tiempo de " + color);
	
	relojes.tiempoFuera = true;
	relojes.timeover.fire(color);
}

function Relojes_setTipo(tipo){
	this.timerBlanco.tipo = tipo;
	this.timerNegro.tipo = tipo;
}

function Relojes_getStamp(color){
	if(color==NEGRO){
		var timer = this.timerNegro;
	}
	else{
		var timer = this.timerBlanco;
	}
	
	return timer.timestamp;
	
}

function Relojes_afinar(color,stamp){
	if(color==NEGRO){
		var timer = this.timerNegro;
	}
	else{
		var timer = this.timerBlanco;
	}
	
	timer.timestamp = stamp;
	
}