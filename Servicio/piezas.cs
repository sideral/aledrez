public abstract class Pieza
{
	public int Valor;
	public byte Color;
	public byte ColorOp; 
	public bool Generar; //¿Debe generar movimientos en el destino?
	public int[][][] BdMov;
	public abstract void GenerarBdMov();
	public abstract void DeterminarDireccion(int esq,int orides,out int dir, out int cmz);

	public virtual void GenerarMovProtectores(int esq, Movimiento mv, Tablero tab){}
	public virtual void GenerarMovOrigen(int esq, Movimiento mov, Tablero tab)
	{
		int dirOrigen;
		int cmzOrigen;
		int dirDestino;
		int cmzDestino;

		this.DeterminarDireccion(esq,mov.Origen,out dirOrigen, out cmzOrigen);
		this.DeterminarDireccion(esq,mov.Destino,out dirDestino, out cmzDestino);

		if(dirOrigen!=dirDestino)
		{
			for(int i=cmzOrigen; i < BdMov[esq][dirOrigen].Length; i++)
			{
				int casPosible = BdMov[esq][dirOrigen][i];
				tab[casPosible].Movs[this.Color].Insertar(esq,tab);

				if(tab[casPosible].Tipo != null)
					break;
			}
		}
		else
		{
			if(cmzOrigen < cmzDestino)
			{
				for(int i=cmzOrigen; i < cmzDestino; i++)
				{
					tab[BdMov[esq][dirOrigen][i]].Movs[this.Color].Insertar(esq,tab);
					this.Generar = false;
				}
			}
			else
			{
				for(int i=cmzDestino-1; i > cmzOrigen; i--)
				{
					int posicion = tab[BdMov[esq][dirOrigen][i]].Movs[this.Color].Eliminar(esq);
					if(posicion==-1)
						break;
				}
			}
		}
	}
	public virtual void GenerarMovDestino(int esq, Movimiento mov, Tablero tab)
	{
		if(this.Generar == false)
		{
			this.Generar = true;
			return;
		}

		int dirDestino;
		int cmzDestino;

		this.DeterminarDireccion(esq,mov.Destino,out dirDestino,out cmzDestino);
      
		for(int i=cmzDestino; i < BdMov[esq][dirDestino].Length; i++)
		{
			int posicion = tab[BdMov[esq][dirDestino][i]].Movs[this.Color].Eliminar(esq);
			if(posicion==-1)
				break;
		}
	}

	public virtual void GenerarMovLegales(int esq, Tablero tab)
	{
		for(int dir=0; dir < BdMov[esq].Length; dir++)
		{
			for(int j=0; j < BdMov[esq][dir].Length; j++)
			{
				int casPosible = BdMov[esq][dir][j];
				tab[casPosible].Movs[this.Color].Insertar(esq,tab);

				if(tab[casPosible].Tipo != null)
				{
					break;
				}
			}	
		}
	}

	public virtual void EliminarMovimientos(int esq, Tablero tab)
	{
		for(int dir=0; dir < BdMov[esq].Length; dir++)
		{
			for(int j=0; j < BdMov[esq][dir].Length; j++)
			{
				int posicion = tab[BdMov[esq][dir][j]].Movs[this.Color].Eliminar(esq);
				if(posicion==-1)
					break;
			}	
		}
	}
}

public class Rey : Pieza
{
	public Rey(byte cl)
	{
		this.Valor = 100000;
		this.Generar=true;
		this.Color = cl;
		this.BdMov = new int[64][][];

		if(cl==0)
			ColorOp = 1;
		else
			ColorOp = 0;

		for(int i=0; i < BdMov.Length; i++)
		{
			BdMov[i] = new int[2][];
		}
		this.GenerarBdMov();
	}
	
