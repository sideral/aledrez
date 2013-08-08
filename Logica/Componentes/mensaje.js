ClaseMensaje.prototype = new ClaseVentana();

function ClaseMensaje(){
	//Campos
	this.timeout = 0;
	this.duracion = 1000;

	//Métodos
	this.cargarComponente = Mensaje_cargarComponente;
	this.mostrar = Mensaje_mostrar;
	this.quitar = Mensaje_quitar;
	
	this.mostrarPopup = Mensaje_mostrarPopup;
	this.quitarPopup = Mensaje_quitarPopup;

	//Handlers
	this.ingresoOponente = Mensaje_ingresoOponente;
	
	//Objetos
	this.comPopup = null;
	this.comAyuda = null;
	
	cargador.onload.add(this,"abrir");	
	
}

function Mensaje_cargarComponente(){
	var msj = this.crearVentana(
		"Mensajes", 1,
		"width:20%; height: 15%; left:5%; top:35%"	
	);
	
	with(msj.contenido.style){
		fontSize = "16px";
		textAlign = "center";
	}

	var pop = create("div",document.body);
	
	with(pop.style){
		height = "10%";
		width = "20%";
		left = "40%";
		top = "40%";
		display = "none";
		backgroundColor = "ivory";
		position = "absolute";
		border = "maroon ridge 3px";
		textAlign = "center";
		fontFamily = "Verdana";
		fontSize = "13px";
		padding = "7px";
	}
	
	pop.noWrap = true;
	
	this.comPopup = pop;
	
}

function Mensaje_mostrar(msg,duracion){
	if(duracion==undefined){
		var duracion = this.duracion;
	}
	
	this.ventana.contenido.innerText = msg;
	clearTimeout(this.timeout);
	this.timeout = setTimeout(mensaje.quitar,duracion);
}

function Mensaje_quitar(){
	mensaje.ventana.contenido.innerText = "";
}

function Mensaje_mostrarPopup(msg){
	this.comPopup.innerHTML = msg;
	this.comPopup.style.display = "block";
}

function Mensaje_quitarPopup(){
	this.comPopup.style.display = "none";
}

function Mensaje_ingresoOponente(oponente){
	this.mostrarPopup("<span style='vertical-align:middle;'>"
						+ oponente + " ha ingresado."
						+ "<br>Haz clic en <b>Iniciar juego.</b>"
						+ "</span>");
}