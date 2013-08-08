using System.Web.Services;
using System.Web.SessionState;
using System.IO;


public class Dpr : WebService
{
	static Dpr()
	{
		Directory.SetCurrentDirectory(@"C:\InetPub\wwwroot\Aledrez\Servicio");
		int logActual = 0;

		while(File.Exists(nombreLog + logActual.ToString() + ".txt"))
		{
			logActual++;
		}

		string archivo = nombreLog + logActual.ToString() + ".txt";
		wr = File.AppendText(archivo);

	}

	private static StreamWriter wr;
	private const string nombreLog = "log";

	public static void Log(string linea)
	{
		wr.AutoFlush = true;
		wr.WriteLine(linea);
	}

	public static void Log(int linea)
	{
		Log(linea.ToString());
	}

	public static void BorrarLog()
	{
		File.Delete(nombreLog);
	}

	//[WebMethod] public static string VerTablero(Tablero tab){}
	//[WebMethod] public static string VerAtaque(Tablero tab){}
	//[WebMethod] public static string VerDefensa(Tablero tab){}

	/*public static void VerMovimientos(byte color, Tablero tab)
	{

		int[] arrTemp;
		int[][] casillas = new int[64][];
	
		for(int i=0; i < 64; i++)
		{
			arrTemp = tab[i].Movs[color].ToArray();
			casillas[i] = new int[arrTemp.Length];

			for(int j=0; j < arrTemp.Length; j++)
			{
				casillas[i][j] = arrTemp[j];
			}
		}

		Depurador.ProcesarMovimientos(casillas);

	}

	public static void ProcesarMovimientos(int[][] casillas)
	{
		for(int i=0; i < casillas.Length; i++)
		{
			for(int j=0; j < casillas[i].Length; j++)
			{
				Depurador.EscribirLog(i.ToString() + ":"  + casillas[i][j].ToString());
			}
		}
	}*/
}

