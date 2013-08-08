
function Principal(idCasOrigen,idCasDestino){
	if(colorTurno!=colorMaquina){
		var MovimientoIntentado = [idCasOrigen,idCasDestino];
		Mover(MovimientoIntentado);
		resetear();
		cambiarTurno();
		DeterminarMov(0);
	}
	
	if(colorTurno==colorMaquina){
		setTimeout(MovimientodelPc,1);
		contMov++;
	}
}

function MovimientodelPc(){
	var valor = ProfundizacionIterativa(new Date().getTime(),profundidadConst);
	Mover(mejorMovimiento);
	callback(toCoordenada(mejorMovimiento[0]-1)+toCoordenada(mejorMovimiento[1]-1));
	resetear();
	cambiarTurno();
	DeterminarMov(0);
}

function DeterminarMovPensando(depth,ciclo){
	
	var tmpI = new Date();
	
	if(depth==1){
		movimientosLegales = new Array;
	}
	var indice = profundidadConst - depth;
	
	var k=0;
	if(colorTurno==2){
		var conjPiezas = cpzB;
	}
	else{
		var conjPiezas = cpzN;
	}

	if((depth==ciclo && depth!=1)){
		for(var paso = 0; paso < valorMovimiento.length; paso++){
			for(i=0; i <= valorMovimiento.length-1; i++){
				if(valorMovimiento[i]<valorMovimiento[i+1]){
					var holdValores = valorMovimiento[i];
					var holdLegales = movimientosLegales[i];
					valorMovimiento[i] = valorMovimiento[i+1];
					movimientosLegales[i] = movimientosLegales[i+1];
					valorMovimiento[i+1] = holdValores;
					movimientosLegales[i+1] = holdLegales;
				}
			}
		}
	}
	else{
		for(var n=0, aux=0; n < conjPiezas.length; n++){
			if(conjPiezas[n].ataca.length!=0){
				var holdPieza = conjPiezas[aux];
				conjPiezas[aux] = conjPiezas[n];
				conjPiezas[n] = holdPieza;
				aux++;
			}		
		}
		
		for(var i=0; i < conjPiezas.length; i++){
	 		for(var j=0; j < conjPiezas[i].ataca.length; j++){
				movimientosLegales[k] = [conjPiezas[i].escaque,conjPiezas[i].ataca[j]];
				k++;
			}
			for(var j=0; j < conjPiezas[i].listademov.length; j++){
				movimientosLegales[k] = [conjPiezas[i].escaque,conjPiezas[i].listademov[j]];
				k++;
			}
		}
	}
}

function DeterminarMov(profundidad){

	movimientosLegales = new Array;
	
	var k=0;
	if(colorTurno==2){
		var conjPiezas = cpzB;
	}
	else{
		var conjPiezas = cpzN;
	}
	
	for(var i=0; i < conjPiezas.length; i++){
 		for(var j=0; j < conjPiezas[i].ataca.length; j++){
			movimientosLegales[k] = [conjPiezas[i].escaque,conjPiezas[i].ataca[j]];
			k++;
		}
		for(var j=0; j < conjPiezas[i].listademov.length; j++){
			movimientosLegales[k] = [conjPiezas[i].escaque,conjPiezas[i].listademov[j]];
			k++;
		}
	}
}


function validar(mi){
	for(var i=0; i < movimientosLegales.length; i++){
		if(mi[0]==movimientosLegales[i][0] && mi[1]==movimientosLegales[i][1]){
			var legal = true;
			break;
		}
	}
	if(i==movimientosLegales.length){
		var legal = false;
	}

	/*if(checkForcheck(2)){
		var legal = false;
	}*/
	return legal;
}

function elegirPieza(nombreCompleto){

	if(nombreCompleto.nombre%2==0){
		var nombrePieza = nombreCompleto.nombre/2;
		var color = 2;
		var contrario = 3;
	}
	else{
		var nombrePieza = nombreCompleto.nombre/3;
		var color = 3;
		var contrario = 2;
	}

	/*if(nombreCompleto.listo==1){
		return false;
	}¨*/

	switch(nombrePieza){
		case 5:
			Torre(nombreCompleto,color);
			break;
		case 7:
			Caballo(nombreCompleto,color);
			break;
		case 11:
			Alfil(nombreCompleto,color);
			break;
		case 13:
			Dama(nombreCompleto,color);
			break;
		case 17:
			Rey(nombreCompleto,color);
			break;
		case 19:
			Peon(nombreCompleto,color);
			break;
		default:
			break;
	}
}

function resetear(){
	
	for(var i=0; i < cpz.length; i++){
		cpz[i].listo = 0;
	}
	contador=0;
}


function cambiarTurno(){
	if(colorTurno==2){
		colorTurno=3;
	}
	else{
		colorTurno=2;
	}
}

function toCoordenada(iEsq){
	var col = iEsq%8 + 97;
	var fil = Math.floor(iEsq/8) + 1;
	return String.fromCharCode(col)+ fil;
}

function toNumero(strEsq){
	var col = strEsq.charCodeAt(0) - 97;
	var fil = parseInt(strEsq.charAt(1)) - 1;
	return col + fil*8;
}