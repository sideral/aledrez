
using System.Collections;

public class Tablero
{
	public int[]	EsqRey;
	public bool[,] Enroque;
	public Stack	piezasCapturadas;
	public Stack	esqPiezasCapturadas;

	private Escaque[] tablero = new Escaque[64];

	//constructor
	public Tablero()
	{
		EsqRey = new int[2];
		Enroque = new bool[,] {{true,true},{true,true}};
		piezasCapturadas = new Stack();
		esqPiezasCapturadas = new Stack();

		this.PosicionInicial();
	}

	public Escaque this[int esq]
	{
		get{return tablero[esq];}
		set{tablero[esq] = value;}
	}

	public void PosicionInicial()
	{

		tablero[0] = new Escaque(new Torre(0));
		tablero[1] = new Escaque(new Caballo(0));
		tablero[2] = new Escaque(new Alfil(0));
		tablero[3] = new Escaque(new Dama(0));
		tablero[4] = new Escaque(new Rey(0));
		tablero[5] = new Escaque(new Alfil(0));
		tablero[6] = new Escaque(new Caballo(0));
		tablero[7] = new Escaque(new Torre(0));
		tablero[8] = new Escaque(new Peon(0));
		tablero[9] = new Escaque(new Peon(0));
		tablero[10] = new Escaque(new Peon(0));
		tablero[11] = new Escaque(new Peon(0));
		tablero[12] = new Escaque(new Peon(0));
		tablero[13] = new Escaque(new Peon(0));
		tablero[14] = new Escaque(new Peon(0));
		tablero[15] = new Escaque(new Peon(0));
	
		tablero[48] = new Escaque(new Peon(1));
		tablero[49] = new Escaque(new Peon(1));
		tablero[50] = new Escaque(new Peon(1));
		tablero[51] = new Escaque(new Peon(1));
		tablero[52] = new Escaque(new Peon(1));
		tablero[53] = new Escaque(new Peon(1));
		tablero[54] = new Escaque(new Peon(1));
		tablero[55] = new Escaque(new Peon(1));
		tablero[56] = new Escaque(new Torre(1));
		tablero[57] = new Escaque(new Caballo(1));
		tablero[58] = new Escaque(new Alfil(1));
		tablero[59] = new Escaque(new Dama(1));
		tablero[60] = new Escaque(new Rey(1));
		tablero[61] = new Escaque(new Alfil(1));
		tablero[62] = new Escaque(new Caballo(1));
		tablero[63] = new Escaque(new Torre(1));

		for(int i=16; i <48; i++)
		{
			tablero[i] = new Escaque();
		}
		
		this.EsqRey[0] = 4;
		this.EsqRey[1] = 60;

		this.ActualizarTablero();

	}

	public bool MoverPieza(Movimiento mov, bool recordarCapturadas)
	{
		byte color = this[mov.Origen].Tipo.Color;
		byte colorOp = this[mov.Origen].Tipo.ColorOp;

		if(mov.Origen==this.EsqRey[color])
		{
			this.EsqRey[color] = mov.Destino;
			if(mov.Destino==mov.Origen + 2)
			{
				this[mov.Origen + 1].Tipo = this[mov.Origen + 3].Tipo;
				this[mov.Origen + 3].Tipo = null;
			}
			else if(mov.Destino==mov.Origen - 2)
			{
				this[mov.Origen - 1].Tipo = this[mov.Origen - 4].Tipo;
				this[mov.Origen - 4].Tipo = null;
			}
		}
		
		//Si este movimiento captura una pieza
//Sug: mov.Capturada = this[mov.Destino]
		if(this[mov.Destino].Tipo!=null)
		{
			if(recordarCapturadas)
			{
				this.piezasCapturadas.Push(this[mov.Destino].Tipo);
				this.esqPiezasCapturadas.Push(mov.Destino);
			}
			//Se eliminan los movimientos de la pieza capturada
			this[mov.Destino].Tipo.EliminarMovimientos(mov.Destino,this);
		}
		
		//Se eliminan los movimientos de la pieza movida
		this[mov.Origen].Tipo.EliminarMovimientos(mov.Origen,this);

		//Se mueve la pieza
		this[mov.Destino].Tipo = this[mov.Origen].Tipo;
		this[mov.Origen].Tipo = null;

		this.ActualizarTablero(mov);
		//Se generan los movimientos legales de la pieza movida en su nuevo escaque
		this[mov.Destino].Tipo.GenerarMovLegales(mov.Destino,this);
		//Se generan los movimientos de los reyes
		this[this.EsqRey[0]].Tipo.EliminarMovimientos(this.EsqRey[0],this);				
		this[this.EsqRey[0]].Tipo.GenerarMovLegales(this.EsqRey[0],this);
		this[this.EsqRey[1]].Tipo.EliminarMovimientos(this.EsqRey[1],this);				
		this[this.EsqRey[1]].Tipo.GenerarMovLegales(this.EsqRey[1],this);

		if(this[this.EsqRey[color]].Movs[colorOp].Cuenta==0)
			return false;//No es ilegal
		else
			return true;//Es ilegal por jaque.

	}

