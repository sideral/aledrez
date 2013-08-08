public class Lista
{
	public NodoLista[] Items;
	public int Cuenta;
	
	private int libre;
	private int inicio;

	public Lista(int tamano)
	{

		this.Items = new NodoLista[tamano];
		
		for(int i=0; i < tamano-1; i++)
		{
			this.Items[i].Siguiente = i+1;
		}

		this.Items[tamano-1].Siguiente = -1;
		this.libre = 0;
		this.inicio = -1;
		this.Cuenta = 0;
	}

	public int this[int indice]
	{
		get
		{
			int actual = this.inicio;
			for(int i=0; i!=indice; i++)
			{
				actual = this.Items[actual].Siguiente;
			}
			return this.Items[actual].Escaque;
		}
	}

	public bool Insertar(int escaque, Tablero tab)
	{

		if(this.libre==-1)
		{
			Dpr.Log("Mierda");
			return false;
		}

		int lugar = ObtenerEspacio();

		if(lugar!=-1)
		{
			this.Items[lugar].Escaque = escaque;
			//Dpr.Log("Insertado " + escaque);
			this.Cuenta++;
		}
		else
			return false;

		if(this.inicio==-1)
		{
			this.Items[lugar].Siguiente = -1;
			this.inicio = lugar;
			return true;
		}

		int anterior = -1;
		int actual = this.inicio;
	
		while(actual!=-1)
		{
			if(escaque==this.Items[actual].Escaque)
			{
				Liberar(lugar);
				this.Cuenta--;
			//	Dpr.Log("Borrado " + escaque);
				return false;
			}
			
			if(tab[escaque].Tipo.Valor <= tab[this.Items[actual].Escaque].Tipo.Valor)
			{
				if(anterior == -1)
				{
					this.Items[lugar].Siguiente = this.inicio;
					this.inicio = lugar;
				}
				else
				{
					this.Items[lugar].Siguiente = this.Items[anterior].Siguiente;
					this.Items[anterior].Siguiente = lugar;
				}
				return true;
			}
			else if(tab[escaque].Tipo.Valor > tab[this.Items[actual].Escaque].Tipo.Valor)
			{
				anterior = actual;
				actual = this.Items[actual].Siguiente;
			}

			if(actual == - 1)
			{
				this.Items[anterior].Siguiente = lugar;
				this.Items[lugar].Siguiente = -1;
			}

		}
		return true;
	}

	public void EliminarTodo()
	{
		int cuenta = this.Cuenta;
		for(int i=0; i < cuenta; i++)
		{
			Eliminar(this.Items[this.inicio].Escaque);
		}
		this.Cuenta = 0;
	}

	public int Eliminar(int escaque)
	{
		int posicion = -1; 
		int actual = this.inicio;
		int anterior = -1;

		while(actual != -1)
		{
			if(this.Items[actual].Escaque == escaque)
			{
				posicion = actual;
				break;
			}
			anterior = actual;
			actual = this.Items[actual].Siguiente;
		}

		if(posicion!=-1)
		{
			if(anterior!=-1)
				this.Items[anterior].Siguiente = this.Items[posicion].Siguiente;
			else
				this.inicio = this.Items[posicion].Siguiente;

			Liberar(posicion);
			this.Cuenta--;
			//Dpr.Log("Eliminado " + escaque);
		}
		return posicion;
	}

	private void Liberar(int posicion)
	{
		this.Items[posicion].Siguiente = this.libre;
		this.libre = posicion;
	}

	private int ObtenerEspacio()
	{
		int posicion = this.libre;
		this.libre = Items[posicion].Siguiente;
		return posicion;
	}
	
	public int Buscar(int escaque)
	{
		int posicion = -1; 
		int actual = this.inicio;
		int anterior = -1;

		while(actual != -1)
		{
			if(this.Items[actual].Escaque == escaque)
			{
				posicion = actual;
				break;
			}
			anterior = actual;
			actual = this.Items[actual].Siguiente;
		}

		return posicion;

	}

	public int[] ToArray()
	{
		int cuenta = this.Cuenta;
		int[] arreglo = new int[cuenta];
		int actual = this.inicio;

		for(int i=0; actual!=-1 && i < cuenta; i++)
		{
			arreglo[i] = this.Items[actual].Escaque;
			actual = this.Items[actual].Siguiente;
		}

		return arreglo;
	}

	public override string ToString()
	{
		int[] arrTemp = this.ToArray();
		string resultado = "";

		for(int i=0; i < arrTemp.Length; i++)
		{
			resultado+= arrTemp[i].ToString() + ", ";
		}
		return resultado;
	}

	public void VerLista()
	{
		Dpr.Log("LISTA");
		Dpr.Log("Inicio: " + this.inicio);
		Dpr.Log("Libre: " + this.libre);
		
		for(int i=0; i < Items.Length; i++)
		{
			Dpr.Log("Escaque: " + Items[i].Escaque + " - Siguiente: " + Items[i].Siguiente);
		}
		Dpr.Log("FIN LISTA");
	}

}

public struct NodoLista
{
	public int Escaque;
	public int Siguiente;
}
