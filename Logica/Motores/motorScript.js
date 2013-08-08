MotorScript.prototype = new ClaseMotor();

function MotorScript(nombre,path){
	this.tipo = SCRIPT;	
	this.nombre = nombre;
	this.path = path;
	
	this.window = null;
	
	this.cargar = MotorScript_cargar;
	this.terminar = MotorScript_terminar;
	
	//Métodos Ajedrez
	this.iniciarPartida = nullFunction;
	this.moverEsteTurno = MotorScript_moverEsteTurno;
	this.resetear = nullFunction;//Trabajar aquí.
	
	this.recibirRespuesta = MotorScript_recibirRespuesta;
	this.enviarMovimiento = MotorScript_enviarMovimiento;
	this.fijarProfundidad = MotorScript_fijarProfundidad;
	
	this.enviarComando = null;
}

function MotorScript_cargar(){
	this.window = window.showModelessDialog(this.path,this,"dialogHeight: 100px; dialogWidth: 100px; dialogTop: 500px; dialogLeft: 2000px; status: No;");
	window.focus();
}

function MotorScript_terminar(){
	this.window.close();
}

function MotorScript_recibirRespuesta(movecallback,motor){
	if(!motor){
		tablero.moverPieza(movecallback);
	}
	else{
		motor.enviarComando = movecallback;
	}
}

function MotorScript_enviarMovimiento(move){
	if(this.enviarComando!=null)
		this.enviarComando("mover",move);
	else
		doTimeout(MotorScript_enviarMovimiento,1,move);
}

function MotorScript_moverEsteTurno(){
	if(partida.jugadorTurno.enviarComando==null)
		setTimeout(MotorScript_moverEsteTurno,10);
	else
		partida.jugadorTurno.enviarComando("mover");
}

function MotorScript_fijarProfundidad(depth){
	if(isNaN(depth)){
		this.enviarComando("profundidad",partida.profundidad);
	}
	else{
		this.enviarComando("profundidad",depth);
	}
}
