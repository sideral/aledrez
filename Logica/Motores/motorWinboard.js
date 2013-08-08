MotorWinboard.prototype = new ClaseMotor();

function MotorWinboard(nombre,path,archivos){
	this.nombre = nombre;
	this.path = path;
	this.archivos = archivos;
	this.tipo = WINBOARD;
	
	this.lineas = 0;

	this.fso = null;
	this.shell = null;
	this.tempFile = "";
	this.engine = null;
	this.stdIn = null;
	this.cargado = false;
	this.features = new Array();

	this.cargar = MotorWinboard_cargar;
	this.terminar = MotorWinboard_terminar;
	
	this.iniciarPartida = MotorWinboard_iniciarPartida;
	this.fijarProfundidad = MotorWinboard_fijarProfundidad;
	this.resetear = MotorWinboard_resetear;
	
	this.enviarComando = MotorWinboard_enviarComando;
	this.enviarMovimiento = MotorWinboard_enviarMovimiento;
	this.leerLinea = MotorWinboard_leerLinea;
	this.recibirRespuesta = MotorWinboard_recibirRespuesta;
	this.esperarRespuesta = MotorWinboard_esperarRespuesta;
	this.dispararError = MotorWinboard_dispararError;
}

function MotorWinboard_cargar(){
	this.fso = new ActiveXObject("Scripting.FileSystemObject");
	this.shell = new ActiveXObject("WScript.Shell");
	this.tempFile = this.fso.GetTempName();
	this.engine = this.shell.Exec("%comspec% /k " + this.path + " > " + this.tempFile);
	this.stdIn = this.engine.StdIn;
	this.enviarComando("xboard");
	this.enviarComando("protover 2");
}

function MotorWinboard_terminar(){
	try{
		this.stdIn.WriteLine("quit");
		this.stdIn.WriteLine("exit");
	}
	catch(e){}
	
	var esperar = true;
	var cuenta = 0;
	while(esperar && cuenta < 100){
		try{
			this.fso.DeleteFile(this.tempFile);
			esperar = false;
		}
		catch(e){
			cuenta++;
		}
	}
	
	this.engine = null;
	this.fso = null;
	this.shell = null;
	this.tempFile = null;
	this.stdIn = null;

}

function MotorWinboard_iniciarPartida(){
	this.enviarComando("new");
	this.fijarProfundidad([0,"0:5",0]);
}

function MotorWinboard_esperarRespuesta(){
	var out = partida.jugadorTurno.recibirRespuesta();
	if(out!=null){
		partida.jugadorTurno.lineas++;
		partida.jugadorTurno.leerLinea(out);
		return;
	}
	setTimeout(partida.jugadorTurno.esperarRespuesta,50);
}

function MotorWinboard_enviarMovimiento(move){
	this.enviarComando(move);
	this.esperarRespuesta();
}

function MotorWinboard_recibirRespuesta(){
	try{
		var aPtr = partida.jugadorTurno.fso.OpenTextFile(partida.jugadorTurno.tempFile,1);
		
		for(var i=0; i < partida.jugadorTurno.lineas; i++){
			aPtr.SkipLine();
		}
		
		if(!aPtr.atEndOfStream){
			var retorno = aPtr.ReadLine();
			aPtr.Close();
			return retorno;
		}
		else{
			aPtr.Close();
			return null;
		}
	}
	catch(e){
		this.dispararError();
	}
}

function MotorWinboard_leerLinea(linea){
	var partes = linea.split(" ");

	if(partes[0]=="move"){
		var coord = partes[1];
		tablero.moverPieza(coord);
	}
	else{
		partida.jugadorTurno.esperarRespuesta();
	}
}

function MotorWinboard_resetear(){
	//this.preparar();
}

function MotorWinboard_dispararError(comando){
	mensaje.mostrar("Ha ocurrido un error con el motor. Comando: " + comando,6000);
	this.terminar();
}

function MotorWinboard_fijarProfundidad(depth){
	if(!depth){
		this.enviarComando("sd " + partida.datos.tiempo.valor);
	}
	else if(depth.constructor==Array){
		var tiempo = "level " + depth[0] + " " + depth[1] + " " + depth[2]
		this.enviarComando(tiempo);
	}
	else{	
		this.enviarComando("sd " + depth);
	}

}

function MotorWinboard_enviarComando(comando){
	try{
		this.stdIn.WriteLine(comando);
	}
	catch(e){
		this.dispararError(comando);
	}
}