	public override void GenerarMovLegales(int esq, Tablero tab)
	{

		int casPosible;

		for(int i=0; i < BdMov[esq][0].Length; i++)
		{
			casPosible = BdMov[esq][0][i];
			Lista movsOp = tab[casPosible].Movs[this.ColorOp];

			if(tab[casPosible].Tipo==null)
			{
				if((movsOp.Cuenta==0	|| (movsOp.Cuenta==1	&& tab[movsOp[0]].Tipo is Peon))
					&& tab[casPosible].Protectores[this.ColorOp].Cuenta==0)
				{
					tab[casPosible].Movs[this.Color].Insertar(esq,tab);
				}
			}
			else if(movsOp.Cuenta==0 && tab[casPosible].Protectores[this.ColorOp].Cuenta==0)				{
				tab[casPosible].Movs[this.Color].Insertar(esq,tab);
			}
		}

		if(BdMov[esq][1].Length>0)
		{
			if(tab[esq + 1].Tipo == null && tab[esq + 2].Tipo == null)
			{
				if(tab[esq+3].Tipo!=null && tab[esq + 3].Tipo is Torre)
					tab[BdMov[esq][1][0]].Movs[this.Color].Insertar(esq,tab);
			}

			if(tab[esq - 1].Tipo == null && tab[esq - 2].Tipo == null && tab[esq - 3].Tipo==null)
			{
				if(tab[esq-4].Tipo!=null && tab[esq - 4].Tipo is Torre)
					tab[BdMov[esq][1][1]].Movs[this.Color].Insertar(esq,tab);
			}
		}
	}
	public override void GenerarMovOrigen(int esq, Movimiento mov, Tablero tab){
		return;
	}
	public override void GenerarMovDestino(int cas, Movimiento mov, Tablero tab){return;}
	public override void DeterminarDireccion(int esq,int orides,out int dir, out int cmz){
		dir = -1;
		cmz = -1;
	}
	public override void EliminarMovimientos(int esq, Tablero tab){
		for(int dir=0; dir < BdMov[esq].Length; dir++)
		{
			for(int j=0; j < BdMov[esq][dir].Length; j++)
			{
				tab[BdMov[esq][dir][j]].Movs[this.Color].Eliminar(esq);
			}
		}
	}

	public override void GenerarBdMov()
	{
		int[] sumas = {-9,-8,-7,7,8,9,-1,1};
		int maxMovs, filRey, esqPosible, a, filaPosible, numMov;
		
		for(int i=0; i < 64; i++)
		{
			//Si el rey está en un borde, su número máximo de movs se reduce.
			maxMovs = 8;
			filRey = (i-i%8)/8;
			
			if(i%8==0 || i%8==7)
				maxMovs -= 3;
			
			if(filRey==0 || filRey==7)
			{
				if(maxMovs==5)
					maxMovs -= 2;
				else
					maxMovs -= 3;
			}
			
			BdMov[i][0] = new int[maxMovs];
			
			a = 1;
			numMov = 0;
			
			for(int k=0; k < sumas.Length; k++)
			{
				esqPosible = i + sumas[k];
				
				if(k==6)
					a = 0;
					
				if(esqPosible < 64 && esqPosible >= 0)
				{
					filaPosible = (esqPosible - esqPosible%8)/8;

					if(filaPosible == filRey + a || filaPosible == filRey - a)
					{
						BdMov[i][0][numMov] = esqPosible;
						numMov++;
					}
				}
			}

			//¿Está en casilla inicial?
			// 0: Enroque pequeño, 1: Enroque grande.
			/*if(i==4 && this.Color==0)
			{
				BdMov[4][1] = new int[2];
				BdMov[4][1][0] = 6;
				BdMov[4][1][1] = 2;
			}
			else if(i==60 && this.Color==1)
			{
				BdMov[i][1] = new int[2];
				BdMov[i][1][0] = 62;
				BdMov[i][1][1] = 58;			
			}
			else
			{*/
				BdMov[i][1] = new int[0];
			//}
		}
	
	}
}

public class Dama : Pieza
{
	public Dama(byte cl)
	{
		this.Valor = 800;
		this.Generar = true;
		this.BdMov = new int[64][][];
		this.Color = cl;

		if(cl==0)
			this.ColorOp = 1;
		else
			this.ColorOp = 0;

		for(int i=0; i < BdMov.Length; i++)
		{
			BdMov[i] = new int[8][];
		}
		this.GenerarBdMov();
	}

