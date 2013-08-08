function cargarAledrez(){
	cargarComponentes(seleccionarComponentes());
}

function cargarComponentes(componentes){
	cargador = new ClaseCargador();
	ventanas = new GlobalVentanas();

	for(var x in componentes){
		if(componentes[x]!=null){
			var script = create("script",document.body);
			script.src = componentes[x].recurso;
			try{
				eval(x + " = new " + componentes[x].clase);
			}
			catch(e){
				alert("ERROR FATAL: " + e.description);
				return;
			}
		}
		else{
			eval(x + " = undefined");
		}
	}
	
	for(var x in componentes){
		if(componentes[x]!=null)
			cargador.barra.addStep("cargarComponente",eval(x));
	}

	cargador.barra.load();
}


function seleccionarComponentes(){

	var doc = new ActiveXObject("Msxml2.DOMDocument.4.0");
	
	doc.load("./Recursos/componentes.xml");

	var items = doc.selectNodes("/componentes/componente/item");
	var clases = doc.selectNodes("/componentes/componente/clase");
	var recursos = doc.selectNodes("/componentes/componente/recurso");
	var habilitados = doc.selectNodes("/componentes/componente/habilitado");
	
	var objetos = new Array();

	for(var i=0; i < items.length; i++){
		var item = items.item(i).firstChild.nodeValue;
		if(habilitados.item(i).firstChild.nodeValue=="si"){
			objetos[item] = new Object();
			objetos[item].clase = clases.item(i).firstChild.nodeValue;
			objetos[item].recurso = recursos.item(i).firstChild.nodeValue;
		}
		else{
			objetos[item] = null;
		}
	}
	
	for(var x in objetos){
		if(objetos[x]==null){
			continue;
		}
		var requisitos = doc.selectNodes("/componentes/componente/item[. = '" + x + "']/following-sibling::requisito");

		objetos[x].requisitos = new Array();	
		for(var i=0; i < requisitos.length; i++){
			var requisito = requisitos.item(i).firstChild.nodeValue;
			
			if(objetos[requisito] != undefined){
				objetos[x].requisitos[i] = requisito;
			}
			else{
				objetos[x] = null;
				break;
			}
		}
	}	
	
	return objetos;
	
}



