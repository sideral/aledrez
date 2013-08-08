function Caballo(cab,color){

	cab.listademov = new Array(0);
	cab.ataca = new Array(0);
	cab.defiende = new Array(0);
	
	var sumas = [-17,-15,15,17,-10,-6,6,10];
	
	var casilla = cab.escaque;
	var filCab = Math.ceil(casilla/8);
	var colCab = cab.escaque%8;
	if(colCab==0){
		colCab = 8;
	}
	var a = 2;
	
	for(var i=0; i < sumas.length; i++){
		var escaquePosible = casilla + sumas[i];
		if(i==4){
			a = 1;
		}

		if(escaquePosible <= 64 && escaquePosible >= 1){
			var filaPosible = Math.ceil(escaquePosible/8);
			if(filaPosible == filCab + a || filaPosible == filCab - a){
				if(tab[escaquePosible]==1){
					cab.listademov[cab.listademov.length]=escaquePosible;
				}
				else if(tab[escaquePosible]%color!=0){
					cab.ataca[cab.ataca.length]=escaquePosible;
				}
				else{
					cab.defiende[cab.defiende.length]=escaquePosible;
				} 
			}
		}
	}
	cab.valor=300;
	
	/*cab.valor+=cab.listademov.length*2.5;
	
	if(colCab==8 || colCab==1){
		cab.valor-=4;
	}
	if(cab.escaque == 28 || cab.escaque == 29 || cab.escaque == 36 || cab.escaque == 37){
		cab.valor+=5;
	}
	if((cab.escaque == 28 || cab.escaque == 29) && (tab[14]%19==0 && tab[22]==1)){
		cab.valor-=10;
	}
	*/
	
	cab.listo = 1;
	cab.valor += cab.ataca.length*1.5;
	cab.valor += cab.defiende.length*1.5;
	
	/*if((color==2 && (cab.escaque==2 || cab.escaque==7)) || (color==3 && (cab.escaque==58 || cab.escaque==63))){
		cab.valor-=6;
	}*/
	var mvt = Math.ceil(contMov/6);
	cab.valor += bonoCaballo[color][mvt][cab.escaque]
}

function Torre(tor,color){

	tor.listademov = new Array(0);
	tor.ataca = new Array(0);

	var colTor = tor.escaque%8;
	if(colTor==0){
		colTor = 8;
	}
	var filTor = Math.ceil(tor.escaque/8);
	var arriba = 8 - filTor;
	var abajo = filTor-1;
	var derecha = 8 - colTor;
	var izquierda  = colTor-1; 

	for(var i=1; i <= derecha; i++){
		var escaquePosible = tor.escaque + i;
		if(escaquePosible<=64){
			if(tab[escaquePosible]==1){
				tor.listademov[tor.listademov.length]=escaquePosible;
			}
			else if(tab[escaquePosible]%color!=0){
				tor.ataca[tor.ataca.length]=escaquePosible;
				break;
			}
			else{
				tor.defiende[tor.defiende.length]=escaquePosible;
				break;
			}
		}
	}
	
	for(var i=1; i <= izquierda; i++){
		var escaquePosible = tor.escaque - i;
		if(escaquePosible>0){
			if(tab[escaquePosible]==1){
				tor.listademov[tor.listademov.length]=escaquePosible;
			}
			else if(tab[escaquePosible]%color!=0){
				tor.ataca[tor.ataca.length]=escaquePosible;
				break;
			}
			else{
				tor.defiende[tor.defiende.length]=escaquePosible;
				break;
			}
		}
	}
	for(var i=1; i <= arriba; i++){
		var escaquePosible = tor.escaque + 8*i;
		if(escaquePosible<=64){
			if(tab[escaquePosible]==1){
				tor.listademov[tor.listademov.length]=escaquePosible;
			}
			else if(tab[escaquePosible]%color!=0){
				tor.ataca[tor.ataca.length]=escaquePosible;
				break;
			}
			else{
				tor.defiende[tor.defiende.length]=escaquePosible;
				break;
			}
		}
	}
	for(var i=1; i <= abajo; i++){
		var escaquePosible = tor.escaque - 8*i;
		if(escaquePosible>0){
			if(tab[escaquePosible]==1){
				tor.listademov[tor.listademov.length]=escaquePosible;
			}
			else if(tab[escaquePosible]%color!=0){
				tor.ataca[tor.ataca.length]=escaquePosible;
				break;
			}
			else{
				tor.defiende[tor.defiende.length]=escaquePosible;
				break;
			}
		}
	}
	tor.valor=500;
	
	tor.valor += tor.listademov.length;
	tor.valor+=tor.ataca.length*2;
	tor.valor += tor.defiende.length;
	
	/*if(colTor==4 || colTor==5){
		tor.valor+=5;
	}*/
	
	var mvt = Math.ceil(contMov/6);
	tor.valor += bonoTorre[color][mvt][tor.escaque]
	tor.listo=1;
}

