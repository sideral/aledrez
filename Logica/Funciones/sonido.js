function ClaseSonido(){
	this.cargarComponente = Sonido_cargarComponente;
	this.comSonido = null;
	
	this.coleccion = new SonidosColeccion();
	
	this.play = Sonido_play;
	
}

function Sonido_cargarComponente(){
	return;this.comSonido = create("object",document.body);
	
	with(this.comSonido){
		classid = "CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6";
		style.display = "none";
		settings.autoStart = false;
		URL = sonido.coleccion["jaque"];
	}
}

function SonidosColeccion(){
return;
	this.jaque2 = "./Media/arka064.mp3";
	this.jaque1 = "./Media/Stehit.wav";
	this.jaque = "./Media/fallen.wav";
	this.intro1 = "./Media/chemin.mid";
}

function Sonido_play(strEvento){
//	sonido.comSonido.controls.play();
}