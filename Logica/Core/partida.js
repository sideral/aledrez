function ClasePartida(){ 
	this.cargarComponente = Partida_cargarComponente;

	//Campos
	this.colorTurno = BLANCO;
	
	//Objetos
	this.jugador = new ObjJugadores();
	this.jugadorTurno = this.jugador[this.colorTurno];
	this.datos = new ClaseDatosPartida();

	//Métodos de juego
	this.prepararNueva = Partida_prepararNueva;
	this.empezar = Partida_empezar;
	this.terminar = Partida_terminar;
	this.cambiarTurno = Partida_cambiarTurno;
	this.enviarMovimiento = Partida_enviarMovimiento;
	
	//Métodos de administración
	this.elegirJugador = Partida_elegirJugador;
	this.fijarTiempo = Partida_fijarTiempo;
	this.destruir = Partida_destruir;


	//Propiedades
	this.enCurso = false;
	this.jugadorPermitido = "";
	
	//Eventos
	this.onterminar = new Evento();
	this.onpreparar = new Evento();	
	this.onempezar = new Evento();	
	
	tablero.onmoverpieza.add(this,"enviarMovimiento");
	tablero.onmoverpieza.add(this,"cambiarTurno");

}

function Partida_cargarComponente(){
	document.body.onbeforeunload = this.destruir;
	
	if(menu){
		var mPar = menu.addItem("Partida",null,null,null,"index=0");
		mPar.addItem("Elegir Jugador",prueba);	
	}
	
}

function Partida_destruir(){
	partida.jugador[BLANCO].terminar();
	partida.jugador[NEGRO].terminar();
}

function ObjJugadores(){
	this[BLANCO] = administrador.elegir(JUGADOR_PREDETERMINADO);
	this[NEGRO] = administrador.elegir(JUGADOR_PREDETERMINADO);
}

function Partida_prepararNueva(){
	partida.colorTurno = BLANCO;
	partida.jugadorTurno = partida.jugador[BLANCO];
	
	partida.datos = new ClaseDatosPartida();
	partida.datos.fijarTiempo("profundidad",2);
	partida.jugador[BLANCO].fijarProfundidad();
	partida.jugador[NEGRO].fijarProfundidad();
	partida.enCurso = false;

	tablero.resetear();

	partida.onpreparar.fire();
}

function Partida_empezar(){
	if(this.enCurso==true){
		this.terminar();
	}
	
	this.enCurso = true;
	this.datos.fecha = new Date();
	
	this.onempezar.fire();
	
}

function Partida_terminar(resultado){
	//Procesar resultado.
	this.onterminar.fire(resultado);
	this.enCurso = false;
}

function Partida_cambiarTurno(){
	if(this.colorTurno == BLANCO){
		this.colorTurno = NEGRO;
		this.jugadorTurno = this.jugador[NEGRO];
	}
	else{
		this.colorTurno = BLANCO;
		this.jugadorTurno = this.jugador[BLANCO];
	}
}

function Partida_elegirJugador(color,nombre){
	this.jugador[color].terminar();
	this.jugador[color] = administrador.elegir(nombre);
	
	if(this.jugador[color]!=null){
		this.jugador[color].cargar();
		this.jugador[color].iniciarPartida();

		if(color == this.colorTurno)
			this.jugadorTurno = this.jugador[color];
		
		tablero.ponerTipo(this.jugador[color].tipo,color,nombre);
		this.datos[color] = this.jugador[color].nombre;
	}
	else{
		//Si no está registrado.
		this.jugador[color] = administrador.elegir("Alejandro");
	}
}

function Partida_fijarTiempo(tipo,valor){
	switch(tipo){
		case "profundidad":
			relojes.setTiempoInicial(0,0,0,0);
			relojes.setTipo("up");
			break;
		case "completo":
			relojes.setTiempoInicial(valor[0],valor[1],valor[2],valor[3]);
			relojes.setTipo("down");
			break;
		case "pormovimiento":
			relojes.setTiempoInicial(valor[0],valor[1],valor[2],0);
			relojes.setTipo("down");
			break;
		case "movsportiempo":
			relojes.setTiempoInicial(valor[0],valor[1],valor[2],valor[3]);
			relojes.setTipo("down");
			break;
		default:
			relojes.setTiempoInicial(0,0,0,0);
			relojes.setTipo("up");
	}

	this.datos.tiempo.tipo = tipo;
	this.datos.tiempo.valor = valor;
}

function Partida_enviarMovimiento(move){
	this.enCurso = true;
	this.jugadorTurno.enviarMovimiento(move);
}

function ClaseDatosPartida(){
	//Propiedades PGN
	this.Event = "?";
	this.Site = "B?";
	this.Date = null;
	this.Round = "?";
	this.White = "?";
	this.Black = "?";
	this.Result = "*";

	this.WhiteTitle = "";
	this.WhiteElo = 0;
	this.WhiteCountry = "";
	this.BlackTitle  = "";
	this.BlackElo = 0;
	this.BlackCountry = "";
	this.ECO = "";
	
	this.movimientos = new Array();
	this.comentarios = new Array();
	

	this.toString = DatosPartida_toString;
	
}

function DatosPartida_toString(){
	var str = "";
	for(var x in this){
		if(x!="toString" && x!="movimientos"){
			str += x + ": " + this[x] + "\r\n";	
		}
	}
	return str;
}