	public override void DeterminarDireccion(int esq,int cas,out int direccion, out int comienzo)
	{
		int colC = cas%8;
		int colE = esq%8;
		if(colC==colE)
		{
			if(cas>esq)
			{ 
				direccion = 0;
				comienzo = (cas - esq)/8;
			}
			else
			{
				direccion = 1;
				comienzo = (esq - cas)/8;
			}
		}
		else if(cas-colC == esq-colE)
		{
			if(cas>esq)
			{
				direccion=2;
				comienzo = cas - esq;
			}
			else
			{
				direccion=3;
				comienzo = esq - cas;
			}
		}
		else if(esq%9==cas%9)
		{
			if(cas > esq)
			{
				direccion = 4;
				comienzo = (cas-esq)/9;
			}
			else
			{
				direccion = 5;
				comienzo = (esq-cas)/9;
			}
		}
		else if(esq%7==cas%7)
		{
			if(cas > esq)
			{
				direccion = 6;
				comienzo = (cas-esq)/7;
			}
			else
			{
				direccion = 7;
				comienzo = (esq-cas)/7;
			}
		}
		else
		{
			direccion = -1;
			comienzo = -1;
		}
	}

	public override void GenerarBdMov()
	{
		//BdMov[esq][dir]: dir tiene 8 valores:
		//0>arr. 1>aba. 2>der. 3>izq. 4>arr-der. 5>aba-izq. 6>arr-izq. 7>aba-der.
		
		int[] sumas = {8, -8, 1, -1, 9, -9, 7, -7};
		int[] longitudes = new int[8];
		int esqPosible, filDama, colDama;

		for(int i=0; i < 64; i++)
		{
			filDama = (i-i%8)/8;
			colDama = i%8;

			longitudes[0] = 7-filDama;
			longitudes[1] = filDama;
			longitudes[2] = 7-colDama;
			longitudes[3] = colDama;
			longitudes[4] = System.Math.Min(7-filDama, 7-colDama);
			longitudes[5] = System.Math.Min(filDama, colDama);
			longitudes[6] = System.Math.Min(7-filDama, colDama);
			longitudes[7] = System.Math.Min(filDama, 7-colDama);

			for(int k=0; k < 8; k++)
			{
				BdMov[i][k] = new int[longitudes[k]];
			}
			
			for(int j=0; j < BdMov[i].Length; j++)
			{
				esqPosible = i;
				for(int k=0; k < BdMov[i][j].Length; k++)
				{
					esqPosible += sumas[j];
					BdMov[i][j][k] = esqPosible;
				}
			}
		}
	}
}

public class Torre : Pieza
{
	public Torre(byte cl)
	{
		this.Valor = 450;
		this.BdMov = new int[64][][];
		this.Color = cl;
		this.Generar = true;
			
		if(cl==0)
			this.ColorOp = 1;
		else
			this.ColorOp = 0;

		for(int i=0; i < BdMov.Length; i++)
		{
			BdMov[i] = new int[4][];
		}
		this.GenerarBdMov();
	}

	public override void DeterminarDireccion(int esq,int cas,out int direccion,out int comienzo)
	{
		int colC = cas%8;
		int colE = esq%8;
		if(colC==colE)
		{
			if(cas>esq)
			{ 
				direccion = 0;
				comienzo = (cas - esq)/8;
			}
			else
			{
				direccion = 1;
				comienzo = (esq - cas)/8;
			}
		}
		else if(cas-colC == esq-colE)
		{
			if(cas>esq)
			{
				direccion=2;
				comienzo = cas - esq;
			}
			else
			{
				direccion=3;
				comienzo = esq - cas;
			}
		}
		else
		{
			direccion = -1;
			comienzo = -1;
		}
	}
	
	public override void GenerarBdMov()
	{
		//BdMov[esq][dir]: dir puede tomar 4 valores:
		//0 > arriba. 1 > abajo. 2 > derecha. 3 > izquierda
	
		int[] sumas = {8, -8, 1, -1};
		int filTor, esqPosible,colTor;
		int max = 7;

		for(int i=0; i < 64; i++)
		{
			filTor = (i-i%8)/8;
			colTor = i%8;
			
			BdMov[i][0] = new int[max-filTor];
			BdMov[i][1] = new int[filTor];
			BdMov[i][2] = new int[max-colTor];
			BdMov[i][3] = new int[colTor];
			
			for(int j=0; j < BdMov[i].Length; j++)
			{
				esqPosible = i;
				for(int k=0; k < BdMov[i][j].Length; k++)
				{
					esqPosible += sumas[j];
					BdMov[i][j][k] = esqPosible;
				}		
			}		
		}
	}
}

