public class Jugador
{
	public Jugador()
	{
		this.Profundidad = 1;
	}

	public Movimiento Eleccion;
	public int Profundidad;

	public Movimiento ElegirMovimiento(Partida ptd)
	{
		Tablero tab = ptd.Tab;
		int valoracion = AlphaBeta(this.Profundidad,-100000,100000,ptd);

		/*	int cuenta;
			Movimiento[] listaLegales = tab.GenerarSeudoLegales(ptd.ColorMaquina, out cuenta);
			Random aleatorio = new Random();
			int eleccion = aleatorio.Next(0,cuenta);
			this.Eleccion = listaLegales[eleccion];

			/*for(int i=0; i < cuenta; i++)
			{
				Dpr.Log(String.Format("{0} : {1}", i, listaLegales[i].ToString()));
			}*/

		return this.Eleccion;
	}

	public int AlphaBeta(int profundidad,int alpha, int beta, Partida ptd)
	{
		if(profundidad <= 0)
		{
			return Evaluar(ptd);
		}
		int cuenta,valor;

		Movimiento[] movimientosLegales = ptd.Tab.GenerarSeudoLegales(ptd.ColorTurno,out cuenta);

		int[] valorMovimiento = new int[cuenta];

		for(int i=0; i < cuenta; i++)
		{
			bool ilegalPorJaque = ptd.Tab.MoverPieza(movimientosLegales[i],true);

			if(ilegalPorJaque)
			{
				ptd.Tab.DeshacerMovimiento(movimientosLegales[i],true);
				continue;
			}
			ptd.CambiarTurno();
			valor = -AlphaBeta(profundidad-1,-beta,-alpha,ptd);
			ptd.CambiarTurno();
			ptd.Tab.DeshacerMovimiento(movimientosLegales[i],true);

			valorMovimiento[i] = valor;

			if (valor >= beta && valor!=100000)
			{
				return beta;
			}
		
			if(valor > alpha)
			{
				alpha = valor;
				if(ptd.ColorTurno==ptd.ColorMaquina && profundidad == this.Profundidad)
				this.Eleccion = movimientosLegales[i];
			}

		}
		return alpha;			
	}

	public int Evaluar(Partida ptd)
	{

		int[] suma = new int[2];
		suma[0] = 0;
		suma[1] = 0;
		int[] libertad = new int[2];
		libertad[0] = 0;
		libertad[1] = 0;

		byte color;

		for(int i=0; i <64; i++)
		{
			if(ptd.Tab[i].Tipo!=null)
			{
				color = ptd.Tab[i].Tipo.Color;
				suma[color] += ptd.Tab[i].Tipo.Valor;
			}
			else
			{
				libertad[ptd.ColorTurno] += ptd.Tab[i].Movs[ptd.ColorTurno].Cuenta;
				libertad[ptd.ColorOpuesto] += ptd.Tab[i].Movs[ptd.ColorOpuesto].Cuenta;
			}
		}

		if(ptd.ColorTurno==0)
			return suma[0] - suma[1] + libertad[0] - libertad[1];
		else
			return suma[1] - suma[0] + libertad[1]- libertad[0];
	}

}

