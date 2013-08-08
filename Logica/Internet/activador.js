ClaseActivador.prototype = new ClaseVentana();

function ClaseActivador(){
	this.cargarComponente = Activador_cargarComponente;
	this.abrir = Activador_abrir;
	this.soltar = Activador_soltar;
}

function Activador_cargarComponente(){
	var activa = this.crearVentana(
		"Configuración", 1,
		"width:44%; height: 60%; top: 16%; left: 28%",
		"height:95%,top:5%"
	);
}

function Activador_abrir(){
	this.ventana.abrir("./Dialogos/activador.html");
	this.capturar();
}

function Activador_soltar(){
	ventanas.onsoltar.fire();
	tablero.desactivar();
}