public class Alfil : Pieza
{
	public Alfil(byte cl)
	{
		this.Valor = 305;
		this.Generar = true;
		this.BdMov = new int[64][][];
		this.Color = cl;

		if(cl==0)
			this.ColorOp = 1;
		else
			this.ColorOp = 0;

		for(int i=0; i < BdMov.Length; i++)
		{
			BdMov[i] = new int[4][];
		}
		this.GenerarBdMov();
	}

	public override void DeterminarDireccion(int esq,int cas,out int direccion, out int comienzo)
	{
		if(esq%9==cas%9)
		{
			if(cas > esq)
			{
				direccion = 0;
				comienzo = (cas-esq)/9;
			}
			else
			{
				direccion = 1;
				comienzo = (esq-cas)/9;
			}
		}
		else if(esq%7==cas%7)
		{
			if(cas > esq)
			{
				direccion = 2;
				comienzo = (cas-esq)/7;
			}
			else
			{
				direccion = 3;
				comienzo = (esq-cas)/7;
			}
		}
		else
		{
			direccion = -1;
			comienzo = -1;
		}
	
	}

	public override void GenerarBdMov()
	{
		//BdMov[esq][dir]: dir puede tomar 4 valores.
		//0 > arr-der. 1 > aba-izq. 2 > arr-izq. 3 > aba-der.
		
		int[] sumas = {9, -9, 7, -7};
		int filAlf, colAlf, esqPosible;
		
		for(int i=0; i < 64; i++)
		{
			filAlf = (i-i%8)/8;
			colAlf = i%8;
			
			int tamDir0 = System.Math.Min(7-filAlf, 7-colAlf);
			int tamDir1 = System.Math.Min(filAlf, colAlf);
			int tamDir2 = System.Math.Min(7-filAlf, colAlf);
			int tamDir3 = System.Math.Min(filAlf, 7-colAlf);
			
			BdMov[i][0] = new int[tamDir0];
			BdMov[i][1] = new int[tamDir1];
			BdMov[i][2] = new int[tamDir2];
			BdMov[i][3] = new int[tamDir3];
			
			for(int j=0; j < BdMov[i].Length; j++)
			{
				esqPosible = i;
				for(int k=0; k < BdMov[i][j].Length; k++)
				{
					esqPosible += sumas[j];
					BdMov[i][j][k] = esqPosible;
				}		
			}	
		}
	}
}

public class Caballo : Pieza
{
	public Caballo(byte cl)
	{
		this.Valor = 300;
		this.BdMov = new int[64][][];
		this.Color = cl;

		if(cl==0)
			this.ColorOp = 1;
		else
			this.ColorOp = 0;

		for(int i=0; i < BdMov.Length; i++)
		{
			BdMov[i] = new int[1][];
		}
		this.GenerarBdMov();
	}
	
	public override void GenerarMovLegales(int esq, Tablero tab)
	{

		for(int j=0; j < BdMov[esq][0].Length; j++)
		{
			int casPosible = BdMov[esq][0][j];
			if(tab[casPosible].Tipo == null)
			{
				tab[casPosible].Movs[this.Color].Insertar(esq,tab);
			}
			else
			{
				tab[casPosible].Movs[this.Color].Insertar(esq,tab);
			}
		}
	}

	public override void EliminarMovimientos(int esq, Tablero tab)
	{
		for(int j=0; j < BdMov[esq][0].Length; j++)
		{
			tab[BdMov[esq][0][j]].Movs[this.Color].Eliminar(esq);
		}
	}

