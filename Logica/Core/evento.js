function Evento(){

	this.registro = new Array();
	
	this.add = function(receptor,metodo){
		var idx = this.registro.length;
		this.registro[idx] = new Object();
		this.registro[idx].receptor = receptor;
		this.registro[idx].metodo = metodo;
	}
	
	this.remove = function(receptor,metodo){
		var longitud = this.registro.length;
		for(var i=0; i < longitud; i++){
			if(this.registro[i].receptor == receptor && this.registro[i].metodo == metodo){
				for(var j=i; j < longitud-1; j++){
					this.registro[j] = this.registro[j+1];				
				}
				this.registro.length--;
				break;
			}
		}
	}
	
	this.fire = function(args){
		for(var i=0; i < this.registro.length; i++){
			var receptor = this.registro[i].receptor;
			var metodo = this.registro[i].metodo;
			receptor[metodo](args);
		}
	}
}

