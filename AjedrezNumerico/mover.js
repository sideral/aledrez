function Mover(Movimiento){
	
	idCasOrigen = Movimiento[0];
	idCasDestino = Movimiento[1];
	
	var nombrePiezaMovida = tab[idCasOrigen];
	tab[idCasOrigen]=1;
	tab[idCasDestino]=nombrePiezaMovida;
	
	if(Movimiento[0]==5 && Movimiento[1]==7 && nombrePiezaMovida%17==0){
		tab[8]=1;
		tab[6]=2*5;
	}
	else if(Movimiento[0]==61 && Movimiento[1]==63 && nombrePiezaMovida%17==0){
		tab[64]=1;
		tab[62]=3*5;
	}
	else if(Movimiento[0]==5 && Movimiento[1]==3 && nombrePiezaMovida%17==0){
		tab[1]=1;
		tab[4]=2*5;
	}
	else if(Movimiento[0]==61 && Movimiento[1]==59 && nombrePiezaMovida%17==0){
		tab[57]=1;
		tab[60]=3*5;
	}
	
	IniciarPiezas();
}

function MoverPensando(Movimiento,indice){
	
	idCasOrigen = Movimiento[0];
	idCasDestino = Movimiento[1];
	
	var nombrePiezaMovida = tab[idCasOrigen];
	tab[idCasOrigen]=1;

	var piezaComida = tab[idCasDestino];
	
	tab[idCasDestino]=nombrePiezaMovida;
	
	if(nombrePiezaMovida%17==0){
		if(Movimiento[0]==5 && Movimiento[1]==7){
			tab[8]=1;
			tab[6]=2*5;
		}
		else if(Movimiento[0]==61 && Movimiento[1]==63){
			tab[64]=1;
			tab[62]=3*5;
		}
		else if(Movimiento[0]==5 && Movimiento[1]==3){
			tab[1]=1;
			tab[4]=2*5;
		}
		else if(Movimiento[0]==61 && Movimiento[1]==59){
			tab[57]=1;
			tab[60]=3*5;
		}
	}

	IniciarPiezas();
	guardarMovimiento(piezaComida,indice);
	
	var jaqueFuturo = checkForcheck(colorTurno);
	
	if(jaqueFuturo){
		return true;
	}
	
	
}

function guardarMovimiento(piezaComida,indice){

	movimientoHecho[indice] = [idCasOrigen,idCasDestino];
	pzComida[indice] = piezaComida;
	
}

function AlmacenarMovLegales(indice){

	movLegales[indice] = new Array(0);
	
	for(var i = 0; i < movimientosLegales.length; i++){
		movLegales[indice][i] = movimientosLegales[i];
	}
	
}

function DeshacerMovimiento(indice){
	
	var escaqueOrigen =  movimientoHecho[indice][0];
	var escaqueDestino = movimientoHecho[indice][1];
	
	if(tab[escaqueDestino]%17==0){
		if(escaqueOrigen==5 && escaqueDestino==7){
			tab[8]=2*5;
			tab[6]=1;
		}
		else if(escaqueOrigen==61 && escaqueDestino==63){
			tab[64]=3*5;
			tab[62]=1;
		}
		else if(escaqueOrigen==5 && escaqueDestino==3){
			tab[1]=2*5;
			tab[4]=1;
		}
		else if(escaqueOrigen==61 && escaqueDestino==59){
			tab[57]=3*5;
			tab[60]=1;
		}
	}
			
	tab[escaqueOrigen] = tab[escaqueDestino];
	tab[escaqueDestino] = pzComida[indice];
	
	movimientosLegales = new Array(0);
	for(var i = 0; i < movLegales[indice].length; i++){
		movimientosLegales[i] = movLegales[indice][i];
	}
}

function checkForcheck(colorTurno){
	if(colorTurno==2){
		for(var i=0; i < cpzN.length; i++){
			for(var k=0; k < cpzN[i].ataca.length; k++){
				if(cpzN[i].ataca[k] == escaqueReyBlanco){
					return true;
				}
			}	
		}
	}
	else{
		for(var i=0; i < cpzB.length; i++){
			for(var k=0; k < cpzB[i].ataca.length; k++){
				if(cpzB[i].ataca[k] == escaqueReyNegro){
					return true;
				}
			}	
		}
	}
	
	return false;
}