	public override void GenerarMovOrigen(int esq, Movimiento mov, Tablero tab){return;}
	public override void GenerarMovDestino(int esq, Movimiento mov, Tablero tab){return;}
	public override void DeterminarDireccion(int esq,int orides,out int dir, out int cmz){
		dir=-1;
		cmz=-1;
		return;
	}
	public override void GenerarBdMov()
	{
		int[] sumas = {-17,-15,15,17,-10,-6,6,10};
		int aux, filCab, colCab, esqPosible, filaPosible, maxMovs, indice;		
	
		for(int i=0; i < 64; i++)
		{
						
			filCab = (i-i%8)/8;
			colCab = i%8;
			
			maxMovs = 0;
			
			if(filCab >= 2 && filCab <= 5)
				maxMovs += 4;
			if(colCab >= 2 && colCab <= 5)
				maxMovs += 4;
			if(filCab == 1 || filCab == 6)
				maxMovs += 2;
			if(colCab == 1 || colCab == 6)
				maxMovs += 2;
			if((filCab == 0 || filCab == 7) && maxMovs < 4)
				maxMovs += 1;
			if((colCab == 0 || colCab == 7) && maxMovs < 4)
				maxMovs += 1;
	
			BdMov[i][0] = new int[maxMovs];
			
			aux = 2;
			indice = 0;
			
			for(int k=0; k < sumas.Length; k++)
			{
				esqPosible = i + sumas[k];
				
				if(k==4)
				{
					aux = 1;
				}
				if(esqPosible <= 63 && esqPosible >= 0)
				{
					filaPosible = (esqPosible - esqPosible%8)/8;
					if(filaPosible == filCab + aux || filaPosible == filCab - aux)
					{
						BdMov[i][0][indice] = esqPosible;
						indice++;
					}
				}
			}
		}
	}
}

public class Peon : Pieza
{
	public Peon(byte cl)
	{
		this.Valor = 75;
		this.Generar = true;
		this.BdMov = new int[64][][];
		this.Color = cl;

		if(cl==0)
			this.ColorOp = 1;
		else
			this.ColorOp = 0;

		for(int i=0; i < BdMov.Length; i++)
		{
			BdMov[i] = new int[3][]; //3 direcciones: adelante y 2 diagonales.
		}
		this.GenerarBdMov();
	}

	public override void GenerarMovLegales(int esq, Tablero tab)
	{

		int casPosible;
		for(int j=0; j < BdMov[esq][0].Length; j++)
		{
			casPosible = BdMov[esq][0][j];
					
			if(tab[casPosible].Tipo == null)
			{
				tab[casPosible].Movs[this.Color].Insertar(esq,tab);
			}
			else
			{
				tab[casPosible].Bloqueados.Insertar(esq,tab);
				break;
			}
		}

		for(int k=1; k <= 2; k++)
		{
			if(BdMov[esq][k].Length > 0)
			{
				casPosible = BdMov[esq][k][0];
				if(tab[casPosible].Tipo == null)
				{
					tab[casPosible].Protectores[this.Color].Insertar(esq,tab);
				}
				else
				{
					if(tab[casPosible].Tipo.Color == this.ColorOp)
						tab[casPosible].Movs[this.Color].Insertar(esq,tab);
					else
						tab[casPosible].Protectores[this.Color].Insertar(esq,tab);
				}
			}
		}
	}

	public override void EliminarMovimientos(int esq, Tablero tab)
	{
		for(int j=0; j < BdMov[esq][0].Length; j++)
		{
			tab[BdMov[esq][0][j]].Movs[this.Color].Eliminar(esq);
			tab[BdMov[esq][0][j]].Bloqueados.Eliminar(esq);
		}

		for(int k=1; k <= 2; k++)
		{
			if(BdMov[esq][k].Length > 0)
			{
				int posicion = tab[BdMov[esq][k][0]].Protectores[this.Color].Eliminar(esq);
				if(posicion==-1)
					tab[BdMov[esq][k][0]].Movs[this.Color].Eliminar(esq);
			}
		}

		for(int i=0; i < 64; i++)
		{
			if(tab[i].Movs[this.Color].Buscar(esq)!=-1)
				Dpr.Log("quedan Movs");
			if(tab[i].Protectores[this.Color].Buscar(esq)!=-1)
				Dpr.Log("quedan Protectores");
			if(tab[i].Bloqueados.Buscar(esq)!=-1)
			{
				Dpr.Log("quedan Bloqueados");
				Dpr.Log(i + ", " + esq);
			}
		}
	}

