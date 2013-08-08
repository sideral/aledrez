
function Peon(peon,color){

	peon.listademov = new Array(0);
	peon.ataca = new Array(0);
	peon.defiende = new Array(0);
	
	var colPeon = peon.escaque%8;
	if(colPeon==0){
		colPeon = 8;
	}
	var filPeon = Math.ceil(peon.escaque/8);
	
	if(color==2){
		var a = 8;
	}
	else{
		var a = -8;
	}
	
	var escaquePosible = peon.escaque + a;
	
	if(tab[escaquePosible]==1){
		peon.listademov[peon.listademov.length] = escaquePosible;
	}
		
	if((filPeon==2 && color==2) || (filPeon==7 && color==3)){
		if(tab[escaquePosible]==1 && tab[escaquePosible+a]==1){
			peon.listademov[peon.listademov.length] = escaquePosible + a;
		}
	}

	var escaquePosible = peon.escaque + (a-1);
	var filPosible = Math.ceil(escaquePosible/8);
	
	if(escaquePosible>0){
		if(tab[escaquePosible]!=1 && filPosible==(filPeon + a/8)){
			if(tab[escaquePosible]%color!=0){
				peon.ataca[peon.ataca.length] = escaquePosible;
			}
			else{
				peon.defiende[peon.defiende.length]=escaquePosible;
			}
		}
	}
	var escaquePosible = peon.escaque + (a+1);
	var filPosible = Math.ceil(escaquePosible/8);

	if(escaquePosible<65){
		if(tab[escaquePosible]!=1 && filPosible==(filPeon + a/8)){
			if(tab[escaquePosible]%color!=0){
				peon.ataca[peon.ataca.length] = escaquePosible;
			}
			else{
				peon.defiende[peon.defiende.length]=escaquePosible;
			}
		}
	}
	
//CORONACIÓN:
//PROBLEMAS- 
// 1. Cuando mueve mentalmente convierte al peón en reina en la séptima casilla.
// 2. Cuando corona tanto el pc como el humano, no se ve la reina hasta el
//	  siguiente movimiento. 
//POR HACER- 
// 1. Cuando mueve un humano, desplegar una ventana que muestre qué pieza desea elegir.
// 2. Cuando mueve el computador, dar las diversas opciones de piezas, empezando
//    por la reina, después una torre, después alfiles y caballos. 
	if(filPeon==8){
		tab[peon.escaque]=2*13;
		peon.valor=900;
		return;
	}
	if(filPeon==1){
		tab[peon.escaque]=3*13;
		peon.valor=900;
		return;
	}

	
	peon.valor=90;
	
	var mvt = Math.ceil(contMov/6);
	peon.valor += bonoPeon[color][mvt][peon.escaque]
	
	
	peon.valor+=peon.listademov.length*5;
	
	if(a==8){
		peon.valor += filPeon*2.5;
		if(colPeon==6 || colPeon==8 || colPeon==1){
			peon.valor -= filPeon*2.5;
		}
		if(peon.escaque==28 || peon.escaque==29){
			peon.valor += 4;
		}
		if(filPeon==2 && (colPeon==4 || colPeon==5)){
			if(peon.listademov.length==0){
				peon.valor-=7;
			}
		}
	}
	else{
		peon.valor +=(8-filPeon)*4.5;
		if(colPeon==6 || colPeon==8){
			peon.valor -= (8-filPeon)*2.5;
		}
		if(peon.escaque==36 || peon.escaque==37){
			peon.valor +=4;
		}
		if(filPeon==7 && (colPeon==4 || colPeon==5)){
			if(peon.listademov.length==0){
				peon.valor-=7;
			}
		}
	}
	
	var aux=1;
/*	while(peon.escaque+aux*a <= 64 && peon.escaque+aux*a > 0){
		var piezaFrente = tab[peon.escaque+aux*a];
		if(piezaFrente==color*19){
			peon.valor -= 17;
		}
		aux++;
	}
*/
	peon.valor+=peon.ataca.length*0;
	peon.valor+=peon.defiende.length*1.5;
	
	peon.listo=1;
}


