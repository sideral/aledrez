function ClaseAdministrador(){
	
	this.cargarComponente = nullFunction;
	
	//Métodos
	this.registrarNuevo = Administrador_registrarNuevo;
	this.elegir = Administrador_elegir;
	
	//Propiedades
	this.motoresRegistrados = new Array();
	Administrador_cargarBaseDatos(this);	
}

function Administrador_elegir(nombre){
	var motor = this.motoresRegistrados[nombre];
	
	if(motor==undefined){
		alert("El motor " + nombre + " no está registrado.");
		return null;
	}
		
	return motor;
}

function Administrador_registrarNuevo(tipo,nombre,path,archivos){
	if(this.motoresRegistrados[nombre]!=undefined && tipo != REMOTO){
		alert("Ya existe un motor con el mismo nombre.");
		return;	
	}
	switch(tipo){
		case WINBOARD:
			this.motoresRegistrados[nombre] = new MotorWinboard(nombre,path,archivos);
			break;
		case SCRIPT:
			this.motoresRegistrados[nombre] = new MotorScript(nombre,path);
			break;
		case SERVIDOR:
			this.motoresRegistrados[nombre] = new MotorServidor(nombre,path,archivos);
			break;
		case HUMANO:
			this.motoresRegistrados[nombre] = new CerebroHumano(nombre);
			break;
		case REMOTO:
			this.motoresRegistrados["r->" + nombre] = new OponenteRemoto(nombre);
	}
}

function Administrador_cargarBaseDatos(adm){
	//Datos se deberían extraer de un documento xml.
	adm.registrarNuevo(HUMANO,"Alejandro");
	adm.registrarNuevo(WINBOARD,"Ruffian","D:\\Ajedrez\\ruffian\\ruffian.exe");
	adm.registrarNuevo(WINBOARD,"The King","D:\\Ajedrez\\cm\\theking.exe");
	adm.registrarNuevo(WINBOARD,"Amyan","D:\\Ajedrez\\amyan\\amyan.exe");
	adm.registrarNuevo(WINBOARD,"Abrok","D:\\Ajedrez\\Abrok\\Abrok_5_0.exe");
	adm.registrarNuevo(WINBOARD,"Kaissa","D:\\Ajedrez\\Abrok\\kaissa2_10\\kaissa2_10.exe");
	adm.registrarNuevo(WINBOARD,"Beowulf","D:\\Ajedrez\\Beowulf\\Beowulf.exe");
	adm.registrarNuevo(WINBOARD,"Jonny","D:\\Ajedrez\\jonny\\jonny262\\jonny262.exe");
	adm.registrarNuevo(WINBOARD,"Crazy","D:\\Ajedrez\\Crazy\\Crazy_Bishop.exe");
	adm.registrarNuevo(WINBOARD,"Quark","D:\\Ajedrez\\Quark\\Quark.exe");
	adm.registrarNuevo(SERVIDOR,"Aledrez","http://localhost/aledrez/servicio/servicio.asmx?wsdl");
	adm.registrarNuevo(WINBOARD,"Yace","D:\\Ajedrez\\yace\\WB\\yace.exe");
	adm.registrarNuevo(WINBOARD,"Thinker","D:\\Ajedrez\\Thinker\\thinker.exe");
	adm.registrarNuevo(WINBOARD,"Glc","D:\\Ajedrez\\Glc\\glc300.exe");
	adm.registrarNuevo(WINBOARD,"Pepito","D:\\Ajedrez\\Pepito\\pepito_intel_profile.exe");
	adm.registrarNuevo(WINBOARD,"Yawce","D:\\Ajedrez\\Yawce\\yawce016.exe");
	adm.registrarNuevo(SCRIPT,"Magnus","./AjedrezNumerico/magnus.html");
}


CerebroHumano.prototype = new ClaseMotor();

function CerebroHumano(nombre){
	this.tipo = HUMANO;
	this.nombre = nombre;
	this.enviarMovimiento = nullFunction;
	this.cargar = nullFunction;
	this.iniciar = nullFunction;
	this.resetear = nullFunction;
	this.terminar = nullFunction;
	this.fijarProfundidad = nullFunction;
	this.iniciarPartida = nullFunction;
}