function Alfil(alf,color){
	alf.listademov = new Array(0);
	alf.ataca = new Array(0);
	
	var colAlf = alf.escaque%8;
	if(colAlf==0){
		colAlf = 8;
	}
	var filAlf = Math.ceil(alf.escaque/8);
	
	var arrder = Math.min(8-filAlf,8-colAlf);
	var arrizq = Math.min(8-filAlf,colAlf-1);
	var abader = Math.min(filAlf-1,8-colAlf);
	var abaizq = Math.min(filAlf-1,colAlf-1);


	for(var i=1; i <= arrder; i++){
		var escaquePosible = alf.escaque + 9*i;
		if(escaquePosible<=64){
			if(tab[escaquePosible]==1){
				alf.listademov[alf.listademov.length]=escaquePosible;
			}
			else if(tab[escaquePosible]%color!=0){
				alf.ataca[alf.ataca.length]=escaquePosible;
				break;
			}
			else{
				alf.defiende[alf.defiende.length]=escaquePosible;
				break;
			}
		}
	}
	for(var i=1; i <= arrizq; i++){
		var escaquePosible = alf.escaque + 7*i;
		if(escaquePosible<=64){
			if(tab[escaquePosible]==1){
				alf.listademov[alf.listademov.length]=escaquePosible;
			}
			else if(tab[escaquePosible]%color!=0){
				alf.ataca[alf.ataca.length]=escaquePosible;
				break;
			}
			else{
				alf.defiende[alf.defiende.length]=escaquePosible;
				break;
			}
		}
	}
	for(var i=1; i <= abader; i++){
		var escaquePosible = alf.escaque - 7*i;
		if(escaquePosible>0){
			if(tab[escaquePosible]==1){
				alf.listademov[alf.listademov.length]=escaquePosible;
			}
			else if(tab[escaquePosible]%color!=0){
				alf.ataca[alf.ataca.length]=escaquePosible;
				break;
			}
			else{
				alf.defiende[alf.defiende.length]=escaquePosible;
				break;
			}
		}
	}
	for(var i=1; i <= abaizq; i++){
		var escaquePosible = alf.escaque - 9*i;
		if(escaquePosible>0){
			if(tab[escaquePosible]==1){
				alf.listademov[alf.listademov.length]=escaquePosible;
			}
			else if(tab[escaquePosible]%color!=0){
				alf.ataca[alf.ataca.length]=escaquePosible;
				break;
			}
			else{
				alf.defiende[alf.defiende.length]=escaquePosible;
				break;
			}
		}
	}
	alf.valor=300;
	
	alf.valor+= alf.listademov.length*2;
	alf.valor+= alf.ataca.length*1.5;
	alf.valor+= alf.defiende.length*1.5;
	/*if(alf.escaque==50 || alf.escaque==55 || alf.escaque==10 || alf.escaque==15){
		alf.valor+=7;
	}
	if(color==2){
		if(alf.escaque==3 || alf.escaque==6){
			alf.valor-=5;
		}
	}
	else{
		if(alf.escaque==59 || alf.escaque==62){
			alf.valor-=5;
		}
	}
*/
	var mvt = Math.ceil(contMov/6);
	alf.valor += bonoAlfil[color][mvt][alf.escaque]

	alf.listo=1;
}
