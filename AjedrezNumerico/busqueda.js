
function ProfundizacionIterativa(tmpI,prof){
	valorMejorMov = -Infinity;
	var mayorValor = Infinity;
	valorMovimiento = new Array(0);
	for(var i=1; i <= prof; i++){
	//alert("ciclo: " + i);
		mayorValor = AlphaBeta(i,-Infinity,Infinity,i,tmpI);
		/*var diferencia = Math.floor(mayorValor/100);
		if(i != profundidadConst){
			if(diferencia < -1){
				mayorValor+=diferencia*100;
			}
			else if(diferencia > 1){
				mayorValor-=diferencia*100;
			}
		}*/
		IniciarPiezas();
	}
	//alert("Mayor Valor: " + mayorValor);
	return mayorValor;
}

function AlphaBeta(depth,alpha,beta,ciclo,tmpI){

	var indice = ciclo - depth;
	if (depth <= 0){
		return Evaluar(1);
	}

	DeterminarMovPensando(depth,ciclo);
	AlmacenarMovLegales(indice);

	if(tiempoFinal-tmpI > 5000000){
			return alpha;
	}
	if(indice==0){
		valorMovimiento = new Array(0);
	}
	var longitud = movimientosLegales.length;

	for(var i=0; i < longitud; i++){
		var ilegalPorJaque = MoverPensando(movimientosLegales[i],indice);
		if(ilegalPorJaque){
			DeshacerMovimiento(indice);			
			continue;
		}
		cambiarTurno();
		valor = -AlphaBeta(depth-1,-beta,-alpha,ciclo,tmpI);
		cambiarTurno();
		DeshacerMovimiento(indice);

		if(indice==0){
			valorMovimiento[i] = valor;
		}
		if (valor >= beta && valor!=Infinity){
			return beta;
		}
		if(valor > alpha){
			alpha = valor;
			if(indice==0){
				mejorMovimiento = movimientosLegales[i];
			}
		}
			var tiempoF = new Date();
			var tiempoFinal = tiempoF.getTime();
		
		if(tiempoFinal-tmpI > 5000000){
			return alpha;
		}
	}
	return alpha;
}

function MinMax(depth){
	var mejor=-1000000
	contador++;
	var indice = 0;
	if (depth <= 0){
		return Evaluar();
	}
	DeterminarMov(indice);
	AlmacenarPosicion(indice);

	for(var i=0; i < movimientosLegales.length; i++){
		MoverPensando(movimientosLegales[i]);
		cambiarTurno();
		valor = -MinMax(depth-1);
		cambiarTurno();
		DeshacerMovimiento(indice);
		valorMovimiento[i] = valor;
		if(valor > mejor){
			mejor = valor;
			if(indice==0){
				mejorMovimiento = movimientosLegales[i];
			}
		} 			
	}
	return mejor;
}
