function ClaseTablero(){
	//Métodos 
	this.cargarComponente = Tablero_cargarComponente;

	this.resetear = Tablero_resetear;
	//El tablero no debe saber de tipos de oponente.
	//Administrador y partida se encargan de indicarle cuál o cuáles
	//colores son prohibidos para el usuario.
	this.ponerTipo = Tablero_ponerTipo;
	this.ponerPermitido = Tablero_ponerPermitido;
	this.activar = Tablero_activar;
	this.desactivar = Tablero_desactivar;
	this.invertir = Tablero_invertir;
	this.liberarCasilla = Tablero_liberarCasilla;
		
	this.retroceder = Tablero_retroceder;
	this.adelantar = Tablero_adelantar;

	this.moverPieza = Tablero_moverPieza;
	this.toFEN = Tablero_toFEN;
	this.algebraToCoordenada = Tablero_algebraToCoordenada;
	
	this.posicionar = Tablero_posicionar;
	
	this.mostrar = Tablero_mostrar;
	this.ocultar = Tablero_ocultar;
	
	//Handlers
	this.moverpiezaHandler = Tablero_moverpiezaHandler;
	this.jaqueHandler = Tablero_jaqueHandler;
	this.error = Tablero_error;
	this.onload = Tablero_onload;
	
	//Eventos
	this.onmoverpieza = new Evento();
	this.onjaque = new Evento();
	
	//Objetos
	this.comTablero = null;
	
	cargador.onload.add(this,"onload");
	ventanas.oncaptura.add(this,"desactivar");
	ventanas.onsoltar.add(this,"activar");
	
}

function Tablero_cargarComponente(){
	var tab = create("control:tablero",document.body);
	tab.onmoverpieza = tablero.moverpiezaHandler;
	tab.onjaque = tablero.jaqueHandler;
	tab.style.visibility = "hidden";

	tab.colorTurno = BLANCO;
	tab.jugadorBlanco = HUMANO;
	tab.jugadorNegro = HUMANO;

	this.comTablero = tab;
	this.posicionar();
	
	if(menu){
		var mTab = menu.addItem("Tablero");
		mTab.addItem("FEN","toFEN",this);
	}
	
}

function Tablero_moverPieza(move,validar){
	tablero.comTablero.moverPieza(move,validar);
}

function Tablero_retroceder(){
	tablero.comTablero.retroceder();
}

function Tablero_adelantar(){
	tablero.comTablero.adelantar();
}

function Tablero_activar(){
	this.comTablero.activar();
}

function Tablero_desactivar(){
	this.comTablero.desactivar();
}

function Tablero_invertir(){
	this.comTablero.invertir();
}

function Tablero_error(){

}

function Tablero_ponerTipo(tipo,color,nombre){
	if(color==BLANCO){
		tablero.comTablero.jugadorBlanco = tipo;
		tablero.comTablero.nombreBlanco = nombre;
	}
	else{
		tablero.comTablero.jugadorNegro = tipo;
		tablero.comTablero.nombreNegro = nombre;
	}
}

function Tablero_ponerPermitido(nombre){
	tablero.comTablero.jugadorPermitido = nombre;
}

function Tablero_resetear(){
	tablero.comTablero.resetear();
	tablero.comTablero.colorTurno = BLANCO;
	tablero.comTablero.jugadorBlanco = HUMANO;
	tablero.comTablero.jugadorNegro = HUMANO;
	tablero.comTablero.activar();
}

function Tablero_posicionar(){
	var tab = tablero.comTablero;
	tab.style.position = "absolute";
	tab.style.left = (document.body.offsetWidth - tab.offsetWidth)/2;
	tab.style.top = ((document.body.offsetHeight - tab.offsetHeight)/2)*0.8;
}

function Tablero_moverpiezaHandler(evento){
	var move = evento.origen + evento.destino;
	tablero.onmoverpieza.fire(move);
}

function Tablero_jaqueHandler(evento){
	
	if(mensaje)
		mensaje.mostrar("¡Jaque!",3000);

	tablero.onjaque.fire();
}

function Tablero_toFEN(){
	alert(this.comTablero.toFEN());
}

function Tablero_liberarCasilla(){
	this.comTablero.mouse.deshacerClick();//esto es feo
}

function Tablero_mostrar(){
	this.comTablero.style.visibility = "visible";
}

function Tablero_ocultar(){
	this.comTablero.style.visibility = "hidden";
}

function Tablero_onload(){
	this.mostrar();
	document.body.onclick = function(){
		tablero.liberarCasilla();
	}
}

function Tablero_algebraToCoordenada(moves){
	this.comTablero.algebraToCoordenada(moves);
}