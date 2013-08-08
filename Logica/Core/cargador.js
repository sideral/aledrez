
function ClaseCargador(){
	var caja = create("div",document.body);
	caja.titulo = create("div",caja);

	with(caja.style){
		width = "100%";
		height = "100%";
		position = "absolute";
		top = "0%";
		left = "0%";
		filter = "progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr='#DEB887', EndColorStr='#F5F5D6'); progid:DXImageTransform.Microsoft.Alpha(Opacity=95,FinishOpacity=75,Style=2);  ";
		zIndex = 1000;
	}
	
	var imagen = create("img",caja.titulo);
	imagen.src="./imagenes/aledrez.gif";
	imagen.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)"
	
	with(caja.titulo.style){
		position = "absolute";
		width = "100%";
		height = "30%";
		top = "25%";
		textAlign = "center";
		fontSize = "55px";
		color = "sienna";
		fontFamily = "viking";
		fontWeight = "bold";
	}

	caja.barra = create("control:progressBar",caja);
	caja.barra.onfinish = Portada_onfinishHandler;
	caja.barra.onstep = Portada_onstepHandler;

	with(caja.barra.style){
		position = "absolute";
		height = "1%";
		top = "53%";
		width = "50%";
		left = "25%";
	}
	
	caja.desvanecer = function(){
		this.style.visibility
	}
	
	caja.detalles = new Array();
	caja.explicacion = create("div",caja);
	
	with(caja.explicacion.style){
		position = "absolute";
		height = "1%";
		top = "55%";
		width = "100%";
		textAlign = "center";
		fontSize = "12px";
	}	
	
	//Eventos
	
	caja.onload = new Evento();
	
	return caja;

}

function Portada_onstepHandler(evento){
	//portada.explicacion.innerText = portada.detalles[evento.indice];
}

function Portada_onfinishHandler(evento){
	cargador.removeNode(true);
	cargador.desvanecer();
	cargador.onload.fire();
}