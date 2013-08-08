MotorServidor.prototype = new ClaseMotor();

function MotorServidor(nombre,path){
	this.tipo = SERVIDOR;
	this.nombre = nombre;
	this.path = path;
	
	this.comService = null;
	
	this.cargar = MotorServidor_cargar;
	this.terminar = MotorServidor_terminar;
	
	this.iniciarPartida = MotorServidor_iniciarPartida;
	this.fijarProfundidad = MotorServidor_fijarProfundidad;
	this.enviarMovimiento = MotorServidor_enviarMovimiento;
	this.recibirMovimiento = MotorServidor_recibirMovimiento;
	
	this.enviarComando = MotorServidor_enviarComando;
	
	aledrez = this;

}

function MotorServidor_cargar(){
	this.comService = create("div",document.body);
	this.comService.addBehavior("./componentes/webservice.htc");
	this.comService.onreadystatechange = function(){
		if(this.readyState=="complete"){
			this.useService(aledrez.path,"motorAledrez");
			mensaje.mostrar("Iniciando motor Aledrez",10000);
			aledrez.enviarComando(aledrez.iniciarPartida,"cargar");
		}
	}
}

function MotorServidor_iniciarPartida(result){
	if(!result)
		return;
		
	if(result.error){
		mensaje.mostrar("iniciarPartida:\n" + result.errorDetail.string,6000);
		return;
	}
	
	mensaje.mostrar(result.value,5000);
	aledrez.enviarComando(aledrez.fijarProfundidad,"new");
	
}

function MotorServidor_fijarProfundidad(result){
	var cadenaDepth = "sd " + 1;
	mensaje.mostrar(result.value,5000);
	aledrez.enviarComando(nullFunction,"cadenaDepth");
}

function MotorServidor_enviarComando(callback,comando){
	aledrez.comService.motorAledrez.callService(callback,"RecibirComando",comando);	
}

function MotorServidor_enviarMovimiento(movimiento){
	var move = "usermove " + movimiento;
	var receptor = this.recibirMovimiento;
	aledrez.enviarComando(receptor,move);
}

function MotorServidor_recibirMovimiento(result){
	if(result.error){
		mensaje.mostrar(result.errorDetail.string,10000);
		return;
	}
	var movimiento = result.value.split(" ")[1];
	tablero.moverPieza(movimiento);	

}

function MotorServidor_terminar(){
	document.body.removeChild(this.comService);
}