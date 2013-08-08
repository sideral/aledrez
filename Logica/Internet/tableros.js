ClaseTableros.prototype = new ClaseVentana();

function ClaseTableros(){
	this.cargarComponente = Tableros_cargarComponente;

	this.agregarTablero = Tableros_agregarTablero;
	this.abrir = Tableros_abrir;
	
	this.tabla = null;
	
	//Eventos
	this.oningresooponente = new Evento();
	
	control.onload.add(this,"abrir");
	control.ondesconectar.add(this,"cerrar");
	control.ontimeout.add(this,"cerrar");

}

function Tableros_cargarComponente(){
	var tab = this.crearVentana(
		"Tableros",0,
		"width: 25%; height:44%; top:15%; left:73%"	
	);
}

function Tableros_agregarTablero(config){
	this.tabla.agregarTablero(config);
}

function Tableros_abrir(){
	this.ventana.abrir("./Dialogos/tableros.html");
}

