var WINBOARD = 0;
var SERVIDOR = 1;
var SCRIPT = 2;
var REMOTO = 3;

var BLANCO = "B";
var NEGRO = "N";

var MAQUINA = "Maquina";
var HUMANO = "Humano";

var JUGADOR_PREDETERMINADO = "Alejandro";

var HOST = "localhost";
//var HOST  = "usuarios.lycos.es/aledrez/Chat";

function create(strElement, objParent){
	var elem = document.createElement(strElement);
	
	if(objParent!=undefined){
		objParent.appendChild(elem);
	}

	return elem;
}

function doTimeout(functionPtr,msecs,argumento){
	tempFunction = function(){
		functionPtr(argumento);
	}
	
	setTimeout(tempFunction,msecs);
	
}

function nullFunction(){
	return;
}

