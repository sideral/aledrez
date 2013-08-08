function Utilidades_cargar(){
	var arregloLetras = ["a", "b", "c", "d", "e", "f", "g", "h"];
	var k=0; 
	for(var i=1; i <= 8; i++){
		for(var j = 0; j < 8; j++){
			this.NumeroACoordenada[k] = arregloLetras[j] + i;
			this.CoordenadaANumero[arregloLetras[j] + i] = k;
			k++;
		}
	}
}
