var BLANCO = "B";
var NEGRO = "N";

function hacerConexion(){
	//hacerConexion es llamada con el evento onload del motor Magnus.
	var motorScript = window.dialogArguments;
	
	callback = motorScript.recibirRespuesta;
	
	//callbak es this.recibirRespuesta;
	callback(recibirComando,motorScript);
	Iniciar();
}

function recibirComando(comando,valor){
	switch(comando){
		case "mover":
			if(valor!=undefined){ //Responder un movimiento
				var origen = toNumero(valor.substr(0,2))+1;
				var destino = toNumero(valor.substr(2,2))+1;
				Principal(origen,destino);
				break;
			}
			else{//Mueve sin ser respuesta
				colorMaquina = colorTurno;
				Principal();
			}
			break;	
		case "profundidad":
			profundidadConst = valor;
	}
}
