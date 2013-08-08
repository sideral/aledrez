using System;

public sealed class Protocolo
{

	public static string Protover()
	{
		return "feature usermove=1 analyze=0 setboard=1 colors=0 done=1";
	}

	public static string Usermove(string strMov, Partida ptd)
	{
		Movimiento usermove = new Movimiento(strMov);
		ptd.Tab.MoverPieza(usermove,false);
		ptd.CambiarTurno();

		if(ptd.ColorMaquina != 2)
		{
			Movimiento respuesta = ptd.Alejo.ElegirMovimiento(ptd);
			ptd.Tab.MoverPieza(respuesta,false);

			ptd.CambiarTurno();
			return "move " + respuesta.ToString();
		}
		else
		{
			return "no respuesta";
		}
	}

	public static void Force(Partida ptd)
	{
		ptd.ColorMaquina = 2;
	}

	public static string Go(Partida ptd)
	{
		ptd.ColorMaquina = ptd.ColorTurno;
		Movimiento respuesta = ptd.Alejo.ElegirMovimiento(ptd);
		ptd.CambiarTurno();
		return "move " + respuesta.ToString();
	}

	public static void Sd(string depth, Partida ptd)
	{
		ptd.Alejo.Profundidad = Convert.ToInt32(depth);
	}

}
