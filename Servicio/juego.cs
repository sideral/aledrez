public class Partida
{
	public byte ColorTurno;
	public byte ColorMaquina;
	public Tablero Tab;
	public Jugador Alejo;
	
	public Partida()
	{
		ColorTurno = 0;
		ColorMaquina = 1;
		Tab = new Tablero();
		Alejo = new Jugador();
	}

	public void CambiarTurno()
	{
		if(ColorTurno==0)
			ColorTurno=1;
		else
			ColorTurno=0;
	}

	public byte ColorOpuesto
	{
		get
		{
			if(this.ColorTurno==0)
				return 1;
			else
				return 0;
		}
	}
}

public class Movimiento
{
	public int Origen;
	public int Destino;
	public Pieza Capturada;

	public Movimiento(string mov)
	{
		this.Origen = CoordAEntero(mov.Substring(0,2));
		this.Destino = CoordAEntero(mov.Substring(2,2));	
	}

	public Movimiento(int o, int d)
	{
		this.Origen = o;
		this.Destino = d;
	}

	public override string ToString()
	{
		string salida;
	
		int colOri = this.Origen%8;
		int filOri = this.Origen/8;
		int colDes = this.Destino%8;
		int filDes = this.Destino/8 + 1;
	
		salida = nombreCols[colOri] + filOri.ToString();
		salida += nombreCols[colDes] + filDes.ToString();
	
		return salida;
	
	}

	private static char[] nombreCols = {'a','b','c','d','e','f','g','h'};

	private int CoordAEntero(string coord)
	{
		int columna = -1;
	
		switch(coord[0])
		{
			case 'a':
				columna = 0;
				break;
			case 'b':
				columna = 1;
				break;
			case 'c':
				columna = 2;
				break;
			case 'd':
				columna = 3;
				break;
			case 'e':
				columna = 4;
				break;
			case 'f':
				columna = 5;
				break;
			case 'g':
				columna = 6;
				break;
			case 'h':
				columna = 7;
				break;
		}

		int fila = (int) System.Char.GetNumericValue(coord[1]) - 1;
	
		return fila*8 + columna;
	}
}
