ClaseLista.prototype = new ClaseVentana();

function ClaseLista(){
	//Métodos
	this.cargarComponente = Lista_cargarComponente;
	this.add = function(move){this.comLista.add(move)}
	this.resetear = function(){this.comLista.reset()}
	this.ponerJaque = nullFunction;
	this.cargarMovimientos = Lista_cargarMovimientos;
	
	//Objetos
	this.comLista = null;
	
	//Handlers
	this.takebackHandler = function(){
		tablero.retroceder();
	}
	this.takeforwardHandler = function(){
		tablero.adelantar();
	}
	
	//Registrar eventos	
	cargador.onload.add(this,"abrir");
	tablero.onmoverpieza.add(this,"add");
	tablero.onjaque.add(this,"ponerJaque");
	partida.onpreparar.add(this,"resetear");
}

function Lista_cargarComponente(){
	var win = this.crearVentana(
		"Movimientos", 1 + 2,
		"width:22%; height: 60%; top:15%; left:75%",
		"height:95%;top:5%;width:22%"
	);

	with(win.style){
		visibility = "hidden";
		overflow = "visible";
	}
	
	win.estiloMax.left = document.body.clientWidth*0.78;
	
	var list = create("control:listamovimientos",win.contenido);
	list.ontakeback = this.takebackHandler;
	list.ontakeforward = this.takeforwardHandler;	
	this.comLista = list;
}

function Lista_cargarMovimientos(moves){
	tablero.algebraToCoordenada(moves);
}

