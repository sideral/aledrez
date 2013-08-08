//reference: aledrez.dll

using System;
using System.Web.Services;
using System.Web.SessionState;
using System.IO;

public class Servicio : WebService
{
	[WebMethod(EnableSession=true)]
	public string RecibirComando(string comando)
	{
		string[] comandos = comando.Split(' ');
		string nombreComando = comandos[0];
		string respuesta = "";

		switch(nombreComando)
		{
			case "cargar":
				respuesta = "Aledrez Cargado.";
				break;

			case "new":
				Session["Partida"] = new Partida();
				respuesta = "new";
				break;

			case "usermove":
					respuesta = Protocolo.Usermove(comandos[1], (Partida) Session["Partida"]);
				break;

			case "force":
				//Protocolo.Force((Partida) Session["Partida"]);
				break;

			case "go":
				respuesta = "go";//Protocolo.Go((Partida) Session["Partida"]);
				break;

			case "sd":
				//Protocolo.Sd(comandos[1],(Partida) Session["Partida"]);
				respuesta = "hello";
				break;
			default:
				respuesta = "Comando desconocido";
				break;
		}
		return respuesta;
	}
	/*
	[WebMethod(EnableSession=true)]
	public string AyudarDepuracion(string peticion)
	{
		string ayuda = "Ayuda";

		switch(peticion)
		{
			case "movimientosLegales":
				Partida ptd = (Partida) Session["Partida"];
				ayuda = ptd.Tab.MostrarTablero();
			break;
		}

		return ayuda;
	}

	[WebMethod(EnableSession=true)]
	public string VerListaMovs()
	{
		string lista = "";
		
		Partida ptd = (Partida) Session["Partida"];
		int cuenta;
		Movimiento[] listaLegales = ptd.Tab.GenerarSeudoLegales(1,out cuenta);
		for(int i=0; i < cuenta; i++)
		{
			lista += listaLegales[i].ToString() + ",";
		}
		return lista;

	}

	[WebMethod(EnableSession=true)]
	public string VerListaBloqueados()
	{
		string lista = "";
		Partida ptd = (Partida) Session["Partida"];
		for(int i=0; i < 64; i++)
		{
			if(ptd.Tab[i].Bloqueados.Cuenta>0)
			{
				lista += ptd.Tab[i].Bloqueados.ToString();
			}
		}

		return lista;


	}*/

}
