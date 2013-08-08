ClaseUsuarios.prototype = new ClaseVentana();

function ClaseUsuarios(){
	this.cargarComponente = Usuarios_cargarComponente;

	this.agregarTablero = Usuarios_agregarTablero;
	this.abrir = Usuarios_abrir;
	
	this.tabla = null;

	control.onload.add(this,"abrir");
	control.ondesconectar.add(this,"cerrar");
	control.ontimeout.add(this,"cerrar");
}

function Usuarios_cargarComponente(){
	var usuarios = this.crearVentana(
		"Usuarios", 1 + 4,
		"width:25%; height:35%; top:60%; left:73%",
		"height:95%; top:5%"
	);
}

function Usuarios_agregarTablero(config){
	this.tabla.agregarTablero(config);
}

function Usuarios_abrir(){
	this.ventana.abrir("./Dialogos/usuarios.html");
}