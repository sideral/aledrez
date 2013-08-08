//reference: aledrez.dll

using System;
using Aledrez.Principal;
using Aledrez.Juego;
using Aledrez.Depuracion;

namespace Aledrez
{
	public class MainClass
	{
		public static void Main(string[] args)
		{
			string peticion;
			string[] comandos;
			string nombreComando;
			string respuesta;

			while(true)
			{
				respuesta = "no respuesta";
				peticion = Console.ReadLine();
				Dpr.Log("WINBOARD: " + peticion);
				comandos = peticion.Split(' ');
				nombreComando = comandos[0];

				switch(nombreComando)
				{
					case "protover":
						respuesta = Protocolo.Protover();
						break;
			
					case "new":
						WinboardSession.PtdActual = new Partida();
						break;
			
					case "usermove":
						respuesta = Protocolo.Usermove(comandos[1],WinboardSession.PtdActual);
						break;
			
					case "force":
						Protocolo.Force(WinboardSession.PtdActual);
						break;

					case "go":
						respuesta = Protocolo.Go(WinboardSession.PtdActual);
						break;
					
					case "sd":
						Protocolo.Sd(comandos[1],WinboardSession.PtdActual);
						break;
					default:
						break;	
				}
		
				if(nombreComando=="quit")
					break;
				else if(respuesta!="no respuesta")
				{
					Console.WriteLine(respuesta);
					Dpr.Log("ALEDREZ: " + respuesta);
				}
			}			
		}
	}
	
	public sealed class WinboardSession
	{
		public static Partida PtdActual;
	}

}