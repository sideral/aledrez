
function ClaseMenu(){
	//Métodos
	this.cargarComponente = Menu_cargarComponente;
	this.iniciar = Menu_iniciar;
	
	this.activar = Menu_activar;
	this.desactivar = Menu_desactivar;
	
	this.mostrar = Menu_mostrar;
	this.ocultar = Menu_ocultar;
	
	this.addItem = Menu_addItem;
	
	//Objetos
	this.comMenu = null;
	
	cargador.onload.add(this,"mostrar");
	ventanas.oncaptura.add(this,"desactivar");
	ventanas.onsoltar.add(this,"activar");
}

function Menu_cargarComponente(){
	var menu = create("control:menu",document.body);
	with(menu.style){
		position = "absolute";
		top = 0;
		left = 0;
		visibility = "hidden";
	}

	menu.show("Main");
	this.comMenu = menu;	
}

function Menu_iniciar(){
	with(this.comMenu){
		addItem("Internet");
			Internet.addItem("Conectar al servidor", menu_abrirLogin);
	}
}

function Menu_addItem(name,action,objeto,args,params){
	return this.comMenu.addItem(name,action,objeto,args,params);
}

function Menu_desactivar(){
	this.comMenu.disable();
}

function Menu_activar(){
	this.comMenu.enable();
}

function Menu_mostrar(){
	this.comMenu.style.visibility = "visible";
}

function Menu_ocultar(){
	this.comMenu.style.visibility = "hidden";
}

function menu_abrirLogin(){
	login.abrir();
}



function prueba(){
	var nombre = prompt("Nombre del motor:","Aledrez");
	partida.elegirJugador(NEGRO,nombre);
}

function prueba2(){
	partida.jugador[NEGRO].terminar();
	window.close();
	//partida.elegirJugador(NEGRO,"Alejandro");
}

function prueba3(){
	partida.elegirJugador(BLANCO,"Magnus");
	partida.jugadorTurno.moverEsteTurno()
}

function prueba4(){
	partida.datos.mostrar();
}