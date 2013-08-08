ClaseLectorPGN.prototype = new ClaseVentana();

function ClaseLectorPGN(){
	this.cargarComponente = LectorPGN_cargarComponente;
	
	//Métodos
	this.abrirArchivo = LectorPGN_abrirArchivo;
	this.cerrarArchivo = LectorPGN_cerrarArchivo;	
	
	this.leerTags = LectorPGN_leerTags;
	this.abrirJuego = LectorPGN_abrirJuego;
	this.buscarJuego = LectorPGN_buscarJuego;
	this.contarJuegos = LectorPGN_contarJuegos;
	
	//Objetos
	this.progress = null;
	
	//Métodos privados
	this.getTag = LectorPGN_getTag;
	this.mostrarProgreso = LectorPGN_mostrarProgreso;
	
	//Constantes
	this.validTag = new RegExp('^[[]{1}[\\w]+ \"[^\\n\\t\\f\\r\\v]{0,255}\"\]{1}$');
	
	//Propiedades
	this.nombreArchivo = "";
		
	//Objetos
	this.pgn = null;
	this.fso = null;
	
}

function LectorPGN_cargarComponente(){
	this.fso = new ActiveXObject("Scripting.FileSystemObject");
	
	this.crearVentana(
		"Abrir PGN",1+2+4,
		"width:90%;left:5%;top:15%;height:70%"
	);
	
	if(menu){
		var mPgn = menu.addItem("Pgn");
		mPgn.addItem("Abrir juego", "abrirJuego", this);
		mPgn.addItem("Buscar juego","buscarJuego",this);
		mPgn.addItem("Mostrar lista","abrir",this);
	}
	
	this.cajaProgreso = create("div",document.body);
	this.cajaProgreso.bar = create("control:progressbar",this.cajaProgreso);
	
	with(this.cajaProgreso.style){
		position = "absolute";
		height = "20%";
		width = "30%";
		top = "40%";
		left = "35%";
		backgroundColor = "ivory";
		display = "none";
		border = "ridge maroon 3px";
	}
	
	this.cajaProgreso.bar.onfinish = function(){
		//alert("acabó");
	}
	
	with(this.cajaProgreso.bar.style){
		width = "80%";
		left = "10%";
		top = "50%";
		height = "10%";	
		position = "absolute";
	}
	
}


function LectorPGN_abrirArchivo(url){
	try{
		if(this.pgn==null){
			this.pgn = this.fso.OpenTextFile(url,1,false);
			return true;
		}
		else{
			return false;
		}
	}
	catch(e){
		return false;
	}
}

function LectorPGN_cerrarArchivo(){
	try{
		if(this.pgn!=null)
			this.pgn.Close();
		return true;
	}
	catch(e){
		return false;
	}
}


function LectorPGN_mostrarProgreso(){
	this.cajaProgreso.style.display = "block";	
}

function LectorPGN_leerTags(){

	if(this.pgn==null || this.pgn.AtEndOfStream)
		return null;

	var p = this.pgn;
	
	var game = new ClaseDatosPartida();
	var tag = null, moves = null;
	var leyendo = false;
	
	while(!p.AtEndOfStream){
		var line = p.ReadLine();
		if(tag = this.getTag(line)){
			leyendo = true;
			game[tag.name] = tag.value==""? "?":tag.value;
		}
		else if(leyendo==true){
			leyendo= false;
			return game;
		}
	}
}

function LectorPGN_getTag(line){
	//'^\s*[[]\s*{1}[\\w]+\s+\"[^\n\t\f\r\v]{0,255}\"\]{1}\s*$' para import format
	var m = this.validTag.test(line);

	if(m==true){
		var sep = line.indexOf(" ");
		var tag = new Object();			

		tag.name = line.substring(1,sep);
		tag.value = line.substring(sep+2,line.length-2);
		
		return tag;					
	}
	else{
		return null;
	}
}

function LectorPGN_getMoves(p){
	var newLine = "", str="";
	while(!p.AtEndOfStream){
		newLine = p.ReadLine();
		if(newLine == "")
			break;
		else
			str += " " + newLine;	
	}
	
	var lines = new RegExp("\r\n","gm");
	str = str.replace(lines," ");

	var comentExp = new RegExp("\{.*?\} ","g");
	var coments = str.match(comentExp);
	str = str.replace(comentExp,"");
	
	var moveExp = new RegExp("\\.+","g");
	str = str.replace(moveExp," ");
	
	var partes = str.split(" ");
	var result = partes[partes.length-1];
	var moves = new Array();

	for(var i=0, k=0; i < partes.length-1; i++){
		if(partes[i]=="" || !isNaN(partes[i])){
			continue;
		}
		else{
			moves[k++] = partes[i];
		}
	}
	
	return moves;
}

