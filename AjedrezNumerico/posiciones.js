function almacenarPosicion(){
	juego[contador]=new Array();
	for(var i=2; i < tab.length-2; i++){
		juego[contador][i-2]=new Array(0);
		for(var j=2; j < tab[i].length-2; j++){
			juego[contador][i-2][j-2] = new especiales;
			if(tab[i][j]!=vacia){
				juego[contador][i-2][j-2].nombre = tab[i][j].nombre;
				juego[contador][i-2][j-2].listademov = tab[i][j].listademov;
			}
			else{
				juego[contador][i-2][j-2].nombre = "";
			}
			//delete juego[contador][i][j].listo;
			//juego[contador][i][j].escaque = tab[i][j].escaque;
			//juego[contador][i][j].ataca = tab[i][j].ataca;
			//juego[contador][i][j].defiende = tab[i][j].defiende;
			//juego[contador][i][j].defendidopor = tab[i][j].defendidopor;
			//juego[contador][i][j].atacadopor = tab[i][j].atacadopor;
			//juego[contador][i][j].listademov = tab[i][j].listademov;
			//juego[contador][i][j].bloqueado = tab[i][j].bloqueado;
			
			//delete juego[contador][i][j].bloqueado;
			//delete juego[contador][i][j].casillapeon;
			//juego[contador][i][j].casillapeon = tab[i][j].casillapeon;
			
		}
	}
}
