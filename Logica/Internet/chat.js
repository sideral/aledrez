ClaseChat.prototype = new ClaseVentana();

function ClaseChat(){
	this.cargarComponente = Chat_cargarComponente;
	this.abrir = Chat_abrir;
	this.desconectar = Chat_desconectar;
	
	control.onload.add(this,"abrir");
	control.ondesconectar.add(this,"cerrar");
	control.ontimeout.add(this,"desconectar");
}

function Chat_cargarComponente(){
	var chat = this.crearVentana(
		"Chat",	1 + 2 + 4,
		"width:25%; height:70%; left:2%; top:15%",
		"height:95%; top:5%"
	);
}

function Chat_desconectar(){
	this.canal.desconectarUsuario();
}

function Chat_abrir(){
	this.ventana.abrir("./Dialogos/chat.html");
}
