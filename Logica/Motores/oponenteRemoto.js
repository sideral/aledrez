OponenteRemoto.prototype = new ClaseMotor();

function OponenteRemoto(nombre,path){
	this.nombre = nombre;
	this.path = path;
	this.tipo = REMOTO;
	this.cargar = nullFunction;
	this.iniciarPartida = nullFunction;
	this.terminar = nullFunction;
	this.enviarMovimiento = OponenteRemoto_enviarMovimiento;
}

function OponenteRemoto_enviarMovimiento(move){
	if(partida.colorTurno == BLANCO)
		var color = NEGRO;
	else
		var color = BLANCO;
	
	var stamp = relojes.getStamp(color);
	
	control.enviarMovimiento(move,stamp);

}