	public override void GenerarMovOrigen(int esq, Movimiento mov, Tablero tab){
		//Sólo es posible llegar aquí si la pieza movida es del color opuesto.
		tab[mov.Origen].Movs[this.Color].Eliminar(esq);
		tab[mov.Origen].Protectores[this.Color].Insertar(esq,tab);
	}

	public void Desbloquear(int esq, int origen, Tablero tab)
	{
		tab[origen].Bloqueados.Eliminar(esq);
		tab[origen].Movs[this.Color].Insertar(esq,tab);

		int fila = (esq-esq%8)/8;
		
		if(this.Color==0 && fila==1 && origen==esq+8)
			tab[esq+16].Movs[this.Color].Insertar(esq,tab);
		else if(this.Color==1 && fila==6 && origen==esq-8)
			tab[esq-16].Movs[this.Color].Insertar(esq,tab);
	}

	public override void GenerarMovDestino(int esq, Movimiento mov, Tablero tab)
	{
		tab[mov.Destino].Movs[this.Color].Eliminar(esq);
		tab[mov.Destino].Bloqueados.Insertar(esq,tab);
		int fila = (esq-esq%8)/8;
		
		if(this.Color==0 && fila==1 && mov.Destino==esq+8)
			tab[esq+16].Movs[this.Color].Eliminar(esq);
		else if(this.Color==1 && fila==6 && mov.Destino==esq-8)
			tab[esq-16].Movs[this.Color].Eliminar(esq);
	}

	public override void GenerarMovProtectores(int esq, Movimiento mov, Tablero tab)
	{
		//Se requiere que solamente se llame a esta función si la pieza movida es del
		//color opuesto, es decir, cuando se revisen los protectores de la casilla destino.
		tab[mov.Destino].Protectores[this.Color].Eliminar(esq);
		tab[mov.Destino].Movs[this.Color].Insertar(esq,tab);
	}

	public override void DeterminarDireccion(int esq, int cas, out int dir, out int cmz)
	{
		dir = -1;
		cmz = -1;
		return;
	}

	public override void GenerarBdMov()
	{
			
		int filPeon, colPeon, maxAdelante = 0, maxDgIzq = 0, maxDgDer = 0, aux, aux2;
	
		for(int i=0; i <64; i++)
		{
			filPeon = (i-i%8)/8;
			colPeon = i%8;

			if(filPeon!=0 && filPeon != 7)
			{
				if(this.Color == 0)
				{
					if(filPeon==1)
						maxAdelante = 2;
					else
						maxAdelante = 1;
				}
				else
				{
					if(filPeon==6)
						maxAdelante = 2;
					else
						maxAdelante = 1;
				}
			}
			else
			{
				maxAdelante = 0;
			}

			if(filPeon==0 || filPeon==7)
			{
				maxDgIzq = 0;
				maxDgDer = 0;
			}
			else if(colPeon!=0 && colPeon!=7)
			{
				maxDgDer = 1;
				maxDgIzq = 1;
			}
			else if(colPeon == 0)
			{
				if(this.Color == 0)
				{
					maxDgIzq = 0;
					maxDgDer = 1;
				}
				else
				{
					maxDgDer = 0;
					maxDgIzq = 1;
				}
			}
			else
			{
				if(this.Color == 0)
				{
					maxDgIzq = 1;
					maxDgDer = 0;
				}
				else
				{
					maxDgIzq = 0;
					maxDgDer = 1;
				}
			}

			BdMov[i][0] = new int[maxAdelante];
			BdMov[i][1] = new int[maxDgIzq];
			BdMov[i][2] = new int[maxDgDer];

			if(this.Color == 0)
				aux = 1;
			else
				aux = -1;

			aux2 = aux*8;

			for(int k=0; k < BdMov[i][0].Length; k++)
			{
				BdMov[i][0][k] = i+aux2;
				aux2 += aux2;
			}

			if(BdMov[i][1].Length > 0)
			{
				BdMov[i][1][0] = i + aux*7;
			}
				
			if(BdMov[i][2].Length > 0)
			{
				BdMov[i][2][0] = i + aux*9;
			}
		}
	}
}