	public void DeshacerMovimiento(Movimiento mov, bool reinsertarCapturadas)
	{
		byte color = this[mov.Destino].Tipo.Color;

		if(mov.Destino==this.EsqRey[0] || mov.Destino==this.EsqRey[1])//esqrey[color]??
		{
			this.EsqRey[color] = mov.Origen;
			if(mov.Origen==mov.Destino - 2)
			{
				this[mov.Destino - 1].Tipo = this[mov.Destino - 3].Tipo;
				this[mov.Destino - 3].Tipo = null;
			}
			else if(mov.Origen==mov.Destino + 2)
			{
				this[mov.Destino + 1].Tipo = this[mov.Destino + 4].Tipo;
				this[mov.Destino + 4].Tipo = null;
			}
		}
		this[mov.Destino].Tipo.EliminarMovimientos(mov.Destino,this);
		this[mov.Origen].Tipo = this[mov.Destino].Tipo;
		this[mov.Destino].Tipo = null;

		if(esqPiezasCapturadas.Count>0 && reinsertarCapturadas)
		{
			int destinoComido = (int) esqPiezasCapturadas.Peek();
			Pieza piezaComida;
		
			if(destinoComido==mov.Destino)
			{
				this.esqPiezasCapturadas.Pop();
				piezaComida = (Pieza) this.piezasCapturadas.Pop();
				this[mov.Destino].Tipo = piezaComida;
				this[mov.Destino].Tipo.GenerarMovLegales(mov.Destino,this);
			}
		}
		
      Movimiento invertido = new Movimiento(mov.Destino,mov.Origen);
		this.ActualizarTablero(invertido);
		this[mov.Origen].Tipo.GenerarMovLegales(mov.Origen,this);
	}

	public void ActualizarTablero()
	{
		for(int i=0; i < 64; i++)
		{
			this[i].VaciarMovs();
		}

		for(int i=0; i < 64; i++)
		{
			if(this[i].Tipo!=null && this[i].Tipo is Rey)
			{
				this[i].Tipo.GenerarMovLegales(i,this);
			}
		}

		this[this.EsqRey[0]].Tipo.GenerarMovLegales(this.EsqRey[0],this);
		this[this.EsqRey[1]].Tipo.GenerarMovLegales(this.EsqRey[1],this);
	}

	public void ActualizarTablero(Movimiento mov)
	{

		int[] piezasPosibles;
		for(int i=0; i < 2; i++)
		{
			piezasPosibles = this[mov.Origen].Movs[i].ToArray();

			for(int j=0; j < piezasPosibles.Length; j++)
			{
				this[piezasPosibles[j]].Tipo.GenerarMovOrigen(piezasPosibles[j],mov,this);
			}
			piezasPosibles = this[mov.Destino].Movs[i].ToArray();

			for(int j=0; j < piezasPosibles.Length; j++)
			{
				this[piezasPosibles[j]].Tipo.GenerarMovDestino(piezasPosibles[j],mov,this);
			}

			if(this[mov.Destino].Tipo.Color!=i)
			{
				piezasPosibles = this[mov.Destino].Protectores[i].ToArray();
				for(int j=0; j < piezasPosibles.Length; j++)
				{
					this[piezasPosibles[j]].Tipo.GenerarMovProtectores(piezasPosibles[j],mov,this);
				}
			}
		}
		
		piezasPosibles = this[mov.Origen].Bloqueados.ToArray();
		for(int j=0; j < piezasPosibles.Length; j++)
		{
			Peon peon = this[piezasPosibles[j]].Tipo as Peon;
			peon.Desbloquear(piezasPosibles[j],mov.Origen,this);
		}

	}

	public Movimiento[] GenerarSeudoLegales(byte color, out int cuenta)
	{
		Movimiento[] listaMovLegales = new Movimiento[100];
		cuenta = 0;

		for(int i=0; i < 64; i++)
		{
			if(this[i].Tipo!=null && this[i].Tipo.Color!=color)
			{
				for(int j=0; j < this[i].Movs[color].Cuenta; j++)
				{
					listaMovLegales[cuenta] = new Movimiento(this[i].Movs[color][j],i);
					cuenta++;
				}
			}
			else if(this[i].Tipo==null)
			{
				for(int j=0; j < this[i].Movs[color].Cuenta; j++)
				{
					listaMovLegales[cuenta] = new Movimiento(this[i].Movs[color][j],i);
					cuenta++;
				}
			}
		}

		return listaMovLegales;
	}

	public string MostrarTablero()
	{
		int casilla;
		string fila = "";

		for(int i=7; i >= 0; i--)
		{
			for(int j=0; j <= 7; j++)
			{
				casilla = i*8 + j;
				if(this[casilla].Tipo != null)
               fila += " ";//OJO:!this[casilla].Tipo.Nombre.ToString();
				else
					fila += " ";
			}
		}
		return fila;
	}

}

public class Escaque
{
	//Constructores
	public Escaque(Pieza tipo)
	{
		this.Tipo = tipo;
		this.Movs = new Lista[2];
		this.Movs[0] = new Lista(9);
		this.Movs[1] = new Lista(9);
		this.Protectores = new Lista[2];
		this.Protectores[0] = new Lista(4);
		this.Protectores[1] = new Lista(4);
		this.Bloqueados = new Lista(4);
	}

	public Escaque()
	{ //Escaque vacio
		this.Tipo = null;
		this.Movs = new Lista[2];
		this.Movs[0] = new Lista(9);
		this.Movs[1] = new Lista(9);
		this.Protectores = new Lista[2];
		this.Protectores[0] = new Lista(4);
		this.Protectores[1] = new Lista(4);
		this.Bloqueados = new Lista(4);
	}

	public void VaciarMovs() //Y a esperar que el recolector de basura quiera borrarlos!!
	{
		this.Movs[0] = new Lista(9);
		this.Movs[1] = new Lista(9);
		this.Protectores[0] = new Lista(4);
		this.Protectores[1] = new Lista(4);
		this.Bloqueados = new Lista(4);
	}

	//Campos públicos
	public Pieza Tipo;
	public Lista[] Movs;
	public Lista[] Protectores;
	public Lista Bloqueados;

}