function LectorPGN_abrirJuego(){
	if(this.pgn==null)
		var archivo = prompt("Nombre del archivo","ClassicGames");
		
	if(archivo==null || archivo==""){
		return;
	}
	
	this.abrirArchivo("./Pgn/" + archivo + ".PGN");
	this.nombreArchivo = archivo;
	this.abrir();
	if(juego = this.readGame())
		this.ventana.contenido.innerText = juego.toString();
	
	return juego;
}

function LectorPGN_buscarJuego(){
	if(this.pgn==null)
		var archivo = prompt("Nombre del archivo","2800");
	
	if(archivo==null || archivo==""){
		return;
	}	
	
	this.abrirArchivo("./Pgn/" + archivo + ".pgn");
	this.nombreArchivo = archivo;
	
	var file = this.fso.GetFile("./Pgn/" + archivo + ".pgn");
	var size = file.Size;
	
	var cnt = this.ventana.contenido;
	cnt.style.overflow = "auto";
	var tabla = create("control:table",cnt);
	
	tabla.style.width = "90%";
	tabla.cellSpacing = 0;
	tabla.style.fontFamily = "Verdana";
	tabla.style.fontSize = "11px";
	tabla.style.left = "5%";
	tabla.style.border = "solid maroon 1px";
	tabla.style.position = "relative";
	
	tabla.onmouseover = function(){
		this.style.cursor = "hand";
	}
	
	this.tTabla = tabla;
	
	this.mostrarProgreso();
	this.capturar();
	
	setTimeout(LectorPGN_buscarJuego_2,1);
	
}

function LectorPGN_buscarJuego_2(){
	var cell, row, color = true, cuenta = 0;
	var tabla = lectorPGN.tTabla;
	var juego;
	
	while((juego = lectorPGN.leerTags()) && cuenta < 20){
		row = tabla.insertRow();
		
		if(color){
			row.style.backgroundColor = "lightyellow";
		}
		color = !color;
		
		cell = row.insertCell();
		cell.innerText = juego.White;
		cell = row.insertCell();
		cell.innerText = juego.Black;
		cell = row.insertCell();
		cell.innerText = juego.Date;
		cell = row.insertCell();
		cell.innerText = juego.Event;
		
		row.lineaJuego = lectorPGN.pgn.Line;
		row.onclick = LectorPGN_mostrarJuego;
		row.onmouseover = function(){
			this.color = this.style.backgroundColor;
			this.style.backgroundColor = "palegoldenrod";
		}
		row.onmouseout = function(){
			this.style.backgroundColor = this.color;
		}
		
		cuenta++;
	}
	
	if(juego!=null){
		lectorPGN.cajaProgreso.bar.increment(1);
		setTimeout(LectorPGN_buscarJuego_2,1);
	}
	else{
		lectorPGN.cajaProgreso.bar.fill(100);
		setTimeout(LectorPGN_buscarJuego_3,1);
	}
}

function LectorPGN_buscarJuego_3(){
	lectorPGN.tTabla.adjust();
	lectorPGN.abrir();
	lectorPGN.pgn.Close();
	lectorPGN.cajaProgreso.removeNode(true);

	lectorPGN.pgn = null;
	lectorPGN.tTabla = null;
}

function LectorPGN_mostrarJuego(){
	var linea = this.lineaJuego;

	lectorPGN.abrirArchivo("./Pgn/" + lectorPGN.nombreArchivo + ".pgn");
	
	var p = lectorPGN.pgn;
	var lineaActual = 1;
	
	while(!p.AtEndOfStream && lineaActual < linea){
		p.SkipLine();
		lineaActual++;
	}
	lectorPGN.cerrar();
	
	var moves = LectorPGN_getMoves(p)
	lista.cargarMovimientos(moves);
	lectorPGN.cerrarArchivo();
}

function LectorPGN_contarJuegos(){
	//Incompletos
	this.abrirArchivo("./Pgn/" + this.nombreArchivo + ".pgn");
	var saltar = false;
	var line;
	
	while(!this.pgn.AtEndOfStream){
		if(saltar==false){
			line = this.pgn.ReadLine();
	
			if(LectorPGN_getTag(line)){
				saltar = true;
			}
		}
		else{
			this.pgn.SkipLine();
		}

	}

}