function Dama(dama,color){
	dama.listademov = new Array(0);
	dama.valor=900;
	dama.ataca = new Array(0);
	dama.defiende = new Array(0);
	
	var colDama = dama.escaque%8;
	if(colDama==0){
		colDama = 8;
	}
	var filDama = Math.ceil(dama.escaque/8);
	
	var arriba = 8 - filDama;
	var abajo = filDama-1;
	var derecha = 8 - colDama;
	var izquierda  = colDama-1; 
	var arrder = Math.min(arriba,derecha);
	var arrizq = Math.min(arriba,izquierda);
	var abader = Math.min(abajo,derecha);
	var abaizq = Math.min(abajo,izquierda);

	for(var i=1; i <= arrder; i++){
		var escaquePosible = dama.escaque + 9*i;
		if(escaquePosible<=64){
			if(tab[escaquePosible]==1){
				dama.listademov[dama.listademov.length]=escaquePosible;
			}
			else if(tab[escaquePosible]%color!=0){
				dama.ataca[dama.ataca.length]=escaquePosible;
				break;
			}
			else{
				dama.defiende[dama.defiende.length] = escaquePosible;
				break;
			}
		}
	}
	for(var i=1; i <= arrizq; i++){
		var escaquePosible = dama.escaque + 7*i;
		if(escaquePosible<=64){
			if(tab[escaquePosible]==1){
				dama.listademov[dama.listademov.length]=escaquePosible;
			}
			else if(tab[escaquePosible]%color!=0){
				dama.ataca[dama.ataca.length]=escaquePosible;
				break;
			}
			else{
				dama.defiende[dama.defiende.length] = escaquePosible;
				break;
			}
		}
	}
	for(var i=1; i <= abader; i++){
		var escaquePosible = dama.escaque - 7*i;
		if(escaquePosible>0){
			if(tab[escaquePosible]==1){
				dama.listademov[dama.listademov.length]=escaquePosible;
			}
			else if(tab[escaquePosible]%color!=0){
				dama.ataca[dama.ataca.length]=escaquePosible;
				break;
			}
			else{
				dama.defiende[dama.defiende.length] = escaquePosible;
				break;
			}
		}
	}
	for(var i=1; i <= abaizq; i++){
		var escaquePosible = dama.escaque - 9*i;
		if(escaquePosible>0){
			if(tab[escaquePosible]==1){
				dama.listademov[dama.listademov.length]=escaquePosible;
			}
			else if(tab[escaquePosible]%color!=0){
				dama.ataca[dama.ataca.length]=escaquePosible;
				break;
			}
			else{
				dama.defiende[dama.defiende.length] = escaquePosible;
				break;
			}
		}
	}

	for(var i=1; i <= derecha; i++){
		var escaquePosible = dama.escaque + i;
		if(escaquePosible<=64){
			if(tab[escaquePosible]==1){
				dama.listademov[dama.listademov.length]=escaquePosible;
			}
			else if(tab[escaquePosible]%color!=0){
				dama.ataca[dama.ataca.length]=escaquePosible;
				break;
			}
			else{
				dama.defiende[dama.defiende.length] = escaquePosible;
				break;
			}
		}
	}
	for(var i=1; i <= izquierda; i++){
		var escaquePosible = dama.escaque - i;
		if(escaquePosible>0){
			if(tab[escaquePosible]==1){
				dama.listademov[dama.listademov.length]=escaquePosible;
			}
			else if(tab[escaquePosible]%color!=0){
				dama.ataca[dama.ataca.length]=escaquePosible;
				break;
			}
			else{
				dama.defiende[dama.defiende.length] = escaquePosible;
				break;
			}
		}
	}
	for(var i=1; i <= arriba; i++){
		var escaquePosible = dama.escaque + 8*i;
		if(escaquePosible<=64){
			if(tab[escaquePosible]==1){
				dama.listademov[dama.listademov.length]=escaquePosible;
			}
			else if(tab[escaquePosible]%color!=0){
				dama.ataca[dama.ataca.length]=escaquePosible;
				break;
			}
			else{
				dama.defiende[dama.defiende.length] = escaquePosible;
				break;
			}
		}
	}
	for(var i=1; i <= abajo; i++){
		var escaquePosible = dama.escaque - 8*i;
		if(escaquePosible>0){
			if(tab[escaquePosible]==1){
				dama.listademov[dama.listademov.length]=escaquePosible;
			}
			else if(tab[escaquePosible]%color!=0){
				dama.ataca[dama.ataca.length]=escaquePosible;
				break;
			}
			else{
				dama.defiende[dama.defiende.length] = escaquePosible;
				break;
			}
		}
	}

	dama.valor+=Math.round(dama.ataca.length*0.5);
	dama.valor+=Math.round(dama.defiende.length*0.25);
	
	/*if(dama.escaque==28 || dama.escaque==29 || dama.escaque==36 || dama.escaque==37){
		dama.valor+=7;
	}*/
	
	var mvt = Math.ceil(contMov/6);
	dama.valor += bonoDama[color][mvt][dama.escaque];
	
	dama.listo=1;

}

function Rey(rey,color){
	rey.valor=100000;
	
	if(color==2){
		escaqueReyBlanco = rey.escaque;
	}
	else{
		escaqueReyNegro = rey.escaque;
	}
	rey.listademov = new Array(0);
	rey.defiende = new Array(0);
	rey.ataca = new Array(0);
	
	var sumas = [-9,-8,-7,7,8,9,-1,1];
	
	var casilla = rey.escaque;
	var colRey = casilla%8;
	
	var filRey = Math.ceil(casilla/8);
	var a = 1;

	for(var i=0; i < sumas.length; i++){
		var escaquePosible = casilla + sumas[i];

		if(i==6){
			a = 0;
		}

		if(escaquePosible <= 64 && escaquePosible >= 1){
			var filaPosible = Math.ceil(escaquePosible/8);
			if(filaPosible == filRey + a || filaPosible == filRey - a){
				if(tab[escaquePosible]==1){
					rey.listademov[rey.listademov.length]=escaquePosible;
				}
				else if(tab[escaquePosible]%color!=0){
					rey.ataca[rey.ataca.length] = escaquePosible;
				}
				else{
					rey.defiende[rey.defiende.length] = escaquePosible;
				}
			}
		}
	}
	
	if(colRey==5 && (filRey==1 || filRey==8)){
		if(color==2){
			if(tab[6]==1 && tab[7]==1 && tab[8]==2*5){
				rey.listademov[rey.listademov.length]=rey.escaque+2;
			}
			if(tab[4]==1 && tab[3]==1 && tab[2]==1 && tab[1]==2*5){
				rey.listademov[rey.listademov.length]=rey.escaque-2;
			}
		}
		else{
			if(tab[62]==1 && tab[63]==1 && tab[64]==3*5){
				rey.listademov[rey.listademov.length]=rey.escaque+2;
			}
			if(tab[60]==1 && tab[59]==1 && tab[58]==1 && tab[57]==3*5){
				rey.listademov[rey.listademov.length]=rey.escaque-2;
			}
		}
	}
	
	
	/*if((colRey==7 || colRey==3) && (filRey==1 || filRey==8)){
		rey.valor+=20;
	}*/
	
	var mvt = Math.ceil(contMov/6);
	rey.valor += bonoRey[color][mvt][rey.escaque]
	rey.listo=1;
}