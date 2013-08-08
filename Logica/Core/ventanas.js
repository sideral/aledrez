function ClaseVentana(){

	this.crearVentana = function(titulo,botones,dimensiones,maxima,maximizada){
		var win = create("control:ventana",document.body);

		win.titulo = titulo;
		win.botones = botones;
		
		win.contenido.style.backgroundColor = "ivory";
		win.barraTitulo.style.backgroundColor = "maroon";
		win.style.visibility = "hidden";
		
		if(dimensiones!="" && dimensiones!=undefined){
			var dim = extraerDimensiones(dimensiones);
			for(var x in dim){
				win.style[x] = dim[x];					
			}			
		}
		
		if(maxima!="" && maxima!=undefined){
			var dim = extraerDimensiones(maxima);
			for(var x in dim){
				win.estiloMax[x] = dim[x];					
			}
		}
		
		if(maximizada){
			win.maximizada = true;
		}
		
		win.onsoltar = this.soltar;
		//win.oncerrar = this.cerrar;
		
		ventanas.oncaptura.add(this,"desactivar");
		ventanas.onsoltar.add(this,"activar");
		
		this.ventana = win;
		return win;
	}

	this.abrir = function(url){
		this.ventana.abrir(url);
	}
	
	this.desactivar = function(){
		this.ventana.desactivar();
	}
	
	this.activar = function(){
		this.ventana.activar();
	}
	
	this.cerrar = function(){
		this.ventana.cerrar();
	}
	
	this.capturar = function(){
		this.ventana.capturar();
		ventanas.oncaptura.fire();
	}
	
	this.soltar = function(){
		ventanas.onsoltar.fire(this);
	}
}

function extraerDimensiones(cadena){
	cadena = cadena.replace(/ /gm,"");
	var partes = cadena.split(";");
	
	var aspecto;
	var retorno = new Object()
	for(var i=0; i < partes.length; i++){
		aspecto = partes[i].split(":");
		retorno[aspecto[0]] = aspecto[1];	
	}	

	return retorno;

}

function GlobalVentanas(){
	this.oncaptura = new Evento();
	this.onsoltar = new Evento();
}