function Iniciar(){
	IniciarConstantes();
	arreglosEvaluacion();
	if(!VerHacerPosicion){
		ponerValoresIniciales();
	}
}

function IniciarConstantes(){
	VerHacerPosicion = false;
	casillasEntrada = new Object();
	contador = 0;
	contMov = 1;
	movimientoHecho = new Array();
	pzComida = new Array();
	movLegales = new Array();
	arbolCapturas = new Array();
	capturasLegales = new Array();
	profundidadConst = 3;
	colorTurno = 2;
	colorMaquina = 3;
}

function getPosicionInicial(){
	IniciarTablero();
	IniciarPiezas();
	DeterminarMov();
}

function IniciarTablero(){
	tab = new Array(65);
	tab[0] = 0;
	for(var i=1; i <= 64; i++){
		tab[i]=parseInt(eval("casillasEntrada.c" + i));
	}
	
	tab.toString = tab_toString;
}

function tab_toString(){
	var retorno = "";
	for(var i=7; i >=0; i--){
		for(var j=0; j < 8; j++){
			var pieza = tab[i*8+j+1];
			switch(pieza){
				case 1:
					retorno += "&nbsp;&nbsp;&nbsp;";
					break;
				case 15:
				case 10:
					retorno += "t";
					break;
				case 21:
				case 14:
					retorno += "a";
					break;
				case 33:
				case 22:
					retorno += "c";
					break;
				case 39:
				case 26:
					retorno += "d";
					break;
				case 51:
				case 24:
					retorno += "r";
					break;
				case 38:
				case 57:
					retorno += "p";
					break;
			}
			
			if(pieza%2==0 && pieza!=1){
				retorno += "B&nbsp;";
			}
			else if(pieza!=1){
				retorno += "N&nbsp;";
			}
		}
		retorno += "<br>";	
	}
	return retorno;


}


function Pieza(){
	this.nombre = new Number;
	this.escaque = new Number;
	this.ataca = new Array(0);
	this.defiende = new Array(0);
	this.listademov = new Array(0);
	this.valor= new Number;
	this.listo=0;
}

function IniciarPiezas(){
			
	cpzB = new Array(0);
	cpzN = new Array(0);
	var j = 0; 
	var k = 0;
	
	for(var i = 1; i < tab.length; i++){
		
		if(tab[i]==1){
			continue;
		}
		if(tab[i]%2==0){
			var color = 2;
		}
		else if(tab[i]%3==0){
			var color = 3;
		}		

		if(color==2){
			cpzB[j] = new Pieza;
			cpzB[j].nombre = tab[i];
			cpzB[j].escaque = i;
			j++;
		}
		else if(color==3){
			cpzN[k] = new Pieza;
			cpzN[k].nombre = tab[i];
			cpzN[k].escaque = i;
			k++;
		}
	}

	cpz = cpzB.concat(cpzN);
	
	for(var i=cpz.length-1; i >= 0; i--){
		elegirPieza(cpz[i]);
	}
}

function ponerValoresIniciales(){

/*
  Columna 1: Color = 1: vacio, 2: blanco, 3: negro
  Columna 2: Pieza = 1: rey, 2: dama, 3: torre, 4: caballo, 5: alfil, 6: peon
  Columna 3: Numero de piezas blancas que atacan/defienden a la pieza
  Columna 4: Numero de piezas negras  que atacan/defienden a la pieza
*/
	
	casillasEntrada.c1 = 2*5;
	casillasEntrada.c2 = 2*7;
	casillasEntrada.c3 = 2*11;
	casillasEntrada.c4 = 2*13;
	casillasEntrada.c5 = 2*17;
	casillasEntrada.c6 = 2*11;
	casillasEntrada.c7 = 2*7;
	casillasEntrada.c8 = 2*5;
	
	casillasEntrada.c9 = 2*19;
	casillasEntrada.c10 = 2*19;
	casillasEntrada.c11 = 2*19;
	casillasEntrada.c12 = 2*19;
	casillasEntrada.c13 = 2*19;
	casillasEntrada.c14 = 2*19;
	casillasEntrada.c15 = 2*19;
	casillasEntrada.c16 = 2*19;
	
	casillasEntrada.c49 = 3*19;
	casillasEntrada.c50 = 3*19;
	casillasEntrada.c51 = 3*19;
	casillasEntrada.c52 = 3*19;
	casillasEntrada.c53 = 3*19;
	casillasEntrada.c54 = 3*19;
	casillasEntrada.c55 = 3*19;
	casillasEntrada.c56 = 3*19;	
	casillasEntrada.c57 = 3*5;
	casillasEntrada.c58 = 3*7;
	casillasEntrada.c59 = 3*11;
	casillasEntrada.c60 = 3*13;
	casillasEntrada.c61 = 3*17;
	casillasEntrada.c62 = 3*11;
	casillasEntrada.c63 = 3*7;
	casillasEntrada.c64 = 3*5;

	casillasEntrada.c17 = 1;
	casillasEntrada.c18 = 1;
	casillasEntrada.c19 = 1
	casillasEntrada.c20 = 1;
	casillasEntrada.c21 = 1;
	casillasEntrada.c22 = 1;
	casillasEntrada.c23 = 1;
	casillasEntrada.c24 = 1;
	casillasEntrada.c25 = 1;
	casillasEntrada.c26 = 1;
	casillasEntrada.c27 = 1;
	casillasEntrada.c28 = 1;
	casillasEntrada.c29 = 1
	casillasEntrada.c30 = 1;
	casillasEntrada.c31 = 1;
	casillasEntrada.c32 = 1;
	casillasEntrada.c33 = 1;
	casillasEntrada.c34 = 1;
	casillasEntrada.c35 = 1;
	casillasEntrada.c36 = 1
	casillasEntrada.c37 = 1
	casillasEntrada.c38 = 1;
	casillasEntrada.c39 = 1;
	casillasEntrada.c40 = 1;
	casillasEntrada.c41 = 1;
	casillasEntrada.c42 = 1;
	casillasEntrada.c43 = 1
	casillasEntrada.c44 = 1;
	casillasEntrada.c45 = 1;
	casillasEntrada.c46 = 1
	casillasEntrada.c47 = 1;
	casillasEntrada.c48 = 1;
	
	if(!VerHacerPosicion){
		getPosicionInicial();
	}
}
